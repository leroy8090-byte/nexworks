"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { sierra, sierraFaq, sierraReviews, sierraSectors, sierraServices, sierraTeam, type SierraProperty } from "@/data/sierra";
import { FeaturedLive } from "./CatalogLive";
import { HoursCard } from "./Extras";
import { PropertySearch } from "./PropertySearch";
import { Reveal, SectionHead, SierraButton, Wrap } from "./ui";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const h = sierra.hero;
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#231F31]">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image src={h.image} alt="Façade de l'agence Sierra Immobilier à Saint-Raphaël" fill priority sizes="100vw" className="object-cover object-[50%_60%]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#231F31]/92 via-[#231F31]/72 to-[#231F31]/35" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#231F31] to-transparent" />
      <Wrap className="relative pb-24 pt-40 sm:pb-28">
        <motion.p {...fade(0.35)} className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#A68936]">
          {h.label}
        </motion.p>
        <motion.p {...fade(0.45)} className="mt-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-white/80">
          {sierra.servicesLine}
        </motion.p>
        <motion.h1
          {...fade(0.55)}
          className="mt-6 max-w-3xl font-[family-name:var(--font-sierra-display)] text-[3rem] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-[4.6rem] lg:text-[5.4rem]"
        >
          {h.titleLine1}
          <br />
          <span className="text-[#A68936]">{h.titleLine2}</span>
        </motion.h1>
        <motion.p {...fade(0.75)} className="mt-6 max-w-xl text-[16px] leading-[1.75] text-white/80">
          {h.sub}
        </motion.p>
        <motion.div {...fade(0.95)} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <SierraButton href={`${sierra.basePath}/biens`} variant="gold">
            Découvrir nos biens
          </SierraButton>
          <SierraButton href={`${sierra.basePath}/contact`} variant="ghost">
            Confier mon projet
          </SierraButton>
        </motion.div>
      </Wrap>
    </section>
  );
}

