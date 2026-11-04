"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { capital, communes, expertises, faq, properties } from "@/data/capital";
import { ContactForm } from "./Forms";
import { PropertyCard } from "./PropertyCard";
import { HeroSearch } from "./Search";
import { CapButton, DemoNotice, Eyebrow, Reveal, SectionHead, serif, Wrap } from "./ui";

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
        };
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#183B50]">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={capital.hero.image} alt="Piscine face à la Méditerranée, pins parasols et mer bleue : l'art de vivre du littoral varois (photographie d'illustration)" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#183B50]/55 via-[#183B50]/25 to-[#183B50]/80" />
      <Wrap className="relative pb-10 pt-44 sm:pb-14">
        <motion.p {...fade(0.4)} className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#E8E0D4]">
          <span aria-hidden className="h-px w-8 bg-[#E8E0D4]/70" />
          Saint-Raphaël · Fréjus · Anthéor et environs
        </motion.p>
        <motion.h1 {...fade(0.6)} className={`${serif} mt-6 max-w-4xl text-[3.1rem] font-normal leading-[1.02] tracking-[-0.02em] text-[#F8F7F3] sm:text-[5.2rem] lg:text-[5.6rem]`}>
          {capital.hero.title}
        </motion.h1>
        <motion.p {...fade(0.85)} className="mt-7 max-w-xl text-[17.5px] leading-[1.75] text-[#F8F7F3]/90">
          {capital.hero.sub}
        </motion.p>
        <motion.div {...fade(1.05)} className="mt-9 flex flex-col gap-3.5 sm:flex-row">
          <CapButton href={`${capital.basePath}/biens`} variant="sand">
            Découvrir nos biens
          </CapButton>
          <CapButton href={`${capital.basePath}/vendre`} variant="light">
            Confier mon projet
          </CapButton>
        </motion.div>
        <motion.div {...fade(1.3)} className="mt-12">
          <HeroSearch />
          <p className="mt-3 text-[12px] text-[#F8F7F3]/75">Recherche sur un jeu de biens de démonstration.</p>
        </motion.div>
      </Wrap>
    </section>
  );
}

