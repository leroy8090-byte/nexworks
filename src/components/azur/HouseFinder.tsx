"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { azur, fixtures, getAzurService, quoteHref } from "@/data/azur";
import { cn, ease } from "@/lib/utils";
import { Arrow, btnCls, Check, Sign, Wrap } from "./ui";

const INK = "#0a1647";
const TILE = "#f8f6ef";

/** Tous les tuyaux de la maison, sous le trajet de l'eau mis en évidence. */
const NETWORK = "M60 650H700M540 650V205H150M540 345H322M540 384H310M540 545H210";

function House({ active }: { active: string }) {
  const f = fixtures.find((x) => x.key === active) ?? fixtures[0];
  return (
    <svg viewBox="0 0 960 720" role="img" aria-label="Maison en coupe, avec sa salle de bain, sa cuisine et son local technique" className="block h-auto w-full">
      {/* Toit et murs */}
      <path d="M480 22 910 170H50Z" fill="#1538b5" />
      <path d="M480 40 860 170H100Z" fill="none" stroke="#fff" strokeWidth="3" opacity=".5" />
      <rect x="90" y="170" width="780" height="400" fill="#fffdf8" stroke={INK} strokeWidth="5" />
      {/* Salle de bain : la faïence */}
      <rect x="92" y="172" width="426" height="198" fill="#e9f3f8" />
      <g stroke="#cfe1ea" strokeWidth="2">
        {[210, 250, 290, 330].map((y) => <path key={y} d={`M92 ${y}H518`} />)}
        {[135, 180, 225, 270, 315, 360, 405, 450, 495].map((x) => <path key={x} d={`M${x} 172V370`} />)}
      </g>
      {/* Chambre et salon */}
      <rect x="522" y="172" width="346" height="198" fill="#fbf1de" />
      <rect x="522" y="374" width="346" height="194" fill="#eaf0e1" />
      {/* Cuisine */}
      <rect x="92" y="374" width="426" height="194" fill="#fdf7ec" />
      {/* Local technique */}
      <rect x="90" y="570" width="780" height="135" fill="#dcd8cb" stroke={INK} strokeWidth="5" />
      <path d="M0 705h960" stroke={INK} strokeWidth="5" />
      <path d="M0 570h90M870 570h90" stroke={INK} strokeWidth="5" />
      <path d="M92 372h776" stroke={INK} strokeWidth="9" />
      <path d="M520 172v130M520 345v227" stroke={INK} strokeWidth="5" />

      {/* Fenêtres et meubles */}
      <g stroke={INK} strokeWidth="4" fill="none">
        <rect x="650" y="205" width="90" height="78" fill="#bfe6f5" /><path d="M695 205v78M650 244h90" />
        <path d="M570 372v-50h240v50" fill="#d6dce9" /><rect x="580" y="298" width="70" height="26" rx="6" fill="#fff" /><path d="M570 322v-44" />
        <path d="M610 568v-44a14 14 0 0 1 14-14h150a14 14 0 0 1 14 14v44" fill="#7f97e0" /><path d="M590 568v-32a14 14 0 0 1 14 14M808 568v-32a14 14 0 0 0-14 14" />
        <rect x="660" y="402" width="90" height="62" fill="#bfe6f5" /><path d="M705 402v62" />
      </g>

      {/* Les tuyaux */}
      <path d={NETWORK} fill="none" stroke="#7d421d" strokeWidth="10" strokeLinejoin="round" />
      <path d={NETWORK} fill="none" stroke="#c2703a" strokeWidth="6" strokeLinejoin="round" />

      {/* Douche */}
      <g stroke={INK} strokeWidth="4" fill="none">
        <path d="M150 205v22" />
        <path d="M122 240a28 13 0 0 1 56 0Z" fill="#dfe5ee" />
        <path d="M135 252v12M150 252v18M165 252v12" stroke="#2c9dc2" strokeLinecap="round" />
        <path d="M102 370v-12h110v12" fill="#fff" /><path d="M212 358V198" opacity=".5" />
      </g>
      {/* Lavabo et miroir */}
      <g stroke={INK} strokeWidth="4" fill="none">
        <rect x="282" y="212" width="80" height="62" rx="30" fill="#fff" />
        <path d="M274 302h96a8 8 0 0 1 8 8 30 30 0 0 1-30 30h-52a30 30 0 0 1-30-30 8 8 0 0 1 8-8Z" fill="#fff" />
        <path d="M322 302v-16h20" /><path d="M322 340v30" />
      </g>
      {/* WC */}
      <g stroke={INK} strokeWidth="4" fill="#fff">
        <rect x="468" y="268" width="40" height="64" rx="6" />
        <path d="M424 322h48v22c0 14-10 26-24 26h-8a16 16 0 0 1-16-16Z" />
      </g>
      {/* Tache au plafond de la cuisine */}
      <g>
        <path d="M268 376c6 18 24 12 34 20 10 8 28 6 34-2s18-6 22-18Z" fill="#b08a50" opacity=".55" />
        <path d="M310 402c4 6 6 9 6 12a6 6 0 0 1-12 0c0-3 2-6 6-12Z" fill="#4cc9ec" stroke={INK} strokeWidth="2" />
      </g>
      {/* Cuisine */}
      <g stroke={INK} strokeWidth="4" fill="none">
        <rect x="112" y="494" width="360" height="74" fill="#1538b5" />
        <path d="M172 494v74M232 494v74M292 494v74M352 494v74M412 494v74" stroke="#fff" opacity=".6" />
        <rect x="102" y="484" width="380" height="12" fill="#fff" />
        <path d="M210 484v-34h26v12" />
        <rect x="170" y="481" width="80" height="6" fill="#dfe5ee" />
      </g>
      {/* Chauffe-eau */}
      <g stroke={INK} strokeWidth="4">
        <rect x="690" y="590" width="74" height="104" rx="24" fill="#fff" />
        <path d="M690 632h74" fill="none" />
        <circle cx="727" cy="660" r="9" fill="#d6322a" />
      </g>
      {/* Compteur et vanne */}
      <g stroke={INK} strokeWidth="4">
        <circle cx="160" cy="650" r="20" fill="#fff" />
        <path d="M160 638v12l8 5" fill="none" />
        <rect x="238" y="636" width="24" height="28" rx="3" fill="#f2bd3e" />
        <rect x="222" y="620" width="56" height="10" rx="5" fill="#d6322a" />
      </g>

      {/* L'eau qui va vers ce que vous avez choisi */}
      <path key={f.key} d={f.pipe} pathLength={undefined} fill="none" stroke="#4cc9ec" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="az-flow" />
    </svg>
  );
}

