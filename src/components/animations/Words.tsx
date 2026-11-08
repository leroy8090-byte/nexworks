import type { CSSProperties } from "react";

/** Découpe « texte *en italique* » en mots, avec l'information italique. */
function tokens(text: string) {
  const out: { w: string; it: boolean }[] = [];
  text.split(/(\*[^*]+\*)/).forEach((part) => {
    if (!part) return;
    const it = part.startsWith("*") && part.endsWith("*");
    (it ? part.slice(1, -1) : part).split(/\s+/).filter(Boolean).forEach((w) => out.push({ w, it }));
  });
  return out;
}

/** Titre dont les mots montent un par un sous un cache, quand un parent porte data-show. */
export function MaskWords({ text, start = 0, step = 70, accent = "" }: { text: string; start?: number; step?: number; accent?: string }) {
  return (
    <>
      {tokens(text).map((t, i) => (
        <span key={i}>
          <span className="anx-mask"><span className={`anx-up ${t.it ? `italic ${accent}` : ""}`} style={{ "--d": `${start + i * step}ms` } as CSSProperties}>{t.w}</span></span>{" "}
        </span>
      ))}
    </>
  );
}
