"use client";

import { motion } from "framer-motion";
import { createElement, Fragment } from "react";
import { cn, ease } from "@/lib/utils";

type Props = {
  as?: "h1" | "h2" | "h3";
  /** Texte brut. Les mots entourés de *astérisques* sont mis en bleu ciel. */
  text: string;
  className?: string;
  delay?: number;
  /** Animation au chargement (hero) au lieu du scroll */
  immediate?: boolean;
};

/**
 * Titre animé mot par mot (masque + glissement).
 * Le texte reste un vrai titre HTML lisible par les lecteurs d'écran et les moteurs.
 */
export function AnimatedHeading({ as = "h2", text, className, delay = 0, immediate }: Props) {
  const tokens = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  const words: { word: string; accent: boolean }[] = [];
  for (const t of tokens) {
    const accent = t.startsWith("*") && t.endsWith("*");
    const raw = accent ? t.slice(1, -1) : t;
    for (const w of raw.split(/\s+/).filter(Boolean)) words.push({ word: w, accent });
  }

  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "-60px 0px" } };

  return createElement(
    as,
    { className: cn("text-balance", className) },
    <motion.span
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      className="inline"
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
            <motion.span
              className={cn("inline-block will-change-transform", w.accent && "text-sky-gradient")}
              variants={{
                hidden: { y: "108%", opacity: 0 },
                show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease } },
              }}
            >
              {w.word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>,
  );
}
