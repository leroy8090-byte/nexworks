"use client";

import { animate, domAnimation, LazyMotion, m, MotionConfig, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;
const CURTAIN = [0.76, 0, 0.24, 1] as const;

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

/**
 * Une photo se dévoile : un voile blanc se lève comme un rideau, et la photo se pose lentement.
 * La photo elle-même n'est jamais masquée : le navigateur la voit venir et la charge normalement.
 * Le parent doit être en position relative.
 */
export function ImageReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div className={className} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.15 }}>
      <m.div className="h-full w-full" variants={{ hidden: { scale: 1.08 }, shown: { scale: 1 } }} transition={{ duration: 1.9, ease: EASE, delay }}>{children}</m.div>
      <m.span aria-hidden className="reveal-cover pointer-events-none absolute inset-0 z-[1] origin-top bg-white" variants={{ hidden: { scaleY: 1 }, shown: { scaleY: 0 } }} transition={{ duration: 1.15, ease: CURTAIN, delay }} />
    </m.div>
  );
}

/** Profondeur très douce : l'image glisse un peu moins vite que la page. Le cadre parent coupe ce qui dépasse. */
export function Parallax({ children, amount = 7, className = "" }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const calm = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      <m.div className="absolute inset-[-8%]" style={calm ? undefined : { y }}>{children}</m.div>
    </div>
  );
}

/** Un chiffre qui défile jusqu'à sa valeur quand il arrive à l'écran (affiché tel quel si le mouvement est réduit). */
export function Counter({ to, locale = "fr-FR", duration = 1.8 }: { to: number; locale?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const calm = useReducedMotion();
  const [v, setV] = useState(to);
  const [armed, setArmed] = useState(false);
  useEffect(() => { if (!calm) { setArmed(true); setV(0); } }, [calm]);
  useEffect(() => {
    if (!seen || !armed) return;
    const c = animate(0, to, { duration, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [seen, armed, to, duration]);
  return <span ref={ref} className="tabular">{v.toLocaleString(locale)}</span>;
}

/**
 * Les filets dorés des surtitres se dessinent quand ils arrivent à l'écran.
 * Un seul observateur pour toute la page ; sans JavaScript, les filets restent simplement visibles.
 */
export function KickerLines() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.setAttribute("data-in", ""); io.unobserve(e.target); } }), { threshold: 0.6 });
    const scan = () => document.querySelectorAll(".kicker:not([data-in])").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}
