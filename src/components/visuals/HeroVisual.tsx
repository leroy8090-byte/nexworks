"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, type CSSProperties, type ReactNode } from "react";
import { ScaledStage } from "@/components/ui/ScaledStage";
import { cn, ease } from "@/lib/utils";

/**
 * Écosystème digital NEXWORKS : site web, dashboard, indicateurs SEO, assistant IA et mobile,
 * reliés par des connexions lumineuses. Toutes les données affichées sont purement illustratives.
 */

function Layer({
  sx,
  sy,
  depth,
  delay,
  className,
  style,
  float,
  children,
}: {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  depth: number;
  delay: number;
  className?: string;
  style?: CSSProperties;
  float?: "float" | "float-slow";
  children: ReactNode;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  return (
    <motion.div style={{ x, y, ...style }} className={cn("absolute", className)}>
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, duration: 1.1, ease }}
      >
        <div
          className={float === "float-slow" ? "animate-float-slow" : "animate-float"}
          style={{ animationDelay: `${-delay * 4}s` }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

const Skel = ({ w, h = 4, c = "bg-white/12", className }: { w: number | string; h?: number; c?: string; className?: string }) => (
  <div className={cn("rounded-full", c, className)} style={{ width: w, height: h }} />
);

function BrowserWindow() {
  return (
    <div className="glass-strong h-[290px] w-[390px] overflow-hidden rounded-2xl shadow-[0_0_80px_-20px_rgba(54,169,232,0.35)]">
      <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.03] px-3.5">
        <span className="size-[7px] rounded-full bg-white/20" />
        <span className="size-[7px] rounded-full bg-white/20" />
        <span className="size-[7px] rounded-full bg-white/20" />
        <div className="ml-3 flex h-[18px] flex-1 items-center rounded-md bg-white/[0.06] px-2.5 text-[9px] tracking-wide text-mist/80">
          votre-entreprise.fr
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-4 rounded-[5px] bg-sky" />
            <Skel w={42} h={5} c="bg-white/70" />
          </div>
          <div className="flex items-center gap-3">
            <Skel w={22} /> <Skel w={22} /> <Skel w={22} />
            <div className="h-4 w-12 rounded-full bg-sky/90" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-[1.15fr_1fr] gap-4">
          <div>
            <Skel w="88%" h={10} c="bg-white/85" />
            <Skel w="62%" h={10} c="bg-sky" className="mt-2" />
            <Skel w="94%" h={4} className="mt-4" />
            <Skel w="78%" h={4} className="mt-1.5" />
            <div className="mt-4 flex gap-2">
              <div className="h-[18px] w-[62px] rounded-full bg-sky shadow-[0_0_16px_rgba(85,189,242,0.6)]" />
              <div className="h-[18px] w-[50px] rounded-full border border-white/25" />
            </div>
          </div>
          <div className="relative h-[92px] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-sky/30 via-sky-bright/10 to-transparent">
            <svg viewBox="0 0 160 92" className="absolute inset-0 size-full">
              <circle cx="104" cy="46" r="52" fill="none" stroke="rgba(255,255,255,.14)" />
              <circle cx="104" cy="46" r="34" fill="none" stroke="rgba(255,255,255,.2)" />
              <circle cx="104" cy="46" r="16" fill="rgba(85,189,242,.55)" />
              <path d="M0 78 C30 60 55 84 90 66 S140 60 160 70" fill="none" stroke="rgba(255,255,255,.35)" />
            </svg>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-2.5">
              <div className={cn("size-4 rounded-md", i === 1 ? "bg-sky/80" : "bg-white/15")} />
              <Skel w="75%" h={4} c="bg-white/40" className="mt-2.5" />
              <Skel w="55%" h={3} className="mt-1.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardCard() {
  return (
    <div className="glass-strong w-[270px] rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-white">Visibilité organique</span>
        <span className="rounded-full border border-sky/30 bg-sky/10 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-sky">
          Illustration
        </span>
      </div>
      <svg viewBox="0 0 240 90" className="mt-3 h-[88px] w-full overflow-visible">
        <defs>
          <linearGradient id="hv-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#55BDF2" stopOpacity=".38" />
            <stop offset="100%" stopColor="#55BDF2" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hv-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#36A9E8" />
            <stop offset="100%" stopColor="#8fd6fa" />
          </linearGradient>
        </defs>
        {[20, 45, 70].map((y) => (
          <line key={y} x1="0" x2="240" y1={y} y2={y} stroke="rgba(255,255,255,.07)" />
        ))}
        <motion.path
          d="M0 78 C28 74 40 66 62 62 S96 58 116 46 S160 38 180 24 S220 14 240 8 L240 90 L0 90 Z"
          fill="url(#hv-area)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.2 }}
        />
        <motion.path
          d="M0 78 C28 74 40 66 62 62 S96 58 116 46 S160 38 180 24 S220 14 240 8"
          fill="none"
          stroke="url(#hv-line)"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.1, duration: 1.8, ease }}
        />
        <motion.circle
          cx="240"
          cy="8"
          r="3.5"
          fill="#fff"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
        />
      </svg>
      <div className="mt-1 flex justify-between text-[8px] uppercase tracking-wider text-mist/70">
        <span>Début</span>
        <span>Évolution dans le temps</span>
      </div>
    </div>
  );
}