export function SearchSection() {
  return (
    <section className="relative z-10 -mt-10 pb-4 sm:-mt-14">
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
    <section className="py-20 sm:py-28">
      <Wrap className="grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[5/6] overflow-hidden bg-[#231F31]">
            <Image src={sierra.aboutImage} alt="Agence Sierra Immobilier — vitrine Location Gestion Transaction" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-[#231F31]/88 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A68936]">Agence depuis {sierra.founded}</p>
              <p className="mt-1 text-[14px] text-white">Face au vieux port de Saint-Raphaël</p>
            </div>
          </div>
        </Reveal>
        <div className="lg:col-span-7">
          <SectionHead
            eyebrow="L'agence"
            title="Une histoire de confiance depuis 1973."
            text="Fondée par Georges Sierra, l'agence accompagne depuis plus de cinquante ans les projets immobiliers des familles et investisseurs du littoral varois."
          />
          <Reveal delay={0.1} className="mt-8 space-y-4 text-[15px] leading-[1.85] text-[#7A7684]">
            <p>
              Emplacement : {sierra.address}, {sierra.postalCode} {sierra.city}. Membre {sierra.memberships.join(" et ")}.
            </p>
            <SierraButton href={`${sierra.basePath}/agence`} variant="secondary" className="mt-4">
              Découvrir notre histoire
            </SierraButton>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}

export function Featured({ properties }: { properties: SierraProperty[] }) {
  return (
    <section className="border-y border-[#E8E4DE] bg-white py-20 sm:py-28">
      <Wrap>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHead
            eyebrow="Catalogue"
            title="Biens actuellement en vente."
            text="Sélection gérée depuis le back-office. Ajoutez ou retirez des annonces en quelques clics."
          />
          <Reveal>
            <Link href={`${sierra.basePath}/biens`} className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#A68936] underline underline-offset-8">
              Voir tous les biens
            </Link>
          </Reveal>
        </div>
        <FeaturedLive initial={properties} />
        <Reveal className="mt-10 text-center">
          <a href={sierra.officialVentes} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#7A7684] underline underline-offset-4 hover:text-[#A68936]">
            Voir le catalogue complet sur sierra-immo.fr
          </a>
        </Reveal>
      </Wrap>
    </section>
  );
}

export function Expertise() {
  return (
    <section className="bg-[#231F31] py-20 sm:py-28">
      <Wrap>
        <SectionHead light eyebrow="Métiers" title="Location · Gestion · Transaction." text="Quatre expertises, une même exigence de proximité." />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {sierraServices.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.07}>
              <Link href={s.href} className="group grid overflow-hidden border border-white/10 bg-[#2D2640] sm:grid-cols-[140px_1fr]">
                <div className="relative min-h-[120px]">
                  <Image src={s.image} alt="" fill sizes="140px" className="object-cover opacity-80 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  <p className="text-[12px] font-bold text-[#A68936]">{s.n}</p>
                  <h3 className="mt-1 text-[1.35rem] font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/65">{s.text}</p>
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
    <section className="bg-[#A68936] py-20 sm:py-24">
      <Wrap className="grid items-center gap-8 lg:grid-cols-2">
        <SectionHead light eyebrow="Estimation" title="Combien vaut votre bien ?" text="Une estimation juste commence par une connaissance précise du marché local." />
        <Reveal>
          <SierraButton href={`${sierra.basePath}/estimation`} variant="primary" className="!bg-[#231F31] hover:!bg-white hover:!text-[#231F31]">
            Estimer mon bien
          </SierraButton>
        </Reveal>
      </Wrap>
    </section>
  );
}

export function Territory() {
  return (
    <section className="py-20 sm:py-28">
      <Wrap>
        <SectionHead
          eyebrow="Territoire"
          title="Fréjus · Saint-Raphaël · Puget-sur-Argens."
          text="Photos réelles des communes — Port Fréjus, vieux port de Saint-Raphaël, village de Puget."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {sierraSectors.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.08}>
              <Link href={d.href} className="group relative block overflow-hidden border border-[#E8E4DE] bg-[#231F31]">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={d.image}
                    alt={`${d.name} — photographie réelle`}
                    fill
                    sizes="(min-width:768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#231F31] via-[#231F31]/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A68936]">0{i + 1}</p>
                    <h3 className="mt-1 text-[1.55rem] font-semibold text-white">{d.name}</h3>
                    <p className="mt-1 text-[13px] text-white/75">{d.text}</p>
                    <span className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-white underline-offset-4 group-hover:underline">
                      Explorer
                    </span>
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
    <section className="border-y border-[#E8E4DE] bg-white py-20 sm:py-28">
      <Wrap>
        <SectionHead eyebrow="Équipe" title="Des visages, une histoire, un engagement." text="Fonctions publiques de l'agence. Pas de portraits générés." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sierraTeam.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.05}>
              <div className="border border-[#E8E4DE] bg-[#FBFAF8] p-6">
                <div className="flex size-12 items-center justify-center bg-[#231F31] text-[13px] font-bold tracking-wide text-[#A68936]">
                  {m.name
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <h3 className="mt-4 text-[1.15rem] font-semibold text-[#231F31]">{m.name}</h3>
                <p className="mt-1 text-[13.5px] text-[#7A7684]">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="overflow-hidden bg-[#231F31] py-20 sm:py-28">
      <Wrap>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHead
            light
            eyebrow="Avis Google"
            title="Ce que disent les clients."
            text="Citations reprises des avis Google transmis — non réécrits. Focus fréquent : l'accompagnement de Frédéric Maltese."
          />
          <Reveal>
            <a
              href={sierra.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex border border-[#A68936] px-6 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.18em] text-[#A68936] hover:bg-[#A68936] hover:text-white"
            >
              Voir sur Google
            </a>
          </Reveal>
        </div>
        <div className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
          {sierraReviews.map((r, i) => (
            <Reveal key={r.author} delay={i * 0.08} className="min-w-[280px] max-w-sm shrink-0 snap-start sm:min-w-[320px]">
              <article className="h-full border border-white/10 bg-[#2D2640] p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">{r.author}</p>
                  <p className="text-[#A68936]" aria-label={`${r.rating} étoiles`}>
                    {"★".repeat(r.rating)}
                  </p>
                </div>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/45">
                  Google · {r.when}
                  {r.visited ? ` · ${r.visited}` : ""}
                </p>
                <p className="mt-4 text-[14.5px] leading-[1.75] text-white/80">“{r.text}”</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-[#E8E4DE] bg-[#F4F2F0] py-20 sm:py-28">
      <Wrap className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHead eyebrow="FAQ" title="Les questions essentielles." />
        <div>
          {sierraFaq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-[#D8D2C8]">
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                  <span className="text-[1.05rem] font-semibold text-[#231F31]">{item.q}</span>
                  <span className="text-[#A68936]">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p className="pb-5 text-[14.5px] leading-[1.8] text-[#7A7684]">{item.a}</p>}
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
    <section className="bg-[#231F31] py-20 sm:py-28">
      <Wrap className="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHead light eyebrow="Contact" title="Parlons de votre projet." />
          <Reveal className="mt-8 text-white/75">
            <p className="text-[15px] leading-relaxed">
              {sierra.address}
              <br />
              {sierra.postalCode} {sierra.city}
            </p>
            <a href={sierra.phoneHref} className="mt-5 inline-block text-[1.6rem] font-semibold text-[#A68936] hover:text-white">
              {sierra.phone}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <SierraButton href={sierra.phoneHref} variant="gold">
                Appeler
              </SierraButton>
              <SierraButton href={sierra.mapsUrl} variant="ghost">
                Itinéraire
              </SierraButton>
              <SierraButton href={`${sierra.basePath}/contact`} variant="ghost">
                Message
              </SierraButton>
            </div>
            <div className="mt-8 max-w-md">
              <HoursCard light />
            </div>
          </Reveal>
        </div>
        <Reveal>
          <iframe
            title="Localisation Sierra Immobilier"
            src="https://maps.google.com/maps?q=6%20avenue%20du%20Commandant%20Guilbaud%2083700%20Saint-Raphael&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="h-[320px] w-full border-0 grayscale lg:h-full lg:min-h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </Wrap>
    </section>
  );
}
