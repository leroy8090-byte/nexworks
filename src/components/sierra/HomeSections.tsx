"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  sierra,
  sierraFaq,
  sierraProperties,
  sierraSectors,
  sierraServices,
  sierraTeam,
} from "@/data/sierra";
import { PropertyCard } from "./PropertyCard";
import { PropertySearch } from "./PropertySearch";
import { Reveal, SectionHead, SierraButton, Wrap } from "./ui";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const h = sierra.hero;
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#222421]">
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={h.image} alt="Architecture méditerranéenne sur la Côte d'Azur" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-[#222421]/45" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#222421]/70 to-transparent" />
      <Wrap className="relative pb-24 pt-44 sm:pb-28">
        <motion.p {...fade(0.45)} className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D8C9B5]">
          {h.label}
        </motion.p>
        <motion.h1
          {...fade(0.65)}
          className="mt-6 max-w-4xl font-[family-name:var(--font-sierra-display)] text-[3.2rem] font-light leading-[0.95] text-[#FCFBF8] sm:text-[5.2rem] lg:text-[6.4rem]"
        >
          {h.titleLine1}
          <br />
          <span className="italic text-[#D8C9B5]">{h.titleLine2}</span>
        </motion.h1>
        <motion.p {...fade(0.9)} className="mt-7 max-w-xl text-[17px] leading-[1.75] text-[#FCFBF8]/88">
          {h.sub}
        </motion.p>
        <motion.div {...fade(1.1)} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <SierraButton href={`${sierra.basePath}/biens`} variant="light" className="!bg-[#FCFBF8] !text-[#222421] hover:!bg-[#D8C9B5]">
            Découvrir nos biens
          </SierraButton>
          <SierraButton href={`${sierra.basePath}/contact`} variant="light">
            Confier mon projet
          </SierraButton>
        </motion.div>
        <motion.div {...fade(1.35)} className="mt-16 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#D8C9B5]">
          <span className="block h-10 w-px bg-[#D8C9B5]/70" />
          Scroll
        </motion.div>
      </Wrap>
    </section>
  );
}

export function SearchSection() {
  return (
    <section className="relative z-10 -mt-12 pb-6 sm:-mt-16">
      <Wrap>
        <Reveal>
          <PropertySearch variant="home" />
        </Reveal>
      </Wrap>
    </section>
  );
}

