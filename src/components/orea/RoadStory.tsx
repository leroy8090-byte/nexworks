"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { journey } from "@/data/orea";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { cn } from "@/lib/utils";
import { Sign, Wrap } from "./ui";

const ROAD = "M600 0 C600 120 880 150 880 300 C880 470 320 450 320 640 C320 820 880 790 880 980 C880 1160 320 1130 320 1320 C320 1430 600 1450 600 1600";
const STOPS = [
  { top: "12%", side: "left" },
  { top: "32%", side: "right" },
  { top: "56%", side: "left" },
  { top: "78%", side: "right" },
] as const;
const THRESHOLDS = [0.1, 0.32, 0.56, 0.78];

/** La route se dessine au défilement, et une voiture la parcourt : on suit les quatre étapes d'une location. */
function DrawnRoad() {
  const ref = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const car = useRef<SVGGElement>(null);
  const [reached, setReached] = useState(-1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.8"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const place = (v: number) => {
    const p = path.current, c = car.current;
    if (!p || !c) return;
    const len = p.getTotalLength();
    const a = p.getPointAtLength(v * len);
    const b = p.getPointAtLength(Math.min(len, v * len + 2));
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    c.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${angle})`);
  };
  useEffect(() => place(0), []);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    place(v);
    setReached(THRESHOLDS.filter((t) => v >= t).length - 1);
  });

  return (
    <div ref={ref} className="relative mx-auto mt-14 hidden max-w-[1200px] lg:block">
      <svg viewBox="0 0 1200 1600" className="block w-full" aria-hidden fill="none">
        <path ref={path} d={ROAD} stroke="#d9d3c6" strokeWidth="96" />
        <defs>
          <mask id="orea-drawn" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="1600">
            <motion.path d={ROAD} stroke="#fff" strokeWidth="110" style={{ pathLength: draw }} />
          </mask>
        </defs>
        <g mask="url(#orea-drawn)">
          <path d={ROAD} stroke="#24272b" strokeWidth="92" />
          <path d={ROAD} stroke="#fff" strokeWidth="5" strokeDasharray="30 28" />
        </g>
        <g ref={car}>
          <rect x="-52" y="-24" width="104" height="48" rx="15" fill="#ff5a1f" />
          <rect x="-16" y="-18" width="38" height="36" rx="7" fill="#131518" />
          <rect x="-44" y="-17" width="12" height="9" rx="2" fill="#fff" opacity=".8" />
          <rect x="-44" y="8" width="12" height="9" rx="2" fill="#fff" opacity=".8" />
          <rect x="38" y="-19" width="10" height="9" rx="2" fill="#fff4b0" />
          <rect x="38" y="10" width="10" height="9" rx="2" fill="#fff4b0" />
        </g>
      </svg>
      {journey.map((s, i) => {
        const stop = STOPS[i];
        const on = i <= reached;
        return (
          <article key={s.n} style={{ top: stop.top }} className={cn("absolute w-[38%] -translate-y-1/2 transition-all duration-700", stop.side === "left" ? "left-0 text-right" : "right-0", on ? "translate-x-0 opacity-100" : cn("opacity-25", stop.side === "left" ? "-translate-x-6" : "translate-x-6"))}>
            <p className="font-[family-name:var(--font-orea-display)] text-3xl font-black text-or-flame-deep">{s.n}</p>
            <h3 className="text-[clamp(3rem,5.4vw,5.5rem)]">{s.title}</h3>
            <p className="mt-2 text-lg leading-relaxed text-or-ink/80">{s.text}</p>
          </article>
        );
      })}
    </div>
  );
}

function Steps({ always }: { always?: boolean }) {
  return (
    <ol className={cn("relative mt-12 space-y-10 border-l-[6px] border-dashed border-or-ink/25 pl-7", !always && "lg:hidden")}>
      {journey.map((s) => (
        <li key={s.n} className="relative">
          <span className="absolute -left-[46px] top-1 flex size-8 items-center justify-center rounded bg-or-flame font-[family-name:var(--font-orea-display)] text-lg font-black text-or-ink">{Number(s.n)}</span>
          <h3 className="text-5xl">{s.title}</h3>
          <p className="mt-2 max-w-xl text-lg leading-relaxed text-or-ink/80">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function RoadStory() {
  const reduce = useCalmMotion();
  return (
    <section className="overflow-hidden bg-or-sand pb-20 text-or-ink sm:pb-28">
      <Wrap>
        <Sign>Comment ça marche</Sign>
        <h2 className="mt-4 max-w-4xl text-[clamp(3rem,7vw,6.5rem)]">Quatre étapes, et c&apos;est parti.</h2>
        {reduce ? <Steps always /> : <><DrawnRoad /><Steps /></>}
      </Wrap>
    </section>
  );
}
