"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { capital, communes, expertises, faq, formatPrice, isSameCommune, type Property } from "@/data/capital";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { ContactForm } from "./Forms";
import { PropertyCard } from "./PropertyCard";
import { HeroSearch } from "./Search";
import { CapButton, DemoNotice, Eyebrow, ImageReveal, Reveal, SectionHead, serif, Wave, Wrap } from "./ui";

const b = capital.basePath;

/** Une photo dans une arche, avec son prix : un vrai bien du logiciel. */
function ArchLink({ p, className, sizes, preload }: { p: Property; className: string; sizes: string; preload?: boolean }) {
  return (
    <Link href={`${b}/biens/${p.slug}`} aria-label={`${p.title} à ${p.commune}`} className={`group relative block overflow-hidden rounded-t-full bg-[#F0E4CE] shadow-[0_30px_60px_-30px_rgba(11,58,76,.7)] ${className}`}>
      {p.images[0] && <Image src={p.images[0].src} alt={p.images[0].alt} fill preload={preload} sizes={sizes} className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]" />}
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0B3A4C] via-[#0B3A4C]/70 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 p-4 text-[#FBF7EE]">
        <span className={`${serif} block text-[1.25rem] leading-none sm:text-[1.5rem]`}>{formatPrice(p)}</span>
        <span className="mt-1 block truncate text-[13px] font-medium">{p.commune}</span>
      </span>
    </Link>
  );
}

export function Hero({ properties }: { properties: Property[] }) {
  const ref = useRef<HTMLElement>(null);
  const calm = useCalmMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sunY = useTransform(scrollYProgress, [0, 1], calm ? [0, 0] : [0, 220]);
  const sunScale = useTransform(scrollYProgress, [0, 1], calm ? [1, 1] : [1, 1.35]);
  const y1 = useTransform(scrollYProgress, [0, 1], calm ? [0, 0] : [0, -90]);
  const y2 = useTransform(scrollYProgress, [0, 1], calm ? [0, 0] : [0, -170]);
  const y3 = useTransform(scrollYProgress, [0, 1], calm ? [0, 0] : [0, -50]);
  // Trois beaux biens dans trois communes différentes.
  const seen = new Set<string>();
  const best = [...properties].filter((p) => p.images.length > 2 && p.transaction === "vente").sort((x, y) => (y.price ?? 0) - (x.price ?? 0)).filter((p) => !seen.has(p.commune) && Boolean(seen.add(p.commune))).slice(0, 3);
  const sales = properties.filter((p) => p.transaction === "vente").length;
  const rentals = properties.length - sales;

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#F5ECDA] pb-24 pt-8 sm:pb-28 sm:pt-10">
      <motion.span aria-hidden style={{ y: sunY, scale: sunScale }} className="cap-sun absolute -top-40 right-[6%] size-[34rem] rounded-full bg-[radial-gradient(circle,#F2BE5C_0%,#E9A93B_55%,#E9A93B00_72%)] sm:size-[46rem]" />
      <div className="relative flex flex-col lg:block">
      <Wrap className="max-lg:contents lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-14">
        <div className="order-1 px-5 pb-2 sm:px-8 lg:px-0">
          <p className="cap-rise flex flex-wrap items-center gap-x-3 text-[15px] font-semibold text-[#0E4F68]">Saint-Raphaël · Fréjus · Anthéor et environs</p>
          <h1 className={`${serif} cap-title mt-4 text-[3.1rem] leading-[1] text-[#0B3A4C] sm:text-[4.4rem] lg:text-[4.6rem]`} style={{ animationDelay: ".15s" }}>
            {capital.hero.title}
          </h1>
          <p className="cap-rise mt-6 max-w-xl text-[18px] leading-[1.65] text-[#1F2D33]/85" style={{ animationDelay: ".4s" }}>{capital.hero.sub}</p>
          {properties.length > 0 && (
            <ul className="cap-rise mt-7 flex flex-wrap gap-2" style={{ animationDelay: ".55s" }}>
              <li><Link href={`${b}/acheter`} className="inline-flex rounded-full bg-[#0E4F68] px-5 py-2.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5">{`${sales} biens à vendre`}</Link></li>
              <li><Link href={`${b}/louer`} className="inline-flex rounded-full border-2 border-[#0E4F68] px-5 py-2 text-[15px] font-semibold text-[#0E4F68] transition-transform hover:-translate-y-0.5">{`${rentals} biens à louer`}</Link></li>
            </ul>
          )}
        </div>
        {best.length === 3 && (
          <div aria-label="Biens à la une" className="relative order-3 mt-10 grid h-[22rem] grid-cols-3 items-end gap-2.5 px-5 sm:h-[27rem] sm:gap-4 sm:px-8 lg:mt-0 lg:px-0">
            <motion.div style={{ y: y1 }} className="cap-arch h-[78%]" ><ArchLink p={best[0]} className="h-full" sizes="(min-width:1024px) 50vw, 100vw" /></motion.div>
            <motion.div style={{ y: y2 }} className="cap-arch h-full" ><ArchLink p={best[2]} className="h-full" sizes="(min-width:1024px) 55vw, 100vw" preload /></motion.div>
            <motion.div style={{ y: y3 }} className="cap-arch h-[66%]" ><ArchLink p={best[1]} className="h-full" sizes="(min-width:1024px) 45vw, 100vw" /></motion.div>
          </div>
        )}
      </Wrap>
      <Wrap className="relative order-2 mt-6 cap-rise lg:mt-8">
        <HeroSearch properties={properties} />
      </Wrap>
      </div>
      <Wave className="absolute inset-x-0 bottom-0 text-[#FBF7EE]" />
    </section>
  );
}

