"use client";

import { animate, motion, useMotionValueEvent, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories, formatEuro, orea, quote, vehicles, type CategoryKey } from "@/data/orea";
import { cn } from "@/lib/utils";
import { Arrow, btnCls, Sign, Wrap } from "./ui";

const MAX = 2500;
const R = 150, CX = 200, CY = 195;
const polar = (deg: number, r = R) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
};
const arc = (from: number, to: number) => {
  const [x1, y1] = polar(from), [x2, y2] = polar(to);
  return `M${x1} ${y1} A${R} ${R} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
};

function Counter({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) { from.current = value; setShown(value); return; }
    const c = animate(from.current, value, { duration: 0.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => { from.current = v; setShown(Math.round(v)); } });
    return () => c.stop();
  }, [value, reduce]);
  return <>{formatEuro(shown)}</>;
}

/** Le compteur de vitesse : l'aiguille et le prix réagissent à la voiture et à la durée. */
export function PriceGauge() {
  const [category, setCategory] = useState<CategoryKey>("compacte");
  const [slug, setSlug] = useState("volkswagen-golf");
  const models = vehicles.filter((x) => x.category === category);
  const [days, setDays] = useState(5);
  const [cover, setCover] = useState(false);
  const v = vehicles.find((x) => x.slug === slug) ?? vehicles[0];
  const q = quote(v.pricePerDay, days, cover ? 15 : 0);
  const ratio = Math.min(1, q.total / MAX);
  const spring = useSpring(ratio, { stiffness: 90, damping: 14 });
  useEffect(() => spring.set(ratio), [ratio, spring]);
  // Rotation appliquée directement sur le dessin : fiable dans tous les navigateurs.
  const needle = useRef<SVGGElement>(null);
  const aim = (r: number) => needle.current?.setAttribute("transform", `rotate(${-120 + r * 240} ${CX} ${CY})`);
  useEffect(() => aim(spring.get()), [spring]);
  useMotionValueEvent(spring, "change", aim);
  const reserve = `${orea.basePath}/vehicules/${v.slug}`;

  return (
    <section className="bg-or-ink py-20 text-white sm:py-28">
      <Wrap className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Sign>Sans surprise</Sign>
          <h2 className="mt-4 text-[clamp(3rem,7vw,6.5rem)]">Combien pour votre trajet ?</h2>
          <fieldset className="mt-8">
            <legend className="text-base font-bold">Votre catégorie</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button key={c.key} type="button" aria-pressed={c.key === category} onClick={() => { setCategory(c.key); setSlug(vehicles.find((x) => x.category === c.key)?.slug ?? slug); }} className={cn("min-h-11 rounded-lg border-2 px-3.5 py-2 text-[15px] font-bold transition-colors", c.key === category ? "border-or-flame bg-or-flame text-or-ink" : "border-white/20 hover:border-white")}>
                  {c.label}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="mt-6 block">
            <span className="text-base font-bold">Votre véhicule</span>
            <select value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-2 h-14 w-full rounded-lg border-2 border-white/20 bg-or-ink2 px-3 text-base font-bold text-white outline-none focus:border-or-flame">
              {models.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}
            </select>
          </label>
          <label className="mt-7 block">
            <span className="flex items-baseline justify-between text-base font-bold">
              Durée
              <span className="font-[family-name:var(--font-orea-display)] text-3xl font-black">{days} {days === 1 ? "jour" : "jours"}</span>
            </span>
            <input type="range" min={1} max={21} value={days} onChange={(e) => setDays(Number(e.target.value))} className="orea-range mt-2 w-full" />
          </label>
          <label className="mt-5 flex cursor-pointer items-center gap-3 text-base font-semibold">
            <input type="checkbox" checked={cover} onChange={(e) => setCover(e.target.checked)} className="size-5 accent-[#ff5a1f]" />
            Ajouter l&apos;assurance Sérénité (franchise à zéro)
          </label>
        </div>

        <div>
          <div className="relative mx-auto max-w-[480px]">
            <svg viewBox="0 0 400 285" className="w-full" aria-hidden>
              <path d={arc(-120, 120)} fill="none" stroke="#2c3036" strokeWidth="26" strokeLinecap="round" />
              <motion.path d={arc(-120, 120)} fill="none" stroke="#ff5a1f" strokeWidth="26" strokeLinecap="round" style={{ pathLength: spring }} />
              {Array.from({ length: 13 }, (_, i) => {
                const deg = -120 + i * 20;
                const [x1, y1] = polar(deg, 118), [x2, y2] = polar(deg, i % 3 === 0 ? 100 : 108);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeOpacity=".55" strokeWidth={i % 3 === 0 ? 3 : 1.5} />;
              })}
              <g ref={needle}>
                <path d={`M${CX - 6} ${CY} L${CX} ${CY - 122} L${CX + 6} ${CY} Z`} fill="#fff" />
              </g>
              <circle cx={CX} cy={CY} r="14" fill="#ff5a1f" />
              <circle cx={CX} cy={CY} r="5" fill="#131518" />
            </svg>
            <div className="-mt-4 text-center">
              <p aria-live="polite" className="font-[family-name:var(--font-orea-display)] text-7xl font-black leading-none tabular-nums sm:text-8xl"><Counter value={q.total} /></p>
              <p className="mt-1 text-base font-semibold text-white/75">{v.name}, {days} {days === 1 ? "jour" : "jours"}</p>
            </div>
          </div>
          <div className="mt-5 min-h-7 text-center text-base font-bold text-or-flame">
            {q.discount > 0 ? `${formatEuro(q.discount)} de remise longue durée` : days >= 4 ? "Encore quelques jours pour obtenir 10 % de remise" : ""}
          </div>
          <div className="mt-4 flex justify-center">
            <Link href={reserve} className={btnCls("flame")}>
              Réserver ce véhicule
              <Arrow />
            </Link>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
