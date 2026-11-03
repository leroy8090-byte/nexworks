"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  azur,
  azurBand,
  azurFaq,
  azurServices,
  azurSdbItems,
  azurSteps,
  azurWhy,
  azurZones,
} from "@/data/azur";
import { AzurIcons } from "./Icons";
import { QuoteForm } from "./QuoteForm";
import { AzurButton, Reveal, SectionHead, Wrap } from "./ui";

const iconMap = {
  wrench: AzurIcons.wrench,
  drop: AzurIcons.drop,
  bath: AzurIcons.bath,
  home: AzurIcons.home,
  heater: AzurIcons.heater,
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#EBF7FC]">
      <div className="pointer-events-none absolute -left-24 top-10 size-[320px] rounded-full bg-[#4FC3F7]/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-16 bottom-0 size-[280px] rounded-full bg-[#0077C2]/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute right-[18%] top-8 hidden opacity-[0.12] lg:block" aria-hidden>
        <Image src="/azur/logo.webp" alt="" width={220} height={220} className="h-40 w-auto rotate-6" />
      </div>
      <Wrap className="relative grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:py-20">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DFF5] bg-white px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#0077C2]">
              <span className="size-2 rounded-full bg-[#FFC107]" aria-hidden />
              Plomberie · Dépannage · Rénovation
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-[family-name:var(--font-azur-display)] text-[2.55rem] font-bold leading-[1.05] tracking-tight text-[#002D72] sm:text-[3.5rem] lg:text-[3.75rem]">
              Votre <span className="text-[#0077C2]">plombier de confiance</span> à Saint-Raphaël.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#536273]">
              Du dépannage à la rénovation complète de votre salle de bain, nous vous accompagnons avec des solutions adaptées à vos besoins.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AzurButton href="/azur-plomberie/contact">Demander un devis</AzurButton>
              <AzurButton href="/azur-plomberie/services" variant="secondary">
                Découvrir nos services
              </AzurButton>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-[14px] font-medium text-[#536273]">Particuliers · Installation · Dépannage · Rénovation</p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="relative">
          <motion.div style={{ y }} className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_40px_80px_-40px_rgba(16,42,67,.55)] sm:aspect-[5/6]">
            <Image
              src="/azur/hero.webp"
              alt="Salle de bain contemporaine lumineuse, illustration du savoir-faire AZUR PLOMBERIE"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002D72]/45 via-transparent to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.55 }}
            className="absolute -left-3 bottom-16 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:left-[-18px]"
          >
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0077C2]">Intervention</p>
            <p className="mt-0.5 text-[15px] font-bold text-[#002D72]">Dépannage plomberie</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.55 }}
            className="absolute -right-2 top-10 rounded-2xl border border-white/60 bg-[#002D72] px-4 py-3 text-white shadow-xl sm:right-4"
          >
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#4FC3F7]">Devis</p>
            <p className="mt-0.5 text-[15px] font-bold">Demander une intervention</p>
          </motion.div>
        </Reveal>
      </Wrap>
    </section>
  );
}

