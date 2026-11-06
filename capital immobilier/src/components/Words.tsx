"use client";

import { m } from "framer-motion";

/** Un titre qui monte mot à mot, une seule fois, quand il arrive à l'écran. Le texte reste entier pour les moteurs. */
export function Words({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <m.span initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: 0.055, delayChildren: delay }}>
      {text.split(" ").map((w, i) => (
        <span key={`${w}${i}`}>
          <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
            <m.span data-reveal className="inline-block" variants={{ hidden: { y: "112%" }, shown: { y: "0%" } }} transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}>{w}</m.span>
          </span>{" "}
        </span>
      ))}
    </m.span>
  );
}
