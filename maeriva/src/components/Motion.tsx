"use client";

import { domAnimation, LazyMotion, m, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user">{children}</MotionConfig></LazyMotion>;
}

/** Un bloc apparaît une seule fois, en fondu, quand il arrive à l'écran. Discret : il accompagne la lecture. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div data-reveal className={className} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.9, ease: EASE, delay }}>
      {children}
    </m.div>
  );
}

/** Une photo se pose : léger fondu et retour à l'échelle. La photo n'est jamais masquée, elle se charge normalement. */
export function ImageReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div data-reveal className={className} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1.1, ease: EASE, delay }}>
      <m.div className="h-full w-full" initial={{ scale: 1.04 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1.6, ease: EASE, delay }}>{children}</m.div>
    </m.div>
  );
}
