"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { sectors } from "@/data/content";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";

const TEXT = "Vous êtes bon dans votre métier. Mais en ligne, vos futurs clients ne vous trouvent pas, ou ne comprennent pas assez vite ce que vous proposez. Notre travail, c'est de rendre ça simple.";

function Word({ word, range, progress, accent }: { word: string; range: [number, number]; progress: MotionValue<number>; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "text-sky-gradient" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

/** La phrase s'éclaire mot à mot au défilement : on la lit au rythme de la page. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = TEXT.split(" ");
  const accentFrom = words.indexOf("Notre");

  return (
    <section className="paper relative z-10 -mt-10 rounded-t-[2rem] pb-16 pt-20 sm:-mt-16 sm:rounded-t-[3rem] sm:pb-24 sm:pt-32">
      <Container>
        <p ref={ref} className="max-w-[1120px] font-display text-[clamp(1.9rem,4.5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          {reduce
            ? TEXT
            : words.map((w, i) => (
                <Word key={i} word={w} range={[i / words.length, (i + 1) / words.length]} progress={scrollYProgress} accent={i >= accentFrom} />
              ))}
        </p>

        <Reveal className="mt-12 sm:mt-16">
          <p className="text-base font-semibold text-fog">Vous êtes plutôt :</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {sectors.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/secteurs/${s.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-graphite/20 px-5 py-3 text-base font-semibold text-graphite transition-colors hover:border-graphite hover:bg-graphite hover:text-white"
                >
                  {s.title}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
