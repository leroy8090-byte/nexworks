"use client";

import { m } from "framer-motion";
import { useSyncExternalStore } from "react";
import type { Lang } from "@/i18n/config";
import { Icon } from "./ui";

const T = {
  fr: { add: (n: string) => `Ajouter ${n} à ma sélection`, remove: (n: string) => `Retirer ${n} de ma sélection`, on: "Dans ma sélection", off: "Ajouter à ma sélection" },
  en: { add: (n: string) => `Add ${n} to my selection`, remove: (n: string) => `Remove ${n} from my selection`, on: "In my selection", off: "Add to my selection" },
};

/**
 * « Ma sélection » : les biens mis de côté par le visiteur, gardés dans son navigateur.
 * Rien n'est envoyé : si le stockage est bloqué, la sélection vit simplement le temps de la visite.
 */
const KEY = "maeriva:selection";
const EVENT = "maeriva:selection";
let memory: string[] = [];
let cache: { raw: string | null; list: string[] } = { raw: null, list: [] };

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === cache.raw) return cache.list;
    const list = raw ? (JSON.parse(raw) as unknown[]).filter((x): x is string => typeof x === "string") : [];
    cache = { raw, list };
    return list;
  } catch {
    return memory;
  }
}
function write(list: string[]) {
  memory = list;
  try { window.localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* stockage indisponible : la mémoire suffit */ }
  window.dispatchEvent(new Event(EVENT));
}
function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => { window.removeEventListener(EVENT, cb); window.removeEventListener("storage", cb); };
}
const EMPTY: string[] = [];

export function useSelection() {
  const list = useSyncExternalStore(subscribe, read, () => EMPTY);
  const toggle = (slug: string) => write(list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]);
  return { list, has: (slug: string) => list.includes(slug), toggle };
}

/** Le cœur : un battement à l'ajout, un libellé clair pour les lecteurs d'écran. */
export function SaveButton({ slug, name, className = "", label, lang = "fr" }: { slug: string; name: string; className?: string; label?: boolean; lang?: Lang }) {
  const t = T[lang];
  const { has, toggle } = useSelection();
  const on = has(slug);
  return (
    <button type="button" aria-pressed={on} aria-label={on ? t.remove(name) : t.add(name)}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(slug); }}
      className={`items-center justify-center gap-2 ${className || "inline-flex"}`}>
      <m.span key={String(on)} initial={{ scale: on ? 0.6 : 1 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 14 }} className="grid place-items-center">
        <Icon name="heart" className={`size-[18px] transition-colors ${on ? "fill-current text-gold" : ""}`} />
      </m.span>
      {label && <span className="text-[12px] tracking-[0.2em] uppercase">{on ? t.on : t.off}</span>}
    </button>
  );
}

export function SelectionCount() {
  const { list } = useSelection();
  if (!list.length) return null;
  return <m.span key={list.length} initial={{ scale: 0.4 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 grid size-[18px] place-items-center rounded-full bg-gold text-[10px] font-semibold text-ink">{list.length}</m.span>;
}
