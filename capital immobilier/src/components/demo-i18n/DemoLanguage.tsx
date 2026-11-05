"use client";

import { useEffect, useState } from "react";

/**
 * Version anglaise des sites de démonstration, sans toucher à leur code : une fois la page en place,
 * les textes français sont remplacés à partir d'un dictionnaire (voir src/i18n-demo).
 * Rien n'est chargé tant que le visiteur reste en français. Lien direct possible : ?lang=en
 * Limite assumée, acceptable pour des démos non indexées : le HTML envoyé reste en français.
 */
export type DemoDict = { strings: Record<string, string> };
type Loader = () => Promise<{ default: DemoDict }>;

const KEY = "demo-lang";
const ATTRS = ["placeholder", "aria-label", "title", "alt"] as const;
const clean = (s: string) => s.replace(/[\s  ]+/g, " ").replace(/’/g, "'").trim();

function compile(dict: DemoDict) {
  const exact = new Map<string, string>();
  const patterns: { re: RegExp; to: string; size: number }[] = [];
  for (const [fr, en] of Object.entries(dict.strings)) {
    const key = clean(fr);
    if (!/\{\d+\}/.test(key)) {
      exact.set(key, en);
      continue;
    }
    // Texte à trous, ex. « {0} biens » : les valeurs sont reprises telles quelles, et traduites si le dictionnaire les connaît.
    const source = key.split(/\{\d+\}/).map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("(.+)");
    const order = [...key.matchAll(/\{(\d+)\}/g)].map((m) => Number(m[1]));
    const to = en.replace(/\{(\d+)\}/g, (_, n: string) => `{${order.indexOf(Number(n))}}`);
    patterns.push({ re: new RegExp(`^${source}$`), to, size: key.replace(/\{\d+\}/g, "").length });
  }
  patterns.sort((a, b) => b.size - a.size);
  const translate = (raw: string, depth = 0): string | null => {
    const key = clean(raw);
    if (!key || !/\p{L}/u.test(key)) return null;
    const hit = exact.get(key);
    if (hit !== undefined) return hit;
    if (depth > 2) return null;
    for (const p of patterns) {
      const m = key.match(p.re);
      if (m) return p.to.replace(/\{(\d+)\}/g, (_, n: string) => { const v = m[Number(n) + 1] ?? ""; return translate(v, depth + 1) ?? v; });
    }
    // Listes calculées (« Gluten, Œufs », « Terrasse · Vue mer ») : traduites morceau par morceau.
    for (const sep of [", ", " · "]) {
      const parts = key.split(sep);
      if (parts.length < 2) continue;
      const done = parts.map((p) => translate(p, depth + 1));
      const usable = done.some((d) => d !== null) && done.every((d, i) => d !== null || sep === " · " || !/\p{L}/u.test(parts[i]));
      if (usable) return done.map((d, i) => d ?? parts[i]).join(sep);
    }
    return null;
  };
  return translate;
}

/** Titres animés mot par mot (data-i18n-title) : la phrase traduite n'a pas le même nombre de mots, on les reconstruit. */
function applyTitle(translate: (s: string) => string | null, el: Element) {
  if (el.hasAttribute("data-i18n-done")) return;
  const t = translate(el.getAttribute("data-i18n-title") ?? "");
  if (t === null) return;
  el.setAttribute("data-i18n-done", "");
  const frag = document.createDocumentFragment();
  t.split("*").forEach((chunk, i) => {
    for (const word of chunk.split(/\s+/).filter(Boolean)) {
      const outer = document.createElement("span"), wrap = document.createElement("span"), inner = document.createElement("span");
      outer.className = "split-title__chunk";
      wrap.className = "split-word";
      inner.className = `split-word__inner${i % 2 ? " is-em" : ""}`;
      inner.style.transform = "none";
      inner.style.opacity = "1";
      inner.style.animation = "none";
      inner.textContent = word;
      wrap.appendChild(inner);
      outer.append(wrap, " ");
      frag.appendChild(outer);
    }
  });
  el.replaceChildren(frag);
}

