"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { projectPath } from "@/i18n/lang";
import { useLang } from "@/i18n/use-lang";
import { cn, ease } from "@/lib/utils";

export type DeckItem = { slug: string; name: string; cover: string; desktop: { src: string; width: number; height: number } };

/** Position de chaque fenêtre : l'éventail s'ouvre quand on commence à faire défiler la page. */
const LAYOUT = [
  { x: -62, y: 58, r: -6, z: 1, outer: true },
  { x: -32, y: 26, r: -3, z: 2 },
  { x: 0, y: 0, r: 0, z: 3 },
  { x: 32, y: 26, r: 3, z: 2 },
  { x: 62, y: 58, r: 6, z: 1, outer: true },
];

function DeckCard({ item, index, progress }: { item: DeckItem; index: number; progress: MotionValue<number> }) {
  const lang = useLang();
  const l = LAYOUT[index];
  const center = l.x === 0;
  const x = useTransform(progress, [0.2, 0.75], [`${-50 + l.x * 0.72}%`, `${-50 + l.x}%`]);
  const y = useTransform(progress, [0.2, 0.75], [l.y, l.y * 0.55]);
  const rotate = useTransform(progress, [0.2, 0.75], [l.r * 0.7, l.r]);
  // Le site du centre défile tout seul : on voit une vraie page, pas une image figée.
  const viewHeight = (item.desktop.width * 10) / 16;
  const scrollTo = `${-(1 - viewHeight / item.desktop.height) * 88}%`;
  return (
    <motion.div style={{ x, y, rotate, zIndex: l.z }} className={cn("absolute left-1/2 top-0 w-[84%] sm:w-[54%] lg:w-[47%]", l.outer && "hidden sm:block")}>
      <motion.div initial={{ opacity: 0, y: 90 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.35 + Math.abs(l.x) * 0.006, ease }}>
        <Link href={projectPath(lang, item.slug)} className="block transition-transform duration-500 hover:-translate-y-3">
          <span className="sr-only">{lang === "en" ? "View the project" : "Voir le projet"} {item.name}</span>
          <BrowserFrame url={`${item.name.toLowerCase()} · ${lang === "en" ? "demo site" : "site de démonstration"}`}>
            <div className="relative aspect-[16/10] overflow-hidden bg-ink-3">
              {center ? (
                <Image
                  src={item.desktop.src}
                  alt=""
                  width={item.desktop.width}
                  height={item.desktop.height}
                  sizes="(max-width: 640px) 84vw, 640px"
                  className="shot-scroll block h-auto w-full"
                  style={{ ["--scroll" as string]: scrollTo }}
                />
              ) : (
                <Image src={item.cover} alt="" fill sizes="(max-width: 640px) 84vw, 640px" className="object-cover object-top" />
              )}
            </div>
          </BrowserFrame>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function HeroDeck({ items }: { items: DeckItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pointer = useMotionValue(0);
  const shift = useSpring(pointer, { stiffness: 50, damping: 16 });
  const onMove = (e: PointerEvent) => pointer.set((e.clientX / window.innerWidth - 0.5) * -36);

  return (
    <motion.div ref={ref} onPointerMove={onMove} style={{ x: shift }} className="relative h-[clamp(250px,42vw,620px)]">
      {items.map((item, i) => (
        <DeckCard key={item.slug} item={item} index={i} progress={scrollYProgress} />
      ))}
    </motion.div>
  );
}