export function History() {
  return (
    <section className="py-24 sm:py-32">
      <Wrap className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#D8C9B5]">
            <Image src={sierra.aboutImage} alt="Ambiance littorale méditerranéenne près de Saint-Raphaël" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-[family-name:var(--font-sierra-display)] text-[6rem] font-light leading-none text-[#263B48] sm:text-[8rem]">
              {sierra.founded}
            </p>
          </Reveal>
          <SectionHead
            eyebrow="L'agence"
            title="Une histoire de confiance depuis 1973."
            text="Depuis plus de cinquante ans, Sierra Immobilier accompagne les projets de vie et les ambitions immobilières de ses clients. Une histoire familiale construite sur la proximité, l'écoute et une connaissance approfondie du marché local."
          />
          <Reveal delay={0.12} className="mt-8">
            <p className="max-w-xl text-[15px] leading-[1.85] text-[#77766F]">
              Fondée par {sierra.founder}, l&apos;agence bénéficie d&apos;un emplacement face au vieux port de Saint-Raphaël et accompagne
              acheteurs, vendeurs et propriétaires sur le littoral varois.
            </p>
            <SierraButton href={`${sierra.basePath}/agence`} variant="secondary" className="mt-8">
              Découvrir notre histoire
            </SierraButton>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}

export function Featured() {
  const list = sierraProperties.filter((p) => p.transaction === "achat").slice(0, 3);
  return (
    <section className="border-y border-[#D8C9B5]/80 bg-[#FCFBF8] py-24 sm:py-32">
      <Wrap>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHead
            eyebrow="Sélection"
            title="Une sélection de biens à découvrir."
            text="Exemples de démonstration uniquement — non commercialisés ici. Catalogue officiel sur sierra-immo.fr."
          />
          <Reveal>
            <Link href={`${sierra.basePath}/biens`} className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#263B48] underline underline-offset-8">
              Voir tous nos biens
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function Expertise() {
  return (
    <section className="py-24 sm:py-32">
      <Wrap>
        <SectionHead eyebrow="Expertises" title="Quatre façons de vous accompagner." />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {sierraServices.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.08}>
              <Link href={s.href} className="group grid overflow-hidden border border-[#D8C9B5] bg-[#FCFBF8] sm:grid-cols-[1.1fr_1fr]">
                <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[240px]">
                  <Image src={s.image} alt="" fill sizes="(min-width:640px) 25vw, 100vw" className="object-cover transition-transform duration-[1100ms] group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-9">
                  <p className="font-[family-name:var(--font-sierra-display)] text-[2.4rem] font-light text-[#D8C9B5]">{s.n}</p>
                  <h3 className="mt-2 font-[family-name:var(--font-sierra-display)] text-[2rem] font-light text-[#222421]">{s.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#77766F]">{s.text}</p>
                  <span className="mt-6 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#263B48] underline-offset-8 group-hover:underline">
                    En savoir plus
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function EstimationTeaser() {
  return (
    <section className="relative overflow-hidden bg-[#263B48] py-24 sm:py-32">
      <Wrap className="relative grid items-center gap-10 lg:grid-cols-2">
        <SectionHead
          light
          eyebrow="Estimation"
          title="Combien vaut votre bien ?"
          text="Une estimation juste commence par une connaissance précise du marché local."
        />
        <Reveal>
          <p className="max-w-md text-[15px] leading-[1.85] text-[#FCFBF8]/75">
            Formulez une demande d&apos;estimation en quelques étapes. Aucun prix automatique n&apos;est calculé sur cette démonstration :
            votre demande est destinée à être étudiée par l&apos;agence.
          </p>
          <SierraButton href={`${sierra.basePath}/estimation`} variant="light" className="mt-8 !bg-[#FCFBF8] !text-[#222421]">
            Estimer mon bien
          </SierraButton>
        </Reveal>
      </Wrap>
    </section>
  );
}

export function Territory() {
  return (
    <section className="py-24 sm:py-32">
      <Wrap>
        <SectionHead eyebrow="Territoire" title="Notre territoire, notre expertise." text="Saint-Raphaël, Fréjus, Puget-sur-Argens et les communes environnantes." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {sierraSectors.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.1}>
              <Link href={d.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#D8C9B5]">
                  <Image src={d.image} alt={`${d.name}, Var`} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#222421]/75 to-transparent p-6 pt-24">
                    <h3 className="font-[family-name:var(--font-sierra-display)] text-[2rem] font-light text-[#FCFBF8]">{d.name}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-[#FCFBF8]/85">{d.text}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function TeamTeaser() {
  return (
    <section className="border-y border-[#D8C9B5]/80 bg-[#FCFBF8] py-24 sm:py-32">
      <Wrap>
        <SectionHead eyebrow="Équipe" title="Des visages, une histoire, un engagement." text="Fonctions reprises des informations publiques de l'agence. Aucun portrait généré." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sierraTeam.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.06}>
              <div className="border border-[#D8C9B5] bg-[#F5F2EC] p-7">
                <div className="flex size-14 items-center justify-center bg-[#263B48] font-[family-name:var(--font-sierra-display)] text-[1.4rem] text-[#FCFBF8]">
                  {m.name
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-sierra-display)] text-[1.55rem] font-light text-[#222421]">{m.name}</h3>
                <p className="mt-2 text-[13.5px] text-[#77766F]">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <SierraButton href={`${sierra.basePath}/agence`} variant="secondary">
            Voir l&apos;agence
          </SierraButton>
        </Reveal>
      </Wrap>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="py-24 sm:py-32">
      <Wrap className="grid gap-12 lg:grid-cols-2 lg:items-end">
        <SectionHead
          eyebrow="Confiance"
          title="La réputation se construit dans le temps."
          text="Nous ne reproduisons pas d'avis clients ici. Consultez les retours originaux sur le profil Google de l'agence, notamment autour de l'écoute et de l'accompagnement."
        />
        <Reveal>
          <a
            href={sierra.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex border border-[#222421] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#222421] transition-colors hover:bg-[#222421] hover:text-[#FCFBF8]"
          >
            Voir les avis Google
          </a>
        </Reveal>
      </Wrap>
    </section>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-[#D8C9B5]/80 bg-[#FCFBF8] py-24 sm:py-32">
      <Wrap className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <SectionHead eyebrow="FAQ" title="Questions fréquentes." text="Réponses factuelles pour le SEO et le GEO." />
        <div>
          {sierraFaq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-[#D8C9B5]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-[family-name:var(--font-sierra-display)] text-[1.35rem] font-light text-[#222421]">{item.q}</span>
                  <span className="text-[#263B48]">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p className="pb-5 text-[15px] leading-[1.8] text-[#77766F]">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}

export function ContactCta() {
  return (
    <section className="bg-[#222421] py-24 sm:py-32">
      <Wrap>
        <SectionHead light eyebrow="Contact" title="Parlons de votre projet." />
        <Reveal className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="text-[#D8C9B5]">
            <p className="font-[family-name:var(--font-sierra-display)] text-[2rem] text-[#FCFBF8]">{sierra.name}</p>
            <p className="mt-4 text-[15px] leading-relaxed">
              {sierra.address}
              <br />
              {sierra.postalCode} {sierra.city}
            </p>
            <a href={sierra.phoneHref} className="mt-6 inline-block text-[1.6rem] text-[#FCFBF8] hover:underline">
              {sierra.phone}
            </a>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <SierraButton href={sierra.phoneHref} variant="light" className="!bg-[#FCFBF8] !text-[#222421]">
                Appeler l&apos;agence
              </SierraButton>
              <SierraButton href={sierra.mapsUrl} variant="light">
                Itinéraire
              </SierraButton>
              <SierraButton href={`${sierra.basePath}/contact`} variant="light">
                Envoyer un message
              </SierraButton>
            </div>
          </div>
          <div className="overflow-hidden border border-[#FCFBF8]/15 bg-[#263B48]/40">
            <iframe
              title="Localisation Sierra Immobilier à Saint-Raphaël"
              src="https://maps.google.com/maps?q=6%20avenue%20du%20Commandant%20Guilbaud%2083700%20Saint-Raphael&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-[320px] w-full border-0 grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