function applyTranslations(translate: (s: string) => string | null, root: Node) {
  const doText = (n: Text) => {
    const parent = n.parentElement;
    if (!parent || parent.closest("script,style,noscript,[data-demo-lang-ui]")) return;
    const v = n.nodeValue ?? "";
    const t = translate(v);
    if (t === null) return;
    const lead = v.match(/^\s*/)?.[0] ?? "", trail = v.match(/\s*$/)?.[0] ?? "";
    const next = `${lead}${t}${trail}`;
    if (next !== v) n.nodeValue = next;
  };
  const doEl = (el: Element) => {
    if (el.closest("[data-demo-lang-ui]")) return;
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (!v) continue;
      const t = translate(v);
      if (t !== null && t !== v) el.setAttribute(a, t);
    }
  };
  if (root.nodeType === Node.TEXT_NODE) return doText(root as Text);
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  doEl(root as Element);
  if ((root as Element).matches("[data-i18n-title]")) applyTitle(translate, root as Element);
  (root as Element).querySelectorAll("[data-i18n-title]").forEach((el) => applyTitle(translate, el));
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let n = walker.nextNode();
  while (n) {
    if (n.nodeType === Node.TEXT_NODE) doText(n as Text);
    else doEl(n as Element);
    n = walker.nextNode();
  }
}

function translateTitle(translate: (s: string) => string | null) {
  const parts = document.title.split(" | ");
  const next = parts.map((p) => translate(p) ?? p).join(" | ");
  if (next !== document.title) document.title = next;
}

const reveal = () => document.getElementById("demo-lang-hide")?.remove();

/** Avant l'affichage : évite de voir le français une fraction de seconde. Filet de sécurité si le dictionnaire tarde. */
const EARLY = `(function(){try{var q=new URLSearchParams(location.search).get("lang");if(q==="en"||q==="fr")localStorage.setItem("${KEY}",q);if(localStorage.getItem("${KEY}")==="en"){var s=document.createElement("style");s.id="demo-lang-hide";s.textContent="body{visibility:hidden}";document.head.appendChild(s);setTimeout(function(){s.remove()},2500)}}catch(e){}})();`;

export function DemoLanguage({ load }: { load: Loader }) {
  const [lang, setLang] = useState<"fr" | "en">("fr");

  useEffect(() => {
    let current: "fr" | "en" = "fr";
    try {
      const q = new URLSearchParams(location.search).get("lang");
      current = q === "en" || q === "fr" ? q : localStorage.getItem(KEY) === "en" ? "en" : "fr";
    } catch { /* stockage indisponible : on reste en français */ }
    setLang(current);
    if (current !== "en") return reveal();

    let observer: MutationObserver | undefined;
    let stopped = false;
    // Laisse React finir d'hydrater les zones différées : modifier leur texte avant provoquerait une erreur d'hydratation.
    const hydrated = new Promise((done) => setTimeout(done, 250));
    Promise.all([load(), hydrated])
      .then(([{ default: dict }]) => {
        if (stopped) return;
        const translate = compile(dict);
        document.documentElement.lang = "en";
        applyTranslations(translate, document.body);
        translateTitle(translate);
        observer = new MutationObserver((list) => {
          for (const m of list) {
            if (m.target === document.head || document.head.contains(m.target)) continue;
            if (m.type === "characterData") applyTranslations(translate, m.target);
            else if (m.type === "attributes") applyTranslations(translate, m.target);
            else m.addedNodes.forEach((n) => applyTranslations(translate, n));
          }
          translateTitle(translate);
        });
        observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: [...ATTRS] });
        // Next écrit le titre de la page après coup, et remplace parfois la balise elle-même.
        observer.observe(document.head, { subtree: true, childList: true, characterData: true });
      })
      .catch((e) => console.error("Traduction indisponible", e))
      .finally(reveal);
    return () => {
      stopped = true;
      observer?.disconnect();
    };
  }, [load]);

  const choose = (next: "fr" | "en") => {
    if (next === lang) return;
    try {
      localStorage.setItem(KEY, next);
    } catch { /* tant pis : le choix ne sera pas retenu */ }
    const url = new URL(location.href);
    url.searchParams.delete("lang");
    location.href = url.toString();
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: EARLY }} />
      <div data-demo-lang-ui role="group" aria-label="Langue / Language" style={{ position: "fixed", left: 70, bottom: 18, zIndex: 2147483000, display: "flex", gap: 2, padding: 3, borderRadius: 999, background: "rgba(20,24,28,.9)", boxShadow: "0 6px 20px rgba(0,0,0,.28)", font: "600 12px/1 system-ui,sans-serif" }}>
        {(["fr", "en"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => choose(l)}
            aria-pressed={lang === l}
            style={{ cursor: "pointer", border: 0, borderRadius: 999, padding: "8px 11px", background: lang === l ? "#fff" : "transparent", color: lang === l ? "#14181c" : "#fff" }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}