export function Featured() {
  const featured = [properties[0], properties[1], properties[3], properties[2]];
  return (
    <section className="py-24 sm:py-32">
      <Wrap>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead eyebrow="Sélection" title="Des biens à visiter, des adresses à habiter." />
          <Reveal>
            <CapButton href={`${capital.basePath}/biens`} variant="secondary">
              Voir tous les biens
            </CapButton>
          </Reveal>
        </div>
        <DemoNotice className="mt-8 max-w-3xl" />
        <div className="mt-14 grid gap-x-10 gap-y-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <PropertyCard property={featured[0]} tall />
          </Reveal>
          <div className="grid content-start gap-16 lg:col-span-5 lg:pt-24">
            <Reveal delay={0.1}>
              <PropertyCard property={featured[1]} />
            </Reveal>
            <Reveal delay={0.15}>
              <PropertyCard property={featured[2]} />
            </Reveal>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

export function Expertise() {
  return (
    <section className="bg-[#E8E0D4]/55 py-24 sm:py-32">
      <Wrap className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <SectionHead
            eyebrow="Nos expertises"
            title="Un interlocuteur, tous les métiers de l'immobilier."
            text="Transaction, location, gestion et syndic : les services présentés ici sont ceux que l'agence indique sur son site public."
          />
        </div>
        <ol className="border-t border-[#183B50]/20">
          {expertises.map((e, i) => (
            <li key={e.title} className="border-b border-[#183B50]/20">
              <Link href={e.href} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-7 transition-colors hover:text-[#183B50] sm:grid-cols-[4rem_1fr_auto]">
                <span className={`${serif} text-[1.4rem] text-[#183B50]/50`}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className={`${serif} block text-[1.7rem] leading-tight text-[#252A2D] sm:text-[2rem]`}>{e.title}</span>
                  <span className="mt-2 block max-w-lg text-[15px] leading-relaxed text-[#252A2D]/65">{e.text}</span>
                </span>
                <span aria-hidden className="text-xl text-[#183B50] transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}

export function AgencyTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <Wrap className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative aspect-[4/5] overflow-hidden bg-[#E8E0D4]">
          <Image src="/capital-immobilier/agence.webp" alt="Salon baigné de soleil devant un rideau de lin, évoquant un intérieur chaleureux (photographie d'illustration)" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
        </Reveal>
        <div>
          <SectionHead eyebrow="L'agence" title="La proximité d'une agence installée à Saint-Raphaël." />
          <Reveal delay={0.1} className="mt-6 space-y-5 text-[16.5px] leading-[1.85] text-[#252A2D]/72">
            <p>
              CAPITAL IMMOBILIER vous reçoit au {capital.address.street}, à Saint-Raphaël. Vendre, acheter, louer ou confier la gestion de votre bien : vous échangez avec une agence locale qui connaît ses secteurs.
            </p>
            <p>Son expertise couvre aussi la gestion de petites et moyennes copropriétés, des ASL et ASA, et le démarrage de copropriétés neuves.</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-9">
            <CapButton href={`${capital.basePath}/agence`} variant="secondary">
              Découvrir l&apos;agence
            </CapButton>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}

export function EstimationBand() {
  return (
    <section className="relative overflow-hidden bg-[#183B50] text-[#F8F7F3]">
      <Wrap className="grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Eyebrow light>Propriétaires</Eyebrow>
          <Reveal>
            <h2 className={`${serif} mt-6 text-[2.5rem] font-normal leading-[1.06] sm:text-[3.6rem]`}>Quelle est la valeur de votre bien ?</h2>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.8] text-[#F8F7F3]/78">
              Décrivez votre bien en quelques lignes : l&apos;agence reprend ensuite contact avec vous pour en parler. Aucun chiffre n&apos;est promis à l&apos;avance : une estimation sérieuse passe par l&apos;étude du bien et de son marché.
            </p>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
              <CapButton href={`${capital.basePath}/estimation`} variant="sand">
                Demander une estimation
              </CapButton>
              <CapButton href={`${capital.basePath}/vendre`} variant="light">
                Comment vendre avec nous
              </CapButton>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="relative aspect-[5/4] overflow-hidden">
          <Image src="/capital-immobilier/estimation.webp" alt="Villa contemporaine blanche et bois face à sa piscine (photographie d'illustration)" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
        </Reveal>
      </Wrap>
    </section>
  );
}

export function Territory() {
  return (
    <section className="py-24 sm:py-32">
      <Wrap>
        <SectionHead
          eyebrow="Territoire"
          title="Saint-Raphaël et les communes alentour."
          text="Du littoral de l'Estérel aux villages du pays de Fayence, retrouvez les secteurs cités par l'agence."
        />
        <ul className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {communes.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={(i % 3) * 0.08}>
                <Link href={`${capital.basePath}/secteurs/${c.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E0D4]">
                    <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h3 className={`${serif} text-[1.7rem] text-[#252A2D]`}>{c.name}</h3>
                    <span aria-hidden className="text-[#183B50] transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </div>
                  <p className="mt-1 text-[14.5px] text-[#252A2D]/65">{c.tagline}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="border-t border-[#E8E0D4] py-24 sm:py-28">
      <Wrap className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <SectionHead eyebrow="Questions fréquentes" title="L'essentiel en quelques réponses." />
        <div className="divide-y divide-[#183B50]/15 border-y border-[#183B50]/15">
          {faq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-semibold text-[#252A2D] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="text-2xl font-light text-[#183B50] transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[15.5px] leading-[1.8] text-[#252A2D]/70">{f.a}</p>
            </details>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function ContactBlock({ id = "contact" }: { id?: string }) {
  return (
    <section id={id} className="bg-[#E8E0D4]/55 py-24 sm:py-32">
      <Wrap className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div>
          <SectionHead eyebrow="Contact" title="Parlons de votre projet." text="Un appel, un e-mail ou un message : choisissez ce qui vous convient." />
          <Reveal delay={0.1}>
            <dl className="mt-10 space-y-6 text-[16px]">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#183B50]/70">Téléphone</dt>
                <dd className="mt-1">
                  <a href={`tel:${capital.phoneHref}`} className={`${serif} text-[2rem] text-[#183B50] underline-offset-4 hover:underline`}>
                    {capital.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#183B50]/70">Adresse</dt>
                <dd className="mt-1">
                  {capital.address.street}, {capital.address.postalCode} {capital.address.city}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#183B50]/70">E-mail</dt>
                <dd className="mt-1">
                  <a href={`mailto:${capital.email}`} className="break-all underline underline-offset-4">
                    {capital.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="bg-white p-7 shadow-[0_30px_70px_-45px_rgba(24,59,80,.4)] sm:p-10">
          <ContactForm idPrefix="home" />
        </Reveal>
      </Wrap>
    </section>
  );
}
