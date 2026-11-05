"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { useEffect, useRef, useState } from "react";
import { featured, formatEuro, orea } from "@/data/orea";
import { cn } from "@/lib/utils";
import { VehicleCard } from "./VehicleCard";
import { Arrow, btnCls, Sign, Wrap } from "./ui";

const Intro = ({ className }: { className?: string }) => (
  <div className={className}>
    <Sign>La flotte</Sign>
    <h2 className="mt-4 text-[clamp(3.4rem,7vw,7rem)] text-white">Une voiture pour chaque route.</h2>
    <p className="mt-4 max-w-md text-lg leading-relaxed text-white/75">160 modèles, de la citadine qui se gare partout au cabriolet d'exception. Voici une voiture de chaque catégorie.</p>
    <Link href={`${orea.basePath}/vehicules`} className={btnCls("ghost", "mt-7")}>
      Voir tous les véhicules
      <Arrow />
    </Link>
  </div>
);

/** Sur grand écran, la page se fige et la flotte défile à l'horizontale. */
function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(2600);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const measure = () => { if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth)); };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIndex(Math.min(featured.length - 1, Math.floor(v * featured.length))));
  const current = featured[index];

  return (
    <div ref={ref} style={{ height: `calc(100svh + ${distance}px)` }} className="relative hidden lg:block">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-16">
        <motion.div ref={track} style={{ x }} className="flex w-max items-stretch gap-7 pl-[max(3rem,calc((100vw-1400px)/2+3rem))] pr-[8vw]">
          <Intro className="flex w-[42vw] max-w-[640px] shrink-0 flex-col justify-center" />
          {featured.map((v, i) => (
            <Link key={v.slug} href={`${orea.basePath}/vehicules/${v.slug}`} className="group relative h-[68vh] w-[52vw] max-w-[860px] shrink-0 overflow-hidden rounded-2xl bg-or-ink2">
              <Image src={v.image} alt={v.imageAlt} fill loading={i < 3 ? "eager" : "lazy"} sizes="(max-width: 1600px) 75vw, 1200px" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-or-ink/95 via-or-ink/15 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 text-white">
                <span>
                  <span className="block text-base font-bold text-or-flame">{v.categoryLabel}</span>
                  <span className="mt-1 block font-[family-name:var(--font-orea-display)] text-[clamp(3rem,5vw,5rem)] font-black uppercase leading-[0.9]">{v.name}</span>
                  <span className="mt-2 block text-lg text-white/85">{v.tagline}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-[family-name:var(--font-orea-display)] text-6xl font-black leading-none">{formatEuro(v.pricePerDay)}</span>
                  <span className="text-sm font-semibold text-white/75">par jour</span>
                </span>
              </span>
            </Link>
          ))}
        </motion.div>
        <Wrap className="mt-5 flex items-center gap-5 text-white">
          <span className="font-[family-name:var(--font-orea-display)] text-2xl font-black tabular-nums">{String(index + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}</span>
          <span className="relative h-1 flex-1 overflow-hidden rounded bg-white/15">
            <motion.span style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-or-flame" />
          </span>
          <span aria-live="off" className="hidden w-52 truncate text-right text-[15px] font-semibold text-white/75 xl:block">{current.name}</span>
        </Wrap>
      </div>
    </div>
  );
}

function Stacked({ always }: { always?: boolean }) {
  return (
    <div className={cn("py-20 sm:py-28", !always && "lg:hidden")}>
      <Wrap><Intro /></Wrap>
      <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-5 px-5 pb-3 sm:scroll-pl-8 sm:px-8">
        {featured.map((v) => (
          <li key={v.slug} className="w-[84vw] max-w-[440px] shrink-0 snap-start">
            <VehicleCard v={v} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FleetPinned() {
  const reduce = useCalmMotion();
  return (
    <section className="bg-or-ink" id="flotte">
      {reduce ? <Stacked always /> : <><Pinned /><Stacked /></>}
    </section>
  );
}
