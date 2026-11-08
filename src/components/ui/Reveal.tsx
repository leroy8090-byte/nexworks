"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn, ease } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  /** Animation au chargement plutôt qu'au scroll (hero) */
  immediate?: boolean;
  /** Avec immediate : pas de fondu, visible dès le premier affichage (texte principal du haut de page, pour le LCP) */
  visible?: boolean;
};

/** Apparition progressive (fondu + léger déplacement). Respecte prefers-reduced-motion via MotionConfig. */
export function Reveal({ children, className, delay = 0, y = 28, x = 0, immediate, visible }: Props) {
  if (immediate) {
    return (
      <div
        className={cn(visible ? "rise-move" : "rise", className)}
        style={{ animationDelay: `${delay}s`, ["--rise-y" as string]: `${y}px`, ["--rise-x" as string]: `${x}px` }}
      >
        {children}
      </div>
    );
  }
  const anim = { opacity: 1, y: 0, x: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={anim}
      viewport={{ once: true, margin: "-70px 0px -70px 0px" }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Conteneur qui fait apparaître ses enfants (RevealItem) en cascade. */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.09,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px 0px -70px 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, y = 24 }: { children: ReactNode; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}
