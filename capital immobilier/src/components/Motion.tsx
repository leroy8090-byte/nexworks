"use client";

import { domAnimation, LazyMotion, m, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user">{children}</MotionConfig></LazyMotion>;
}

/** Un bloc apparaît une seule fois, quand il arrive à l'écran. */
export function Reveal({ children, className = "", delay = 0, id }: { children: ReactNode; className?: string; delay?: number; id?: string }) {
  return (
    <m.div data-reveal id={id} className={className} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1, ease: EASE, delay }}>
      {children}
    </m.div>
  );
}

/** Une photo se dévoile de bas en haut et se pose. */
export function ImageReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    // Le navigateur ne détecte pas un bloc entièrement masqué : c'est le parent, jamais masqué, qui déclenche.
    <m.div className={className} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.05 }}>
      <m.div data-reveal className="h-full" variants={{ hidden: { clipPath: "inset(98% 0 0 0)" }, shown: { clipPath: "inset(0% 0 0 0)" } }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: delay * 0.5 }}>
        {children}
      </m.div>
    </m.div>
  );
}
