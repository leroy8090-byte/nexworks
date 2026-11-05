"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { Btn, Sign, Wrap } from "./ui";

const COLS = 8;
const ROWS = 5;
const COUNT = COLS * ROWS;

function Tile({ progress, order }: { progress: MotionValue<number>; order: number }) {
  const start = 0.08 + (order / COUNT) * 0.5;
  const opacity = useTransform(progress, [start, start + 0.08], [1, 0]);
  const rotateX = useTransform(progress, [start, start + 0.08], [0, 88]);
  return <motion.span style={{ opacity, rotateX }} className="block border border-az-grout bg-az-tile" />;
}

/** La salle de bain apparaît carreau après carreau, au rythme du défilement. */
export function TileReveal() {
  const ref = useRef<HTMLElement>(null);
  const calm = useCalmMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const textIn = useTransform(scrollYProgress, [0.62, 0.76], [0, 1]);
  const shade = useTransform(scrollYProgress, [0.62, 0.76], [0, 0.55]);

  const text = (
    <Wrap>
      <Sign tone="light">Rénovation</Sign>
      <h2 className="mt-4 max-w-3xl text-[clamp(2.9rem,7vw,6.4rem)]">Une salle de bain, carreau par carreau.</h2>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/95">Douche à l&apos;italienne, baignoire remplacée, évacuations reprises : on commence par ce qui ne se voit pas.</p>
      <Btn href="/azur-plomberie/salle-de-bain" variant="white" className="mt-7" arrow>Voir la rénovation</Btn>
    </Wrap>
  );

  if (calm) {
    return (
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden py-16 text-white">
        <Image src="/azur/hero.webp" alt="Baignoire îlot et vasque dans une salle de bain lumineuse" fill sizes="100vw" className="-z-20 object-cover" />
        <span aria-hidden className="absolute inset-0 -z-10 bg-az-ink/55" />
        {text}
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[280svh]">
      <div className="sticky top-0 isolate h-svh overflow-hidden text-white">
        <Image src="/azur/hero.webp" alt="Baignoire îlot et vasque dans une salle de bain lumineuse" fill sizes="100vw" className="-z-30 object-cover" />
        <motion.span aria-hidden style={{ opacity: shade }} className="absolute inset-0 -z-20 bg-az-ink" />
        <div aria-hidden className="absolute inset-0 -z-10 grid [perspective:1400px]" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
          {/* Ordre mélangé, mais toujours le même : le serveur et le navigateur affichent la même chose. */}
          {Array.from({ length: COUNT }, (_, i) => <Tile key={i} progress={scrollYProgress} order={(i * 17) % COUNT} />)}
        </div>
        <motion.div style={{ opacity: textIn }} className="flex h-full items-end pb-24 sm:pb-20">{text}</motion.div>
      </div>
    </section>
  );
}
