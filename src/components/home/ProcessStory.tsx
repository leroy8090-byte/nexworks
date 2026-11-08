"use client";

import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { processStepsFor, projectsFor } from "@/data/localized";
import { useLang } from "@/i18n/use-lang";
import type { Lang } from "@/i18n/lang";
import { Container, SectionHeading } from "@/components/ui/Section";
import { cn, ease } from "@/lib/utils";
import { SceneBrief, SceneBuild, SceneDesign, SceneVisible } from "./ProcessScenes";

function scene(i: number, lang: Lang): ReactNode {
  const demo = projectsFor(lang).find((p) => p.slug === "solea-restaurant")!;
  if (i === 0) return <SceneBrief items={processStepsFor(lang)[0].details} />;
  if (i === 1) return <SceneDesign />;
  if (i === 2) return <SceneBuild cover={demo.images.cover} mobile={demo.images.mobile.src} />;
  return <SceneVisible />;
}

const Heading = ({ lang }: { lang: Lang }) => (
  <SectionHeading eyebrow={lang === "en" ? "How it works" : "Comment ça se passe"} title={lang === "en" ? "From your idea to your first *enquiries.*" : "De votre idée à vos premières *demandes.*"} />
);

/** Sur grand écran : la page se fige et le site se construit au fil du défilement. */
function Pinned() {
  const lang = useLang();
  const processSteps = processStepsFor(lang);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(processSteps.length - 1, Math.floor(v * processSteps.length))));
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative hidden h-[380vh] lg:block">
      <div className="sticky top-0 flex h-svh items-center pt-16">
        <Container className="grid items-center gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div>
            <Heading lang={lang} />
            <ol className="relative mt-10 pl-7">
              <span className="absolute bottom-1 left-0 top-1 w-0.5 rounded-full bg-white/10" aria-hidden />
              <motion.span style={{ scaleY: bar }} className="absolute bottom-1 left-0 top-1 w-0.5 origin-top rounded-full bg-sky" aria-hidden />
              {processSteps.map((s, i) => {
                const on = i === step;
                return (
                  <li key={s.n} aria-current={on ? "step" : undefined} className="py-2.5">
                    <h3 className={cn("font-display text-2xl font-bold transition-colors duration-300", on ? "text-white" : "text-white/35")}>
                      {s.plainTitle}
                    </h3>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden text-[17px] leading-relaxed text-mist">
                          <span className="block pt-1.5">{s.plainText}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ol>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3, ease }}>
              {scene(step, lang)}
            </motion.div>
          </AnimatePresence>
        </Container>
      </div>
    </div>
  );
}

/** Chaque animation démarre quand l'étape arrive à l'écran, pas au chargement de la page. */
function PlayInView({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-15% 0px" });
  return <div ref={ref} className="min-h-[280px]">{seen && children}</div>;
}

function Stacked({ always }: { always?: boolean }) {
  const lang = useLang();
  const processSteps = processStepsFor(lang);
  return (
    <div className={cn("py-20 sm:py-28", !always && "lg:hidden")}>
      <Container>
        <Heading lang={lang} />
        <ol className="mt-12 space-y-14">
          {processSteps.map((s, i) => (
            <li key={s.n}>
              <p className="text-sm font-bold text-sky">{lang === "en" ? "Step" : "Étape"} {i + 1}</p>
              <h3 className="mt-1 font-display text-3xl font-bold text-white">{s.plainTitle}</h3>
              <p className="mt-2 max-w-2xl text-[17px] leading-relaxed text-mist">{s.plainText}</p>
              <div className="mt-6 max-w-2xl">
                <PlayInView>{scene(i, lang)}</PlayInView>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}

export function ProcessStory() {
  const reduce = useCalmMotion();
  return (
    <section id="methode" className="relative">
      {reduce ? <Stacked always /> : <><Pinned /><Stacked /></>}
    </section>
  );
}
