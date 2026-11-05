"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Les étapes sur un tuyau : l'eau avance au fil du défilement. Vertical sur téléphone, horizontal sur grand écran. */
export function PipeSteps({ steps, tone = "light" }: { steps: { n: string; title: string; text: string }[]; tone?: "light" | "dark" }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.65"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const muted = tone === "dark" ? "text-white/85" : "text-az-ink/80";
  const empty = "bg-[#c2703a]";

  return (
    <ol ref={ref} className="relative grid gap-9 pl-14 lg:grid-cols-4 lg:gap-7 lg:pl-0 lg:pt-20">
      <span aria-hidden className={cn("absolute bottom-3 left-[19px] top-3 w-2.5 rounded-full lg:bottom-auto lg:left-0 lg:right-0 lg:top-[23px] lg:h-2.5 lg:w-auto", empty)} />
      <motion.span aria-hidden style={{ scaleY: fill }} className="absolute bottom-3 left-[19px] top-3 w-2.5 origin-top rounded-full bg-az-water lg:hidden" />
      <motion.span aria-hidden style={{ scaleX: fill }} className="absolute left-0 right-0 top-[23px] hidden h-2.5 origin-left rounded-full bg-az-water lg:block" />
      {steps.map((s) => (
        <li key={s.n} className="relative">
          <span className="az-display absolute -left-14 top-0 flex size-12 items-center justify-center rounded-full border-[3px] border-az-ink bg-az-brass text-2xl text-az-ink lg:-top-20 lg:left-0">{s.n}</span>
          <h3 className="text-[2.1rem]">{s.title}</h3>
          <p className={cn("mt-2 text-[17px] leading-relaxed", muted)}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
