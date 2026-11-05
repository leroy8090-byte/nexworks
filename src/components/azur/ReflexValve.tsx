"use client";

import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { reflexSteps } from "@/data/azur";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { cn } from "@/lib/utils";
import { Sign, Wrap } from "./ui";

/** La vanne : la manette tourne d'un quart de tour, et l'eau s'arrête. */
function Valve({ turn, flow }: { turn: MotionValue<number> | number; flow: MotionValue<number> | number }) {
  return (
    <svg viewBox="0 0 600 460" aria-hidden className="h-auto w-full">
      <path d="M0 250H600" stroke="#7d421d" strokeWidth="58" />
      <path d="M0 250H600" stroke="#c2703a" strokeWidth="46" />
      <path d="M0 236H600" stroke="#eaa878" strokeWidth="8" opacity=".8" />
      <motion.path d="M0 250H210" stroke="#4cc9ec" strokeWidth="14" fill="none" className="az-flow" />
      <motion.path style={{ opacity: flow }} d="M390 250H600" stroke="#4cc9ec" strokeWidth="14" fill="none" className="az-flow" />
      <rect x="205" y="186" width="190" height="128" rx="20" fill="#f2bd3e" />
      <rect x="205" y="186" width="190" height="24" rx="12" fill="#ffdc85" />
      <rect x="195" y="196" width="26" height="108" rx="6" fill="#d39c23" />
      <rect x="379" y="196" width="26" height="108" rx="6" fill="#d39c23" />
      <rect x="282" y="120" width="36" height="72" fill="#d39c23" />
      <motion.g style={{ rotate: turn, originX: 0.5, originY: 0.5 }}>
        <rect x="150" y="84" width="300" height="52" rx="26" fill="#d6322a" />
        <rect x="150" y="84" width="300" height="16" rx="8" fill="#f06a60" />
      </motion.g>
      <circle cx="300" cy="110" r="24" fill="#fff" />
      <circle cx="300" cy="110" r="9" fill="#0a1647" />
    </svg>
  );
}

function StepList({ active }: { active: number }) {
  return (
    <ol className="space-y-3">
      {reflexSteps.map((s, i) => (
        <li key={s.title} className={cn("flex gap-4 rounded-xl border-2 p-4 transition-all duration-500 sm:p-5", i === active ? "border-az-brass bg-white/10" : i < active ? "border-white/25" : "border-white/10 opacity-55")}>
          <span className={cn("az-display flex size-11 shrink-0 items-center justify-center rounded-full text-2xl", i <= active ? "bg-az-brass text-az-ink" : "bg-white/10")}>{i + 1}</span>
          <span>
            <span className="az-display block text-[1.8rem]">{s.title}</span>
            <span className="mt-1 block text-[16px] leading-relaxed text-white/85">{s.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Le bon réflexe en cas de fuite, raconté au défilement. */
export function ReflexValve() {
  const ref = useRef<HTMLElement>(null);
  const calm = useCalmMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const turn = useTransform(scrollYProgress, [0.04, 0.3], [0, 90]);
  const flow = useTransform(scrollYProgress, [0.2, 0.32], [1, 0]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(reflexSteps.length - 1, Math.floor(v * reflexSteps.length * 1.05))));

  const head = (
    <>
      <Sign tone="hot">En cas de fuite</Sign>
      <h2 className="mt-4 text-[clamp(2.5rem,5.5vw,5rem)]">Le premier geste, c&apos;est vous.</h2>
    </>
  );

  if (calm) {
    return (
      <section className="bg-az-ink py-20 text-white">
        <Wrap className="grid gap-10 lg:grid-cols-2">
          <div>{head}<div className="mt-8 max-w-md"><Valve turn={90} flow={0} /></div></div>
          <ol className="space-y-3">
            {reflexSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-xl border-2 border-white/25 p-5">
                <span className="az-display flex size-11 shrink-0 items-center justify-center rounded-full bg-az-brass text-2xl text-az-ink">{i + 1}</span>
                <span><span className="az-display block text-[1.8rem]">{s.title}</span><span className="mt-1 block text-[16px] leading-relaxed text-white/85">{s.text}</span></span>
              </li>
            ))}
          </ol>
        </Wrap>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[300svh] bg-az-ink text-white">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden pt-16">
        <Wrap className="grid items-center gap-5 lg:grid-cols-2 lg:gap-14">
          <div>
            {head}
            <div className="mx-auto mt-4 max-w-[230px] sm:max-w-sm lg:mt-8 lg:max-w-md"><Valve turn={turn} flow={flow} /></div>
          </div>
          <div className="max-lg:[&_li]:p-3 max-lg:[&_li_span.block:last-child]:hidden lg:[&_li]:p-5"><StepList active={active} /></div>
        </Wrap>
      </div>
    </section>
  );
}
