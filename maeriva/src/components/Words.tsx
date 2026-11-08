"use client";

import { m } from "framer-motion";
import { Fragment } from "react";

/**
 * Découpe un texte en mots, en repérant les passages en *italique* (entre astérisques).
 * Exemple : « Une sélection, choisie *une à une.* »
 */
export function tokens(text: string) {
  let em = false;
  return text.split(" ").filter(Boolean).map((raw) => {
    let w = raw;
    const open = w.startsWith("*");
    if (open) { em = true; w = w.slice(1); }
    const close = w.endsWith("*") || /\*[.,;:!?»]*$/.test(w);
    w = w.replace(/\*/g, "");
    const t = { w, em };
    if (close) em = false;
    return t;
  });
}

/** Le même texte, sans animation, avec ses italiques (pour les titres qui n'ont pas besoin de mouvement). */
export function Rich({ text }: { text: string }) {
  return <>{tokens(text).map((t, i) => <Fragment key={i}>{t.em ? <em className="accent">{t.w}</em> : t.w}{" "}</Fragment>)}</>;
}

/**
 * Un titre dont les mots montent un à un hors d'un masque invisible, une seule fois, à l'arrivée à l'écran.
 * Le texte reste entier pour les moteurs de recherche et les lecteurs d'écran.
 */
export function Words({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <m.span initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.4 }} transition={{ staggerChildren: 0.045, delayChildren: delay }}>
      {tokens(text).map((t, i) => (
        <Fragment key={i}>
          <span className="word-mask">
            <m.span data-reveal className={`inline-block ${t.em ? "accent" : ""}`} variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>{t.w}</m.span>
          </span>{" "}
        </Fragment>
      ))}
    </m.span>
  );
}

/** Version sans JavaScript pour les titres de haut de page : les mots montent dès l'affichage (CSS). */
export function MaskText({ text, start = 0, step = 70 }: { text: string; start?: number; step?: number }) {
  return (
    <>
      {tokens(text).map((t, i) => (
        <Fragment key={i}>
          <span className="word-mask"><span className={`word-up ${t.em ? "accent" : ""}`} style={{ "--d": `${start + i * step}ms` } as React.CSSProperties}>{t.w}</span></span>{" "}
        </Fragment>
      ))}
    </>
  );
}
