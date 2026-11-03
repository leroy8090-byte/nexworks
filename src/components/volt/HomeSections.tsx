"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  volt,
  voltFaq,
  voltManifesto,
  voltQuotes,
  voltSpaces,
  voltStats,
  voltUnivers,
} from "@/data/volt";
import { PlanCards } from "./Plans";
import { ScheduleBoard } from "./ScheduleBoard";
import { Counter, Photo, Reveal, SectionHead, VoltButton, Wrap } from "./ui";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#101010]">
      <motion.div className="absolute inset-0 -z-10 will-change-transform" style={{ y }}>
        <Photo
          src="/volt/hero.webp"
          alt="Athlète s'entraînant dans l'espace force de VOLT FITNESS CLUB, lumière sombre et contrastée"
          className="absolute inset-0 h-[115%] w-full"
          priority
          sizes="100vw"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101010] via-[#101010]/55 to-[#101010]/30" />

      <Wrap className="relative pb-24 pt-44 sm:pb-28">
        <motion.div style={{ y: textY, opacity }}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] font-extrabold uppercase tracking-[0.3em] text-[#F5F5F0]/80">
            <span>SAINT-RAPHAËL · FRENCH RIVIERA</span>
            <span className="text-[#C6FF3D]">VOLT / 001</span>
          </div>
          <h1 className="mt-6 font-[family-name:var(--font-volt-display)] text-[5.6rem] uppercase leading-[0.84] text-[#F5F5F0] sm:text-[10rem] lg:text-[14rem]">
            <span className="block">
              <span className="text-[#C6FF3D]">B</span>UILT TO
            </span>
            <span className="block">
              BE <span className="text-[#C6FF3D]">STRONGER.</span>
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-[1.75] text-[#F5F5F0]/75">
            {volt.slogan} Un club fictif pensé pour l&apos;entraînement exigeant : force, performance et énergie collective.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <VoltButton href={`${volt.basePath}/contact?cours=essai`}>ESSAYER LE CLUB</VoltButton>
            <VoltButton href={`${volt.basePath}/planning`} variant="secondary">
              VOIR LE PLANNING
            </VoltButton>
          </div>
        </motion.div>
        <div className="absolute bottom-8 right-5 hidden flex-col items-center gap-3 sm:right-8 md:flex lg:right-12" aria-hidden>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#F5F5F0]/70 [writing-mode:vertical-rl]">Scroll</span>
          <span className="relative block h-14 w-px overflow-hidden bg-[#F5F5F0]/25">
            <motion.span
              className="absolute inset-x-0 top-0 h-5 bg-[#C6FF3D]"
              animate={reduce ? undefined : { y: [-20, 56] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </Wrap>
    </section>
  );
}

export function Stats() {
  return (
    <section className="border-y border-[#F5F5F0]/10 bg-[#1B1B1B]">
      <Wrap className="grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
        {voltStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07} className="lg:border-l lg:border-[#F5F5F0]/10 lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
            <Counter
              value={s.value}
              suffix={s.suffix}
              className="font-[family-name:var(--font-volt-display)] text-[4.2rem] leading-none text-[#C6FF3D] sm:text-[5.5rem]"
            />
            <p className="mt-2 text-[13px] uppercase tracking-[0.12em] text-[#F5F5F0]/65">{s.label}</p>
          </Reveal>
        ))}
        <p className="col-span-2 text-[11.5px] text-[#858585] lg:col-span-4">Chiffres illustratifs d&apos;un club fictif.</p>
      </Wrap>
    </section>
  );
}

