"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { Btn, Wrap } from "./ui";

/** Un tuyau de cuivre : plusieurs traits superposés donnent le volume. */
export function CopperPipe({ d, delay = 0, width = 22 }: { d: string; delay?: number; width?: number }) {
  const style = { animationDelay: `${delay}s` };
  const common = { d, fill: "none", pathLength: 1, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "az-draw", style };
  return (
    <>
      <path {...common} stroke="#7d421d" strokeWidth={width} />
      <path {...common} stroke="#c2703a" strokeWidth={width - 5} />
      <path {...common} stroke="#eaa878" strokeWidth={Math.max(2, width / 5)} transform="translate(-3 -3)" opacity=".85" />
    </>
  );
}

const Collar = ({ x, y, vertical }: { x: number; y: number; vertical?: boolean }) => (
  <g>
    <rect x={vertical ? x - 17 : x - 6} y={vertical ? y - 6 : y - 17} width={vertical ? 34 : 12} height={vertical ? 12 : 34} rx="3" fill="#8c4a21" />
    <rect x={vertical ? x - 17 : x - 6} y={vertical ? y - 6 : y - 17} width={vertical ? 34 : 4} height={vertical ? 4 : 34} rx="2" fill="#e0955f" />
  </g>
);

/** La tuyauterie et le robinet qui goutte, côté droit du hero. */
function Plumbing() {
  return (
    <svg viewBox="0 0 620 760" aria-hidden className="h-full w-full">
      <CopperPipe d="M640 90H420a60 60 0 0 0-60 60V330" />
      <CopperPipe d="M640 230H520a40 40 0 0 0-40 40V640" delay={0.25} width={16} />
      <Collar x={520} y={90} />
      <Collar x={360} y={230} vertical />
      <Collar x={480} y={430} vertical />
      {/* Le robinet */}
      <g className="az-rise" style={{ animationDelay: ".9s" }}>
        <rect x="338" y="326" width="44" height="26" rx="5" fill="#dfe5ee" />
        <rect x="338" y="326" width="44" height="7" rx="3" fill="#fff" />
        <path d="M382 352v18a10 10 0 0 1-10 10H242a34 34 0 0 0-34 34v26h44v-14a10 10 0 0 1 10-10h100a34 34 0 0 0 34-34v-30Z" transform="translate(-14 0)" fill="#cfd7e3" />
        <path d="M368 356v14a10 10 0 0 1-10 10H228a34 34 0 0 0-34 34v26h12v-22a28 28 0 0 1 28-28h126a14 14 0 0 0 8-34Z" fill="#f4f7fb" />
        <rect x="190" y="432" width="48" height="12" rx="3" fill="#aab4c4" />
        {/* La poignée, repère rouge de l'eau chaude */}
        <rect x="352" y="286" width="16" height="44" fill="#cfd7e3" />
        <rect x="298" y="272" width="124" height="18" rx="9" fill="#f4f7fb" />
        <circle cx="360" cy="281" r="15" fill="#d6322a" stroke="#fff" strokeWidth="4" />
      </g>
      {/* La goutte */}
      <path className="az-drip" style={{ ["--drip" as string]: "170px" }} d="M214 448c6 9 10 14 10 19a10 10 0 0 1-20 0c0-5 4-10 10-19Z" fill="#4cc9ec" />
    </svg>
  );
}

const waves = `M0 30${"c60 0 90-22 150-22s90 22 150 22".repeat(6)}V80H0Z`;

/**
 * Le hero. En descendant, l'eau monte jusqu'à remplir l'écran, et le message change :
 * la page raconte ce qui arrive vraiment, puis vous conduit au diagnostic.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const calm = useCalmMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const level = useTransform(scrollYProgress, [0.05, 0.8], ["104%", "-6%"]);
  const textOut = useTransform(scrollYProgress, [0.25, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -70]);
  const nextIn = useTransform(scrollYProgress, [0.58, 0.8], [0, 1]);
  const nextY = useTransform(scrollYProgress, [0.58, 0.8], [40, 0]);
  const [flooded, setFlooded] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => setFlooded(v > 0.45));

  const copy = (
    <>
      <h1 className="az-rise max-w-[11ch] text-[clamp(3.5rem,10vw,8.8rem)] leading-[0.92]">
        Ça fuit ?<br />
        <em className="not-italic text-az-brass">On s&apos;en occupe.</em>
      </h1>
      <p className="az-rise mt-6 max-w-lg text-lg leading-relaxed text-white/90 sm:text-xl" style={{ animationDelay: ".12s" }}>
        Azur Plomberie, votre artisan plombier à Saint-Raphaël : dépannage, fuites, chauffe-eau et salle de bain.
      </p>
      <div className="az-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: ".22s" }}>
        <Btn href="/azur-plomberie/contact?urgence=1" variant="hot" arrow>C&apos;est urgent</Btn>
        <Btn href="/azur-plomberie/contact" variant="white" arrow>J&apos;ai un projet</Btn>
      </div>
    </>
  );

  if (calm) {
    return (
      <section className="az-tiles az-tiles-dark relative overflow-hidden bg-az-cobalt pb-24 pt-36 text-white">
        <div className="absolute right-0 top-0 hidden h-[62%] w-[42%] lg:block"><Plumbing /></div>
        <Wrap className="relative">{copy}</Wrap>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[230svh]">
      <div className="az-tiles az-tiles-dark sticky top-0 h-svh overflow-hidden bg-az-cobalt text-white">
        <div className="absolute -right-16 top-0 h-[38%] w-[72%] sm:h-[58%] sm:w-[50%] lg:right-0 lg:w-[44%]"><Plumbing /></div>

        <motion.div style={{ opacity: textOut, y: textY }} className={flooded ? "pointer-events-none absolute inset-0" : "absolute inset-0"}>
          <Wrap className="flex h-full flex-col justify-end pb-[max(6.5rem,12svh)] pt-28 sm:pb-[12svh]">{copy}</Wrap>
        </motion.div>

        {/* L'eau qui monte */}
        <motion.div aria-hidden style={{ y: level }} className="absolute inset-x-0 top-0 h-[112%]">
          <svg viewBox="0 0 1800 80" preserveAspectRatio="none" className="az-wave az-wave-slow absolute -top-[46px] left-0 h-12 w-[200%] fill-[#84dbf3]"><path d={waves} /></svg>
          <svg viewBox="0 0 1800 80" preserveAspectRatio="none" className="az-wave absolute -top-[30px] left-0 h-8 w-[200%] fill-az-water"><path d={waves} /></svg>
          <div className="h-full bg-gradient-to-b from-az-water to-[#7fdcf4]" />
        </motion.div>

        <motion.div style={{ opacity: nextIn, y: nextY }} className={flooded ? "absolute inset-0 flex items-center text-az-ink" : "pointer-events-none absolute inset-0 flex items-center text-az-ink"}>
          <Wrap>
            <p className="az-display max-w-5xl text-[clamp(3rem,8.5vw,7.5rem)] leading-[0.98]">Pas de panique. Montrez-nous où ça se passe.</p>
            <a href="#probleme" className="mt-8 inline-flex items-center gap-3 text-xl font-bold underline underline-offset-8">
              Voir la maison
              <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-6"><path d="M10 3v13M4.5 11 10 16.5 15.5 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </Wrap>
        </motion.div>
      </div>
    </section>
  );
}
