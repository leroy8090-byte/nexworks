"use client";

import { m } from "framer-motion";

/** La signature du pied de page : les lettres de MAÉRIVA montent une à une, en grand, couleur pierre. */
export function BigWordmark() {
  const letters = "MAÉRIVA".split("");
  return (
    <m.p aria-hidden initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.5 }} transition={{ staggerChildren: 0.07 }}
      className="serif pointer-events-none flex justify-center overflow-hidden pt-6 text-[19vw] leading-[0.85] tracking-[0.04em] text-stone select-none lg:text-[15rem]">
      {letters.map((l, i) => (
        <m.span key={i} className="inline-block" variants={{ hidden: { y: "105%", opacity: 0 }, shown: { y: "0%", opacity: 1 } }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>{l}</m.span>
      ))}
    </m.p>
  );
}