export function ReassuranceBand() {
  return (
    <section className="border-y border-[#E4EBF1] bg-white">
      <Wrap className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-5">
        {azurBand.map((b) => {
          const Icon = iconMap[b.icon];
          return (
            <Link
              key={b.label}
              href={b.href}
              className="flex items-center gap-3 px-2 py-5 transition hover:bg-[#F3F6F8] lg:justify-center lg:px-3"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#E3F6FD] text-[#0077C2] ring-1 ring-[#4FC3F7]/35">
                <Icon className="size-5" />
              </span>
              <span className="text-[14px] font-semibold text-[#002D72]">{b.label}</span>
            </Link>
          );
        })}
      </Wrap>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Wrap>
        <Reveal>
          <SectionHead
            eyebrow="Nos services"
            title="Des solutions pour tous vos besoins en plomberie."
            text="De la petite réparation aux travaux de rénovation, découvrez nos prestations."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {azurServices.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E4EBF1] bg-white shadow-[0_16px_40px_-30px_rgba(16,42,67,.4)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgba(16,42,67,.45)]">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="eager"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-[family-name:var(--font-azur-display)] text-[1.25rem] font-bold text-[#002D72]">{s.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[#536273]">{s.description}</p>
                  <Link
                    href={s.href ?? `/azur-plomberie/services/${s.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0077C2]"
                  >
                    En savoir plus <AzurIcons.arrow className="size-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function BathroomSection() {
  return (
    <section className="bg-[#F3F6F8] py-16 sm:py-24">
      <Wrap className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-35px_rgba(16,42,67,.5)] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/azur/sdb-hero.webp"
              alt="Salle de bain haut de gamme contemporaine avec douche et vasque"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="eager"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionHead
            eyebrow="Rénovation"
            title="Donnez une nouvelle dimension à votre salle de bain."
            text="Modernisez votre espace avec une rénovation pensée pour allier confort, esthétique et fonctionnalité."
          />
          <ul className="mt-8 space-y-3">
            {azurSdbItems.map((item) => (
              <li key={item.title} className="flex items-start gap-3 text-[15px] text-[#002D72]">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#FFC107] text-[#002D72]">
                  <AzurIcons.check className="size-3.5" />
                </span>
                <span>
                  <b className="font-semibold">{item.title}</b>
                  <span className="mt-0.5 block text-[14px] text-[#536273]">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <AzurButton href="/azur-plomberie/salle-de-bain">Parler de mon projet</AzurButton>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}

export function WhySection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Wrap>
        <Reveal>
          <SectionHead eyebrow="Pourquoi nous" title="Un service pensé pour votre tranquillité." />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {azurWhy.map((w, i) => (
            <Reveal key={w.n} delay={i * 0.05}>
              <article className="h-full rounded-2xl border border-[#E4EBF1] bg-[#F3F6F8] p-6">
                <p className="font-[family-name:var(--font-azur-display)] text-3xl font-bold text-[#4FC3F7]">{w.n}</p>
                <h3 className="mt-3 text-[1.15rem] font-bold text-[#002D72]">{w.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#536273]">{w.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function StepsSection() {
  return (
    <section className="bg-[#002D72] py-16 sm:py-24">
      <Wrap>
        <Reveal>
          <SectionHead light eyebrow="Méthode" title="Votre projet, en quatre étapes." />
        </Reveal>
        <ol className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {azurSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <li className="relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-[#4FC3F7] font-[family-name:var(--font-azur-display)] text-lg font-bold text-[#002D72]">
                  {s.n}
                </span>
                <h3 className="mt-4 text-[1.1rem] font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}

export function ZonePreview() {
  return (
    <section className="bg-[#F3F6F8] py-16 sm:py-24">
      <Wrap className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHead
            eyebrow="Zone d'intervention"
            title="À votre service sur la Côte d'Azur."
            text={`${azur.name} est présenté comme un artisan intervenant dans le secteur de Saint-Raphaël et ses environs. Cette zone est indicative du concept, et non une zone réellement desservie.`}
          />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {azurZones.map((z) => (
              <li key={z.name} className="inline-flex items-center gap-2 rounded-full border border-[#D5DEE7] bg-white px-4 py-2 text-[14px] font-semibold text-[#002D72]">
                <AzurIcons.pin className="size-4 text-[#0077C2]" />
                {z.name}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <AzurButton href="/azur-plomberie/zone-d-intervention" variant="secondary">
              Voir la zone
            </AzurButton>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#D5DEE7] bg-white p-6 shadow-[0_24px_50px_-30px_rgba(16,42,67,.35)] sm:p-8">
            <svg viewBox="0 0 480 360" className="w-full" role="img" aria-label="Carte stylisée de la zone indicative autour de Saint-Raphaël">
              <rect width="480" height="360" rx="24" fill="#E3F6FD" />
              <path d="M0 250 C80 210 140 280 220 240 S360 200 480 230 V360 H0Z" fill="#4FC3F7" opacity=".35" />
              <path d="M0 270 C100 230 160 300 250 260 S380 220 480 255 V360 H0Z" fill="#0077C2" opacity=".25" />
              {[
                [240, 150, "Saint-Raphaël"],
                [160, 170, "Fréjus"],
                [300, 130, "Sainte-Maxime"],
                [120, 210, "Puget"],
                [200, 210, "Roquebrune"],
                [340, 160, "Issambres"],
              ].map(([x, y, label]) => (
                <g key={String(label)}>
                  <circle cx={Number(x)} cy={Number(y)} r="7" fill="#002D72" />
                  <circle cx={Number(x)} cy={Number(y)} r="14" fill="#4FC3F7" opacity=".35" />
                  <text x={Number(x) + 14} y={Number(y) + 4} fontSize="13" fontWeight="600" fill="#002D72">
                    {label}
                  </text>
                </g>
              ))}
            </svg>
            <p className="mt-4 text-center text-[13px] text-[#536273]">Carte illustrative — aucune adresse exacte n&apos;est associée à ce concept.</p>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}

export function ReviewsPlaceholder() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Wrap>
        <Reveal>
          <SectionHead
            center
            eyebrow="Avis clients"
            title="La satisfaction de nos clients au cœur de notre métier."
            text="Les témoignages clients seront présentés ici."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-dashed border-[#D5DEE7] bg-[#F3F6F8] p-6">
                <div className="h-3 w-24 rounded bg-[#D5DEE7]" />
                <div className="mt-4 space-y-2">
                  <div className="h-2.5 w-full rounded bg-[#E4EBF1]" />
                  <div className="h-2.5 w-[85%] rounded bg-[#E4EBF1]" />
                  <div className="h-2.5 w-[70%] rounded bg-[#E4EBF1]" />
                </div>
                <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a9aab]">Emplacement avis {i}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <p className="mx-auto mt-6 max-w-xl text-center text-[13px] text-[#536273]">
          Structure prête à accueillir de véritables avis. Aucun faux témoignage n&apos;est affiché sur ce site de démonstration.
        </p>
      </Wrap>
    </section>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-[#F3F6F8] py-16 sm:py-24">
      <Wrap className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal>
          <SectionHead eyebrow="FAQ" title="Questions fréquentes" text="Des réponses claires avant de nous écrire." />
        </Reveal>
        <div className="divide-y divide-[#D5DEE7] overflow-hidden rounded-2xl border border-[#D5DEE7] bg-white">
          {azurFaq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[16px] font-bold text-[#002D72] sm:px-6"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {f.q}
                  <span className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E3F6FD] text-[#0077C2] transition ${isOpen ? "rotate-45" : ""}`}>
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <AnimateHeight open={isOpen}>
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-[#536273] sm:px-6">{f.a}</p>
                </AnimateHeight>
              </div>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}

function AnimateHeight({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
      {children}
    </motion.div>
  );
}

export function ContactCta() {
  return (
    <section className="bg-[#002D72] py-16 sm:py-24">
      <Wrap className="grid items-start gap-10 lg:grid-cols-[1fr_.95fr] lg:gap-14">
        <Reveal>
          <SectionHead
            light
            eyebrow="Contact"
            title="Besoin d'un plombier ? Parlons de votre projet."
            text="Décrivez votre besoin et transmettez-nous les informations nécessaires pour étudier votre demande."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <AzurButton href="/azur-plomberie/contact">Aller au formulaire</AzurButton>
            {azur.phone && (
              <AzurButton href={`tel:${azur.phone.replace(/\s/g, "")}`} variant="ghost">
                <AzurIcons.phone className="size-4" />
                {azur.phone}
              </AzurButton>
            )}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <QuoteForm />
        </Reveal>
      </Wrap>
    </section>
  );
}