/** Les derniers biens publiés, à faire glisser. */
export function Latest({ properties }: { properties: Property[] }) {
  const list = useRef<HTMLUListElement>(null);
  const items = properties.slice(0, 10);
  const move = (dir: 1 | -1) => {
    const el = list.current;
    if (!el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 800), behavior: calm ? "auto" : "smooth" });
  };
  const arrow = "grid size-12 place-items-center rounded-full border-2 border-[#0E4F68] text-xl text-[#0E4F68] transition-colors hover:bg-[#0E4F68] hover:text-white";
  return (
    <section className="py-16 sm:py-24">
      <Wrap className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow="Nouveautés" title="Des biens à visiter, des adresses à habiter." />
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => move(-1)} aria-label="Biens précédents" className={`${arrow} max-md:hidden`}>←</button>
          <button type="button" onClick={() => move(1)} aria-label="Biens suivants" className={`${arrow} max-md:hidden`}>→</button>
          <CapButton href={`${b}/biens`} variant="secondary">{`Voir les ${properties.length} biens`}</CapButton>
        </div>
      </Wrap>
      <Wrap><DemoNotice className="mt-6 max-w-3xl" /></Wrap>
      {items.length > 0 ? (
        <ul ref={list} tabIndex={0} aria-label="Derniers biens" className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-5 px-5 pb-4 [scrollbar-width:none] sm:scroll-pl-8 sm:px-8 lg:scroll-pl-[max(3.5rem,calc((100vw-1320px)/2+3.5rem))] lg:px-[max(3.5rem,calc((100vw-1320px)/2+3.5rem))]">
          {items.map((p) => <li key={p.ref} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[23rem]"><PropertyCard property={p} /></li>)}
        </ul>
      ) : (
        <Wrap><p className="mt-10 max-w-xl text-[17px] leading-relaxed text-[#1F2D33]/75">Aucun bien n&apos;est en ligne pour le moment. Contactez l&apos;agence pour lui parler de votre projet.</p></Wrap>
      )}
    </section>
  );
}

