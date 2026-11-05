"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { destinations, faq, properties, riviera } from "@/data/riviera";
import { PropertyCard } from "./PropertyCard";
import { PropertySearch } from "./PropertySearch";
import { Reveal, RivieraButton, SectionHead, Wrap } from "./ui";

export function Hero() {
  const reduce = useCalmMotion();
  const h = riviera.hero;
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] as const },
  });
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#24251F]">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={h.image} alt="Villa de prestige face à la Méditerranée sur la Côte d'Azur" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[#24251F]/40" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#24251F]/60 to-transparent" />
      <Wrap className="relative pb-20 pt-40 sm:pb-28">
        <motion.p {...fade(0.5)} className="text-[11.5px] font-semibold uppercase tracking-[0.32em] text-[#D9CBB7]">
          {h.label}
        </motion.p>
        <motion.h1
          {...fade(0.7)}
          className="mt-6 max-w-4xl font-[family-name:var(--font-riviera-display)] text-[3.4rem] font-light leading-[1] text-[#FFFEFA] sm:text-[5.5rem] lg:text-[6.8rem]"
        >
          {h.title}
        </motion.h1>
        <motion.p {...fade(0.95)} className="mt-7 max-w-xl text-[17px] leading-[1.75] text-[#FFFEFA]/85">
          {h.sub}
        </motion.p>
        <motion.div {...fade(1.15)} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <RivieraButton href={`${riviera.basePath}/proprietes`} variant="light" className="!bg-[#FFFEFA] !text-[#24251F] hover:!bg-[#D9CBB7]">
            Explorer nos propriétés
          </RivieraButton>
          <RivieraButton href={`${riviera.basePath}/agence`} variant="light">
            Découvrir notre agence
          </RivieraButton>
        </motion.div>
        <motion.p {...fade(1.4)} className="mt-14 text-[12px] uppercase tracking-[0.3em] text-[#D9CBB7]">
          {h.cities}
        </motion.p>
      </Wrap>
    </section>
  );
}

export function SearchSection() {
  return (
    <section className="relative z-10 -mt-12 pb-8 sm:-mt-16">
      <Wrap>
        <Reveal>
          <PropertySearch variant="home" />
        </Reveal>
      </Wrap>
    </section>
  );
}

export function Featured() {
  return (
    <section className="py-24 sm:py-32">
      <Wrap>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHead eyebrow="Sélection" title="Propriétés à découvrir" text="Une sélection de biens imaginés pour cette démonstration, du village balnéaire aux hauteurs de l'Estérel." />
          <Reveal>
            <Link href={`${riviera.basePath}/proprietes`} className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#68715B] underline underline-offset-8">
              Voir toutes les propriétés
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function DestinationsTeaser() {
  const list = destinations.slice(0, 3);
  return (
    <section className="border-y border-[#D9CBB7] bg-[#FFFEFA] py-24 sm:py-32">
      <Wrap>
        <SectionHead eyebrow="Destinations" title="Un littoral, mille façons d'y vivre" text="Chaque commune a sa lumière, son rythme et ses adresses." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {list.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.1}>
              <Link href={`${riviera.basePath}/proprietes?location=${encodeURIComponent(d.name)}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#D9CBB7]">
                  <Image src={d.image} alt={`${d.name}, Côte d'Azur`} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#24251F]/70 to-transparent p-6 pt-20">
                    <h3 className="font-[family-name:var(--font-riviera-display)] text-[2rem] font-light text-[#FFFEFA]">{d.name}</h3>
                    <p className="mt-1 text-[13.5px] text-[#FFFEFA]/80">{d.text}</p>
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

export function AgencyTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <Wrap className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-[#D9CBB7]">
            <Image src={riviera.aboutImage} alt="Intérieur lumineux d'une maison de la Côte d'Azur" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <div>
          <SectionHead eyebrow="L'agence" title="Une approche discrète, attentive et exigeante" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-[16px] leading-[1.85] text-[#858178]">
              MAISON RIVIERA est un concept d&apos;agence imaginé autour d&apos;une idée simple : un bien se choisit d&apos;abord pour la vie qu&apos;il permet. Peu de propriétés, mais présentées avec justesse, et un accompagnement sans artifice.
            </p>
            <div className="mt-10">
              <RivieraButton href={`${riviera.basePath}/agence`} variant="secondary">
                Découvrir l&apos;agence
              </RivieraButton>
            </div>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}

export function FaqAccordion({ items = faq }: { items?: typeof faq }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-[#D9CBB7]">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-[#D9CBB7]">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-[family-name:var(--font-riviera-display)] text-[1.5rem] font-normal text-[#24251F]">{f.q}</span>
                <span aria-hidden className="text-2xl font-light text-[#68715B]">{isOpen ? "−" : "+"}</span>
              </button>
            </h3>
            <div id={`faq-${i}`} role="region" hidden={!isOpen}>
              <p className="max-w-2xl pb-7 text-[15.5px] leading-[1.8] text-[#858178]">{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="bg-[#FFFEFA] py-24 sm:py-32">
      <Wrap className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
        <SectionHead eyebrow="Questions" title="Vos questions, nos réponses" />
        <Reveal>
          <FaqAccordion />
        </Reveal>
      </Wrap>
    </section>
  );
}

export function CtaContact({ title = "Parlons de votre projet", text = "Achat, vente ou simple réflexion : décrivez-nous votre projet via le formulaire de démonstration." }: { title?: string; text?: string }) {
  return (
    <section className="bg-[#68715B] py-24 text-center sm:py-28">
      <Wrap>
        <Reveal>
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.3em] text-[#D9CBB7]">Contact</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-riviera-display)] text-[2.4rem] font-light leading-[1.1] text-[#FFFEFA] sm:text-[3.2rem]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-[#FFFEFA]/80">{text}</p>
          <div className="mt-9">
            <RivieraButton href={`${riviera.basePath}/contact`} variant="light">
              Confier mon projet
            </RivieraButton>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
