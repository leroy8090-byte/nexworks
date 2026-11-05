"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

/** Une ligne qui se remplit au fil du défilement, le long d'une suite d'étapes. */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  return (
    <div ref={ref} aria-hidden className={className}>
      <div className="h-full w-full bg-white/10" />
      <motion.div style={{ scaleY: scrollYProgress }} className="absolute inset-0 origin-top bg-sky" />
    </div>
  );
}