export function Univers() {
  return (
    <section className="py-24 sm:py-32">
      <Wrap>
        <SectionHead eyebrow="Univers" title="Trois façons de s'entraîner" text="Choisissez votre terrain de jeu — ou passez de l'un à l'autre." />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {voltUnivers.map((u, i) => (
            <Reveal key={u.key} delay={i * 0.1}>
              <Link
                href={`${volt.basePath}/programmes`}
                className="group relative block aspect-[3/4] overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF3D] lg:aspect-[4/5]"
              >
                <Photo
                  src={u.image}
                  alt={u.alt}
                  className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="text-[12px] font-extrabold tracking-[0.3em] text-[#C6FF3D]">{u.tag}</span>
                  <h3 className="font-[family-name:var(--font-volt-display)] text-[4.4rem] leading-[0.9] text-[#F5F5F0] transition-colors group-hover:text-[#C6FF3D]">
                    {u.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-[#F5F5F0]/75 sm:translate-y-2 sm:opacity-0 sm:transition-all sm:duration-500 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100">
                    {u.text}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className="bg-[#F5F5F0] py-24 text-[#101010] sm:py-32">
      <Wrap className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.3em] text-[#101010]/60">Manifeste</p>
          </Reveal>
          {voltManifesto.map((l, i) => (
            <Reveal key={l} delay={i * 0.12}>
              <p className="mt-4 font-[family-name:var(--font-volt-display)] text-[3.2rem] uppercase leading-[0.95] sm:text-[5.2rem]">
                {i === 0 ? (
                  <>
                    <span className="bg-[#C6FF3D] px-2">{l}</span>
                  </>
                ) : (
                  l
                )}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-lg text-[16px] leading-[1.8] text-[#101010]/70">
              VOLT est un concept : un club qui privilégie la régularité, la technique et l&apos;écoute de soi plutôt que les promesses spectaculaires. Aucun résultat n&apos;est garanti.
            </p>
            <div className="mt-8">
              <Link
                href={`${volt.basePath}/club`}
                className="text-[12.5px] font-extrabold uppercase tracking-[0.16em] underline decoration-[#C6FF3D] decoration-4 underline-offset-8 hover:decoration-[#101010]"
              >
                Découvrir le club →
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Photo
            src="/volt/about.webp"
            alt="Portrait d'un coach dans la salle de VOLT FITNESS CLUB"
            className="aspect-[4/5] w-full"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </Reveal>
      </Wrap>
    </section>
  );
}

const spaceLayout = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-6",
  "lg:col-span-6",
];

export function Spaces({ showHead = true }: { showHead?: boolean }) {
  return (
    <section className="py-24 sm:py-32">
      <Wrap>
        {showHead && <SectionHead eyebrow="Équipements" title="Des espaces pour chaque effort" text="Cinq zones imaginées pour s'entraîner sans se marcher dessus." />}
        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {voltSpaces.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08} className={`${spaceLayout[i]} min-h-[280px]`}>
              <figure className="group relative h-full min-h-[280px] w-full overflow-hidden">
                <Photo
                  src={s.image}
                  alt={`${s.title} de VOLT FITNESS CLUB`}
                  className="absolute inset-0 transition-transform duration-[900ms] group-hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#101010]/90 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-[family-name:var(--font-volt-display)] text-[2.4rem] uppercase leading-none transition-colors group-hover:text-[#C6FF3D]">{s.title}</p>
                  <p className="mt-1.5 text-[13px] text-[#F5F5F0]/70">{s.text}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
export function PlanningPreview() {
  return (
    <section className="border-y border-[#F5F5F0]/10 bg-[#1B1B1B] py-24 sm:py-32">
      <Wrap className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
        <div>
          <SectionHead eyebrow="Planning" title="Votre semaine, rythmée" text="Sélectionnez un jour pour voir les cours. Planning fictif, réservation en démonstration." />
        </div>
        <Reveal>
          <ScheduleBoard compact />
        </Reveal>
      </Wrap>
    </section>
  );
}

export function PricingPreview() {
  return (
    <section className="py-24 sm:py-32">
      <Wrap>
        <SectionHead eyebrow="Abonnements" title="Choisissez votre intensité" text="Trois formules fictives. Tarifs illustratifs, sans valeur contractuelle." />
        <div className="mt-16">
          <PlanCards />
        </div>
        <div className="mt-10">
          <VoltButton href={`${volt.basePath}/abonnements`} variant="ghost">
            Comparer les formules →
          </VoltButton>
        </div>
      </Wrap>
    </section>
  );
}

export function Philosophy() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % voltQuotes.length), 5500);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const q = voltQuotes[i];
  return (
    <section className="bg-[#C6FF3D] py-24 text-[#101010] sm:py-28">
      <Wrap>
        <p className="text-[12px] font-extrabold uppercase tracking-[0.3em]">Philosophie · Démonstration</p>
        <div
          className="mt-6 min-h-[16rem] sm:min-h-[14rem]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <p className="max-w-5xl font-[family-name:var(--font-volt-display)] text-[3.2rem] uppercase leading-[0.95] sm:text-[5.8rem]">« {q.text} »</p>
              <footer className="mt-5 text-[12.5px] font-bold uppercase tracking-[0.2em]">{q.label} — texte de marque, pas un avis client</footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex gap-2" role="group" aria-label="Choisir une citation">
          {voltQuotes.map((_, n) => (
            <button
              key={n}
              type="button"
              aria-label={`Citation ${n + 1}`}
              aria-current={n === i}
              onClick={() => setI(n)}
              className={`h-1.5 transition-all ${n === i ? "w-12 bg-[#101010]" : "w-6 bg-[#101010]/30 hover:bg-[#101010]/60"}`}
            />
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function Faq({ title = "Questions fréquentes" }: { title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  return (
    <section className="py-24 sm:py-32">
      <Wrap className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
        <SectionHead eyebrow="FAQ" title={title} />
        <ul className="border-t border-[#F5F5F0]/12">
          {voltFaq.map((f, n) => {
            const on = open === n;
            return (
              <li key={f.q} className="border-b border-[#F5F5F0]/12">
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`faq-${n}`}
                    onClick={() => setOpen(on ? null : n)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-[17px] font-bold transition-colors hover:text-[#C6FF3D] focus-visible:outline-2 focus-visible:outline-[#C6FF3D]"
                  >
                    {f.q}
                    <span aria-hidden className={`font-[family-name:var(--font-volt-display)] text-[2rem] leading-none text-[#C6FF3D] transition-transform ${on ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`faq-${n}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-[15px] leading-[1.8] text-[#F5F5F0]/65">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Wrap>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-[#F5F5F0]/10 py-28 sm:py-40">
      <Photo src="/volt/hero.webp" alt="" className="absolute inset-0 -z-10 opacity-25" sizes="100vw" />
      <Wrap className="text-center">
        <Reveal>
          <h2 className="font-[family-name:var(--font-volt-display)] text-[4.6rem] uppercase leading-[0.88] sm:text-[9rem]">
            PUSH YOUR <span className="text-[#C6FF3D]">LIMITS.</span>
            <br />
            DEFINE YOURSELF.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[15px] text-[#F5F5F0]/70">Essai gratuit imaginaire : parcours de démonstration, aucune inscription réelle.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <VoltButton href={`${volt.basePath}/contact?cours=essai`}>ESSAYER LE CLUB</VoltButton>
            <VoltButton href={`${volt.basePath}/abonnements`} variant="secondary">
              VOIR LES ABONNEMENTS
            </VoltButton>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
