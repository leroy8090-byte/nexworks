"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/content";
import { ease } from "@/lib/utils";
import { Check } from "@/components/ui/Icons";
import { Container, Glow, SectionHeading } from "@/components/ui/Section";

function StepNode({ i, progress, n }: { i: number; progress: MotionValue<number>; n: string }) {
  const t = (i / processSteps.length) * 0.92;
  const borderColor = useTransform(progress, [t - 0.06, t], ["rgba(255,255,255,0.14)", "rgba(85,189,242,1)"]);
  const color = useTransform(progress, [t - 0.06, t], ["rgba(167,173,181,1)", "rgba(85,189,242,1)"]);
  const glow = useTransform(progress, [t - 0.06, t], ["0 0 0 0 rgba(85,189,242,0)", "0 0 36px 2px rgba(85,189,242,0.35)"]);
  return (
    <motion.div
      style={{ borderColor, color, boxShadow: glow }}
      className="relative z-10 flex size-[54px] items-center justify-center rounded-full border bg-ink font-display text-sm font-semibold"
    >
      {n}
    </motion.div>
  );
}

export function MethodSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 62%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });

  return (
    <section id="methode" className="relative overflow-hidden border-y border-white/[0.06] bg-ink-2 py-24 sm:py-32">
      <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
      <Glow className="-left-40 bottom-0 h-[600px] w-[600px]" tone="deep" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Notre méthode"
          title="Une méthode *claire.* Un objectif : vous faire *avancer.*"
        />

        <div ref={ref} className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* Ligne de progression horizontale (desktop) */}
          <div className="absolute left-[27px] right-0 top-[27px] hidden h-px bg-white/10 lg:block" aria-hidden>
            <motion.div
              style={{ scaleX: progress }}
              className="h-full origin-left bg-gradient-to-r from-sky to-sky-bright shadow-[0_0_14px_rgba(85,189,242,0.9)]"
            />
          </div>
          {/* Ligne verticale (mobile) */}
          <div className="absolute bottom-6 left-[27px] top-6 w-px bg-white/10 lg:hidden" aria-hidden>
            <motion.div
              style={{ scaleY: progress }}
              className="h-full w-full origin-top bg-gradient-to-b from-sky to-sky-bright shadow-[0_0_14px_rgba(85,189,242,0.9)]"
            />
          </div>

          <ol className="contents">
            {processSteps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
                className="relative grid grid-cols-[54px_1fr] gap-x-6 gap-y-0 lg:block"
              >
                <StepNode i={i} progress={progress} n={s.n} />
                <div className="lg:mt-8">
                  <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-white">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist">{s.text}</p>
                  <ul className="mt-4 space-y-2">
                    {s.details.map((d) => (
                      <li key={d} className="flex items-center gap-2.5 text-[13px] text-white/70">
                        <Check className="size-3.5 shrink-0 text-sky" strokeWidth={2} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
