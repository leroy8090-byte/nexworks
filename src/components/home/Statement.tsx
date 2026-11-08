"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { useRef } from "react";
import { Container } from "@/components/ui/Section";
import { useLang } from "@/i18n/use-lang";

const TEXT = {
  fr: "Vous êtes bon dans votre métier. Mais en ligne, vos futurs clients ne vous trouvent pas, ou ne comprennent pas assez vite ce que vous proposez. Notre travail, c'est de rendre ça simple.",
  en: "You are good at what you do. But online, your future clients can't find you, or don't understand quickly enough what you offer. Our job is to make it simple.",
};
const ACCENT = { fr: "Notre", en: "Our" };

function Word({ word, range, progress, accent }: { word: string; range: [number, number]; progress: MotionValue<number>; accent: boolean }) {
  // 0,48 au départ : le minimum pour que les mots pas encore éclairés restent lisibles (contraste 3:1)
  const opacity = useTransform(progress, range, [0.48, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "text-sky-gradient" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

/** La phrase s'éclaire mot à mot au défilement : on la lit au rythme de la page. */
export function Statement() {
  const lang = useLang();
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useCalmMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = TEXT[lang].split(" ");
  const accentFrom = words.indexOf(ACCENT[lang]);

  return (
    <section className="paper relative z-10 -mt-10 rounded-t-[2rem] pb-16 pt-20 sm:-mt-16 sm:rounded-t-[3rem] sm:pb-24 sm:pt-32">
      <Container>
        <p ref={ref} className="max-w-[1120px] font-display text-[clamp(1.9rem,4.5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          {reduce
            ? TEXT[lang]
            : words.map((w, i) => (
                <Word key={i} word={w} range={[i / words.length, (i + 1) / words.length]} progress={scrollYProgress} accent={i >= accentFrom} />
              ))}
        </p>

      </Container>
    </section>
  );
}