const MOODS = [
  { feature: "Vue mer", title: "Face à la mer", color: "#0E4F68" },
  { feature: "Piscine", title: "Avec piscine", color: "#2596B4" },
  { feature: "Jardin", title: "Avec jardin", color: "#6E7B3C" },
  { feature: "Terrasse", title: "Avec terrasse", color: "#B94F33" },
];

/** Chercher par envie plutôt que par critères. Le nombre et la photo viennent des biens du logiciel. */
export function Moods({ properties }: { properties: Property[] }) {
  // Une photo différente par envie.
  const used = new Set<string>();
  return (
    <section className="bg-[#0E4F68] pb-24 pt-20 text-[#FBF7EE] sm:pb-32 sm:pt-28">
      <Wrap>
        <SectionHead light eyebrow="Votre envie" title="Et si on commençait par ce qui compte ?" />
        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {MOODS.map((m, i) => {
            const list = properties.filter((p) => p.features.includes(m.feature));
            const photo = list.find((p) => p.images[0] && !used.has(p.ref))?.images[0];
            list.forEach((p) => { if (p.images[0]?.src === photo?.src) used.add(p.ref); });
            return (
              <li key={m.feature}>
                <ImageReveal delay={i * 0.08}>
                  <Link href={`${b}/biens?feature=${encodeURIComponent(m.feature)}`} className="group block">
                    <span className="relative block aspect-[3/4] overflow-hidden rounded-t-full" style={{ backgroundColor: m.color }}>
                      {photo && <Image src={photo.src} alt="" fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.07]" />}
                    </span>
                    <span className={`${serif} mt-4 flex items-baseline justify-between gap-2 text-[1.65rem] leading-none sm:text-[2.1rem]`}>
                      {m.title}
                      <span aria-hidden className="text-2xl transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    </span>
                    <span className="mt-1.5 block text-[15px] text-[#FBF7EE]/85">{`${list.length} ${list.length > 1 ? "biens" : "bien"}`}</span>
                  </Link>
                </ImageReveal>
              </li>
            );
          })}
        </ul>
      </Wrap>
    </section>
  );
}

function CommuneCard({ c, count }: { c: (typeof communes)[number]; count: number }) {
  return (
    <Link href={`${b}/secteurs/${c.slug}`} className="group block">
      <div className="relative aspect-[5/6] overflow-hidden rounded-t-full bg-[#F0E4CE]">
        <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]" />
      </div>
      <h3 className={`${serif} mt-4 text-[1.9rem] leading-none text-[#0B3A4C]`}>{c.name}</h3>
      <p className="mt-1.5 text-[15px] font-semibold text-[#B94F33]">{`${count} ${count > 1 ? "biens" : "bien"}`}</p>
    </Link>
  );
}

const territoryHead = <SectionHead eyebrow="Territoire" title="De la mer aux villages perchés." text="Du littoral de l'Estérel aux villages du pays de Fayence, retrouvez les secteurs cités par l'agence." />;

