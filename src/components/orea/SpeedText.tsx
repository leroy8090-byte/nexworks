"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useRef } from "react";

const WORDS = ["Kilométrage illimité", "Annulation gratuite", "Prix clair", "Assistance 24 h/24"];

/** Le texte accélère et change de sens selon la vitesse à laquelle on fait défiler la page. */
export function SpeedText() {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const boost = useTransform(velocity, [-2500, 0, 2500], [-5, 0, 5], { clamp: false });
  const dir = useRef(1);
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < -0.05) dir.current = -1;
    else if (b > 0.05) dir.current = 1;
    let next = base.get() - dir.current * (delta / 1000) * (1.6 + Math.abs(b) * 2.4);
    if (next <= -50) next += 50;
    if (next > 0) next -= 50;
    base.set(next);
  });
  const x = useTransform(base, (v) => `${v}%`);
  const line = [...WORDS, ...WORDS, ...WORDS, ...WORDS];
  return (
    <div className="overflow-hidden bg-or-flame py-4 text-or-ink sm:py-5">
      <motion.p style={{ x }} className="flex w-max items-center gap-8 whitespace-nowrap font-[family-name:var(--font-orea-display)] text-[clamp(2.4rem,6vw,5.5rem)] font-black uppercase leading-none" aria-label={WORDS.join(", ")}>
        {line.map((w, i) => (
          <span key={i} aria-hidden className="flex items-center gap-8">
            {w}
            <span className="inline-block size-4 rotate-45 bg-or-ink sm:size-5" />
          </span>
        ))}
      </motion.p>
    </div>
  );
}