function SeoCard() {
  const rows = [
    { label: "Technique", w: 86 },
    { label: "Contenus", w: 72 },
    { label: "Local", w: 64 },
    { label: "Performance", w: 91 },
  ];
  return (
    <div className="glass-strong w-[225px] rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-white">Indicateurs SEO</span>
        <span className="rounded-full border border-white/15 px-2 py-0.5 text-[8px] uppercase tracking-wider text-mist">
          Aperçu
        </span>
      </div>
      <div className="mt-4 space-y-3.5">
        {rows.map((r, i) => (
          <div key={r.label}>
            <div className="mb-1.5 flex items-center justify-between text-[9px] text-mist">
              <span>{r.label}</span>
              <svg viewBox="0 0 12 12" className="size-3 text-sky" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="m2.5 6.5 2.3 2.3 4.7-5" />
              </svg>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky-bright to-sky"
                initial={{ width: 0 }}
                animate={{ width: `${r.w}%` }}
                transition={{ delay: 1.5 + i * 0.15, duration: 1.4, ease }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[8px] leading-snug text-mist/60">Données fictives, à titre d&apos;illustration.</p>
    </div>
  );
}

function AiCard() {
  return (
    <div className="glass-strong w-[250px] rounded-2xl p-4">
      <div className="flex items-center gap-2">
        <div className="flex size-6 items-center justify-center rounded-lg bg-gradient-to-br from-sky to-sky-bright text-ink">
          <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
            <path d="M12 2.5c.7 4.8 2.7 6.8 7.5 7.5-4.8.7-6.8 2.7-7.5 7.5-.7-4.8-2.7-6.8-7.5-7.5 4.8-.7 6.8-2.7 7.5-7.5Z" />
          </svg>
        </div>
        <span className="text-[11px] font-semibold text-white">Assistant IA</span>
        <span className="ml-auto flex gap-0.5">
          <i className="size-1 animate-pulse rounded-full bg-sky" />
          <i className="size-1 animate-pulse rounded-full bg-sky [animation-delay:200ms]" />
          <i className="size-1 animate-pulse rounded-full bg-sky [animation-delay:400ms]" />
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        <Skel w="100%" h={4} c="bg-white/25" />
        <Skel w="92%" h={4} c="bg-white/18" />
        <Skel w="64%" h={4} c="bg-white/18" />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["Site web", "Données structurées", "Fiche Google"].map((s) => (
          <span key={s} className="rounded-full border border-sky/25 bg-sky/[0.08] px-2 py-0.5 text-[8px] text-sky">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="h-[215px] w-[118px] rounded-[22px] border border-white/20 bg-ink-2 p-1.5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_40px_-12px_rgba(54,169,232,0.4)]">
      <div className="relative h-full overflow-hidden rounded-[17px] bg-gradient-to-b from-[#0e1319] to-ink">
        <div className="mx-auto mt-1.5 h-1 w-9 rounded-full bg-white/20" />
        <div className="px-2.5 pt-3">
          <div className="flex items-center justify-between">
            <div className="size-3 rounded-[4px] bg-sky" />
            <div className="h-0.5 w-3.5 rounded bg-white/50" />
          </div>
          <Skel w="90%" h={6} c="bg-white/85" className="mt-3.5" />
          <Skel w="60%" h={6} c="bg-sky" className="mt-1.5" />
          <Skel w="85%" h={3} className="mt-3" />
          <Skel w="70%" h={3} className="mt-1" />
          <div className="mt-3 h-4 w-full rounded-full bg-sky/90" />
          <div className="mt-3 h-[52px] rounded-lg border border-white/10 bg-gradient-to-br from-sky/25 to-transparent" />
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <div className="h-7 rounded-md bg-white/[0.06]" />
            <div className="h-7 rounded-md bg-white/[0.06]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 20, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 55, damping: 20, mass: 0.8 });
  const { scrollY } = useScroll();
  const scrollShift = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -48]);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  const bgX = useTransform(sx, (v) => v * -10);
  const bgY = useTransform(sy, (v) => v * -10);

  return (
    <motion.div style={{ y: scrollShift }} className="relative">
      <ScaledStage width={620} height={560}>
        {/* Fond : halo, anneaux orbitaux, points */}
        <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 size-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(85,189,242,0.2), rgba(85,189,242,0.05) 60%, transparent)" }}
          />
          <svg viewBox="0 0 620 560" className="absolute inset-0 size-full" fill="none">
            <circle cx="310" cy="285" r="262" stroke="rgba(255,255,255,0.06)" />
            <circle cx="310" cy="285" r="200" stroke="rgba(85,189,242,0.12)" strokeDasharray="2 7" />
            <circle cx="310" cy="285" r="140" stroke="rgba(255,255,255,0.05)" />
            <g className="animate-orbit" style={{ transformOrigin: "310px 285px" }}>
              <circle cx="572" cy="285" r="3" fill="#55BDF2" />
              <circle cx="48" cy="285" r="2" fill="rgba(255,255,255,0.5)" />
            </g>
          </svg>
          <div className="bg-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(closest-side,#000_30%,transparent)]" />
        </motion.div>

        {/* Connexions lumineuses */}
        <svg viewBox="0 0 620 560" className="absolute inset-0 size-full overflow-visible" fill="none" aria-hidden>
          <defs>
            <linearGradient id="hv-conn" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#55BDF2" stopOpacity=".15" />
              <stop offset="50%" stopColor="#55BDF2" stopOpacity=".9" />
              <stop offset="100%" stopColor="#55BDF2" stopOpacity=".15" />
            </linearGradient>
          </defs>
          {[
            "M135 130 C135 150 150 165 168 180",
            "M360 150 C345 190 320 200 296 218",
            "M392 336 C380 346 350 350 318 330",
            "M112 340 C112 320 118 306 130 292",
          ].map((d, i) => (
            <g key={i}>
              <path d={d} stroke="url(#hv-conn)" strokeWidth="1.4" strokeDasharray="4 6" className="animate-dash" />
              <circle r="3" fill="#8fd6fa">
                <animateMotion dur={`${3.4 + i * 0.6}s`} repeatCount="indefinite" path={d} begin={`${i * 0.5}s`} />
              </circle>
              <circle r="9" fill="rgba(85,189,242,0.25)">
                <animateMotion dur={`${3.4 + i * 0.6}s`} repeatCount="indefinite" path={d} begin={`${i * 0.5}s`} />
              </circle>
            </g>
          ))}
        </svg>

        <Layer sx={sx} sy={sy} depth={14} delay={0.35} className="left-[30px] top-[120px]" float="float-slow">
          <BrowserWindow />
        </Layer>
        <Layer sx={sx} sy={sy} depth={30} delay={0.7} className="left-[10px] top-[8px]">
          <AiCard />
        </Layer>
        <Layer sx={sx} sy={sy} depth={24} delay={0.9} className="left-[345px] top-[50px]" float="float-slow">
          <DashboardCard />
        </Layer>
        <Layer sx={sx} sy={sy} depth={34} delay={1.1} className="left-[388px] top-[318px]">
          <SeoCard />
        </Layer>
        <Layer sx={sx} sy={sy} depth={42} delay={1.25} className="left-[52px] top-[338px]" float="float-slow">
          <PhoneMock />
        </Layer>
      </ScaledStage>
    </motion.div>
  );
}