function TerritoryPinned({ counts }: { counts: number[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const measure = () => setDistance(Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  return (
    <div ref={ref} className="relative hidden h-[280svh] lg:block">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <Wrap>{territoryHead}</Wrap>
        <motion.ul ref={track} style={{ x }} className="mt-8 flex w-max gap-8 px-14">
          {communes.map((c, i) => <li key={c.slug} className="w-[min(25vw,38svh)] shrink-0"><CommuneCard c={c} count={counts[i]} /></li>)}
        </motion.ul>
      </div>
    </div>
  );
}

export function Territory({ properties }: { properties: Property[] }) {
  const calm = useCalmMotion();
  const counts = communes.map((c) => properties.filter((p) => isSameCommune(p.commune, c.name)).length);
  const list = (
    <div className={calm ? "py-20" : "py-20 lg:hidden"}>
      <Wrap>{territoryHead}</Wrap>
      <ul className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-5 px-5 pb-3 [scrollbar-width:none] sm:scroll-pl-8 sm:px-8">
        {communes.map((c, i) => <li key={c.slug} className="w-[72vw] shrink-0 snap-start sm:w-[42vw] lg:w-[24rem]"><CommuneCard c={c} count={counts[i]} /></li>)}
      </ul>
    </div>
  );
  return <section className="bg-[#FBF7EE]">{calm ? list : <><TerritoryPinned counts={counts} />{list}</>}</section>;
}

/** Les communes défilent, comme la route le long de la côte. */
export function CommuneBand() {
  const row = [...communes.map((c) => c.name), ...communes.map((c) => c.name)];
  return (
    <div aria-hidden className="overflow-hidden bg-[#E9A93B] py-4">
      <div className="cap-marquee flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((n, i) => (
              <span key={`${n}-${i}`} className={`${serif} flex items-center gap-8 pr-8 text-[1.9rem] text-[#0B3A4C] sm:text-[2.5rem]`}>
                {n}
                <span className="size-2.5 rounded-full bg-[#B94F33]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const SERVICES = [
  { title: "Vendre votre bien", text: "Un interlocuteur, de l'estimation à la signature.", href: `${b}/vendre`, image: "villa-pool", bg: "#B94F33" },
  { title: "Estimer sa valeur", text: "Décrivez votre bien en quelques lignes : l'agence vous recontacte.", href: `${b}/estimation`, image: "roof-house", bg: "#6E7B3C" },
  { title: "Faire gérer", text: "La gestion locative de votre bien, et le syndic de votre copropriété.", href: `${b}/gestion-immobiliere`, image: "kitchen-open", bg: "#0E4F68" },
];

export function Owners() {
  return (
    <section className="py-20 sm:py-28">
      <Wrap>
        <SectionHead eyebrow="Propriétaires" title="Votre bien mérite qu'on s'en occupe." />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <Link href={s.href} className="group block h-full overflow-hidden rounded-[2rem] text-white transition-transform duration-500 hover:-translate-y-1.5" style={{ backgroundColor: s.bg }}>
                  <span className="relative block aspect-[16/11] overflow-hidden">
                    <Image src={`/capital-immobilier/${s.image}.webp`} alt="" fill sizes="(min-width:768px) 32vw, 92vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]" />
                  </span>
                  <span className="block p-6">
                    <span className={`${serif} flex items-baseline justify-between gap-2 text-[2rem] leading-none`}>{s.title}<span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span></span>
                    <span className="mt-3 block text-[16px] leading-relaxed text-white/95">{s.text}</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

const EXPERTISE_PHOTOS = ["villa-night", "room-bright", "kitchen-blue", "white-balcony", "balcony-hills", "living-oak"].map((n) => `/capital-immobilier/${n}.webp`);

export function Expertise() {
  const [hover, setHover] = useState(0);
  return (
    <section className="bg-[#F5ECDA] py-20 sm:py-28">
      <Wrap className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead eyebrow="Nos expertises" title="Un interlocuteur, tous les métiers de l'immobilier." />
          <div aria-hidden className="relative mt-8 hidden aspect-[5/4] overflow-hidden rounded-t-full lg:block">
            {EXPERTISE_PHOTOS.map((src, i) => <Image key={src} src={src} alt="" fill sizes="480px" className={`object-cover transition-all duration-700 ${hover === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />)}
          </div>
        </div>
        <ol className="border-t-2 border-[#0E4F68]/25">
          {expertises.map((e, i) => (
            <li key={e.title} className="border-b-2 border-[#0E4F68]/25" onPointerEnter={() => setHover(i)}>
              <Link href={e.href} onFocus={() => setHover(i)} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-3 py-6 transition-all duration-300 hover:pl-3 sm:grid-cols-[4rem_1fr_auto]">
                <span className={`${serif} text-[1.5rem] text-[#B94F33]`}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className={`${serif} block text-[1.8rem] leading-tight text-[#0B3A4C] sm:text-[2.2rem]`}>{e.title}</span>
                  <span className="mt-1.5 block max-w-lg text-[16px] leading-relaxed text-[#1F2D33]/80">{e.text}</span>
                </span>
                <span aria-hidden className="text-xl text-[#B94F33] transition-transform duration-300 group-hover:translate-x-2">→</span>
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
    <section className="py-20 sm:py-28">
      <Wrap className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <ImageReveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-[#F0E4CE]">
            <Image src="/capital-immobilier/agence.webp" alt="Salon baigné de soleil devant un rideau de lin (photographie d'illustration)" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </ImageReveal>
        <div>
          <SectionHead eyebrow="L'agence" title="La proximité d'une agence installée à Saint-Raphaël." />
          <Reveal delay={0.1} className="mt-6 space-y-5 text-[17px] leading-[1.8] text-[#1F2D33]/82">
            <p>CAPITAL IMMOBILIER vous reçoit au {capital.address.street}, à Saint-Raphaël. Vendre, acheter, louer ou confier la gestion de votre bien : vous échangez avec une agence locale qui connaît ses secteurs.</p>
            <p>Son expertise couvre aussi la gestion de petites et moyennes copropriétés, des ASL et ASA, et le démarrage de copropriétés neuves.</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8"><CapButton href={`${b}/agence`} variant="secondary">Découvrir l&apos;agence</CapButton></Reveal>
        </div>
      </Wrap>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="border-t-2 border-[#F0E4CE] py-20 sm:py-28">
      <Wrap className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHead eyebrow="Questions fréquentes" title="L'essentiel en quelques réponses." />
        <div className="divide-y-2 divide-[#0E4F68]/15 border-y-2 border-[#0E4F68]/15">
          {faq.map((f) => (
            <details key={f.q} className="cap-faq group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17.5px] font-semibold text-[#0B3A4C] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-[#F0E4CE] text-xl text-[#0E4F68] transition-all duration-300 group-open:rotate-45 group-open:bg-[#B94F33] group-open:text-white">+</span>
              </summary>
              <p className="mt-3 max-w-2xl pr-12 text-[16px] leading-[1.75] text-[#1F2D33]/80">{f.a}</p>
            </details>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function ContactBlock({ id = "contact" }: { id?: string }) {
  return (
    <section id={id} className="relative bg-[#0E4F68] pb-20 pt-24 text-[#FBF7EE] sm:pb-28 sm:pt-32">
      <Wave className="absolute inset-x-0 top-0 rotate-180 text-[#FBF7EE]" />
      <Wrap className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <Eyebrow light>Contact</Eyebrow>
          <h2 className={`${serif} mt-5 text-[2.9rem] leading-[1.02] sm:text-[4.2rem]`}>Parlons de votre projet.</h2>
          <p className="mt-5 text-[17px] leading-[1.7] text-[#FBF7EE]/90">Un appel, un e-mail ou un message : choisissez ce qui vous convient.</p>
          <dl className="mt-9 space-y-5 text-[17px]">
            <div><dt className="text-[14px] font-semibold text-[#E9A93B]">Téléphone</dt><dd className="mt-0.5"><a href={`tel:${capital.phoneHref}`} className={`${serif} text-[2.1rem] underline-offset-4 hover:underline`}>{capital.phone}</a></dd></div>
            <div><dt className="text-[14px] font-semibold text-[#E9A93B]">Adresse</dt><dd className="mt-0.5">{capital.address.street}, {capital.address.postalCode} {capital.address.city}</dd></div>
            <div><dt className="text-[14px] font-semibold text-[#E9A93B]">E-mail</dt><dd className="mt-0.5"><a href={`mailto:${capital.email}`} className="break-all underline underline-offset-4">{capital.email}</a></dd></div>
          </dl>
        </div>
        <Reveal delay={0.1} className="rounded-[2rem] bg-[#FBF7EE] p-6 text-[#1F2D33] sm:p-10">
          <ContactForm idPrefix="home" />
        </Reveal>
      </Wrap>
    </section>
  );
}