/** Le diagnostic : on clique sur ce qui ne va pas, le site dit quoi faire tout de suite. */
export function HouseFinder() {
  const [active, setActive] = useState("plafond");
  const f = fixtures.find((x) => x.key === active) ?? fixtures[0];
  const service = getAzurService(f.service);
  const prestation = service?.prestation;

  return (
    <section id="probleme" className="az-tiles scroll-mt-16 bg-az-tile py-20 sm:py-28">
      <Wrap>
        <Sign>Où est le problème ?</Sign>
        <h2 className="mt-4 max-w-4xl text-[clamp(2.7rem,6.5vw,5.8rem)]">Touchez ce qui ne va pas.</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-az-ink/80">Choisissez un endroit de la maison. On vous dit ce que ça peut être, et quoi faire tout de suite.</p>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div>
            <div className="relative overflow-hidden rounded-2xl border-2 border-az-ink bg-[#d9f1f9]">
              <House active={active} />
              {fixtures.map((x) => {
                const on = x.key === active;
                return (
                  <button
                    key={x.key}
                    type="button"
                    onClick={() => setActive(x.key)}
                    aria-pressed={on}
                    aria-label={x.label}
                    style={{ left: `${(x.x / 960) * 100}%`, top: `${(x.y / 720) * 100}%` }}
                    className="absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                  >
                    {!on && <span aria-hidden className="az-ping absolute inset-1.5 rounded-full bg-az-hot/50" />}
                    <span aria-hidden className={cn("relative block rounded-full border-[3px] border-white shadow-md transition-all", on ? "size-6 bg-az-brass" : "size-[18px] bg-az-hot")} />
                  </button>
                );
              })}
            </div>
            <div role="group" aria-label="Choisir un endroit de la maison" className="mt-4 flex flex-wrap gap-2">
              {fixtures.map((x) => (
                <button key={x.key} type="button" aria-pressed={x.key === active} onClick={() => setActive(x.key)} className={cn("min-h-11 rounded-lg border-2 px-3.5 py-2 text-[15px] font-bold transition-colors", x.key === active ? "border-az-ink bg-az-ink text-white" : "border-az-ink/25 bg-white hover:border-az-ink")}>
                  {x.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={f.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease }} className="overflow-hidden rounded-2xl border-2 border-az-ink bg-white">
                <div className="p-6 sm:p-8">
                  <h3 className="text-[2.7rem]">{f.title}</h3>
                  <p className="mt-5 text-base font-bold">Ce que vous remarquez peut-être</p>
                  <ul className="mt-2 space-y-2 text-[17px]">
                    {f.symptoms.map((s) => (
                      <li key={s} className="flex gap-2.5"><Check className="mt-1 text-az-cobalt" />{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-az-hot-deep p-6 text-white sm:px-8">
                  <p className="text-base font-bold">Le bon réflexe</p>
                  <p className="mt-1 text-[17px] leading-relaxed">{f.reflex}</p>
                </div>
                <div className="flex flex-col gap-3 p-6 sm:p-8">
                  <Link href={quoteHref(prestation, f.urgent)} className={btnCls("cobalt", "w-full")}>Décrire ce problème<Arrow /></Link>
                  {service && (
                    <Link href={service.href ?? `${azur.basePath}/services/${service.slug}`} className="text-center text-base font-bold underline underline-offset-4">
                      {`En savoir plus : ${service.title}`}
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
