"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ScaledStage } from "@/components/ui/ScaledStage";
import { cn, ease } from "@/lib/utils";
import type { ServiceId } from "@/data/services";
import { BeforeAfter } from "./BeforeAfter";

const W = 560;
const H = 400;

const Skel = ({ w, h = 4, c = "bg-white/12", className }: { w: number | string; h?: number; c?: string; className?: string }) => (
  <div className={cn("rounded-full", c, className)} style={{ width: w, height: h }} />
);

const Badge = ({ children, tone = "sky" }: { children: ReactNode; tone?: "sky" | "mute" }) => (
  <span
    className={cn(
      "rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider",
      tone === "sky" ? "border-sky/30 bg-sky/10 text-sky" : "border-white/15 text-mist",
    )}
  >
    {children}
  </span>
);

const Tick = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 12 12" className={cn("size-3.5 text-sky", className)} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2.5 6.5 2.3 2.3 4.7-5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* 1. Création web : ordinateur + smartphone                           */
/* ------------------------------------------------------------------ */

function SiteContent({ compact }: { compact?: boolean }) {
  return (
    <div className={compact ? "p-3" : "p-5"}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("rounded-md bg-sky", compact ? "size-3.5" : "size-5")} />
          <Skel w={compact ? 28 : 54} h={compact ? 4 : 6} c="bg-white/70" />
        </div>
        {!compact && (
          <div className="flex items-center gap-4">
            <Skel w={28} h={5} /> <Skel w={28} h={5} /> <Skel w={28} h={5} />
            <div className="h-5 w-16 rounded-full bg-sky/90" />
          </div>
        )}
      </div>
      <div className={compact ? "mt-4" : "mt-8"}>
        <Skel w="78%" h={compact ? 8 : 15} c="bg-white/90" />
        <Skel w="52%" h={compact ? 8 : 15} c="bg-sky" className={compact ? "mt-1.5" : "mt-2.5"} />
        <Skel w="68%" h={compact ? 3 : 5} className={compact ? "mt-3" : "mt-5"} />
        <Skel w="55%" h={compact ? 3 : 5} className="mt-1.5" />
        <div className={cn("flex gap-2", compact ? "mt-3" : "mt-6")}>
          <div className={cn("rounded-full bg-sky shadow-[0_0_20px_rgba(85,189,242,.55)]", compact ? "h-4 w-14" : "h-7 w-24")} />
          {!compact && <div className="h-7 w-20 rounded-full border border-white/25" />}
        </div>
      </div>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-sky/30 via-sky-bright/10 to-transparent",
          compact ? "mt-4 h-16" : "mt-8 h-[92px]",
        )}
      >
        <svg viewBox="0 0 400 92" className="absolute inset-0 size-full" preserveAspectRatio="none" fill="none">
          <path d="M0 70 C70 40 130 80 200 54 S330 30 400 56" stroke="rgba(255,255,255,.3)" />
          <circle cx="300" cy="46" r="30" stroke="rgba(255,255,255,.18)" />
          <circle cx="300" cy="46" r="14" fill="rgba(85,189,242,.5)" />
        </svg>
      </div>
      <div className={cn("grid gap-2.5", compact ? "mt-3 grid-cols-2" : "mt-5 grid-cols-3")}>
        {Array.from({ length: compact ? 2 : 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-2.5">
            <div className={cn("size-4 rounded-md", i === 1 ? "bg-sky/80" : "bg-white/15")} />
            <Skel w="70%" h={4} c="bg-white/40" className="mt-2" />
            <Skel w="50%" h={3} className="mt-1.5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function WebVisual() {
  return (
    <ScaledStage width={W} height={H}>
      <div className="absolute inset-0">
        <div
          className="absolute left-[40px] top-[120px] size-[320px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(85,189,242,.22), transparent)" }}
        />
        {/* Ordinateur */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          className="absolute left-[14px] top-[30px]"
        >
          <div className="glass-strong h-[290px] w-[440px] overflow-hidden rounded-t-xl border-b-0">
            <div className="flex h-7 items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.03] px-3">
              <span className="size-[6px] rounded-full bg-white/20" />
              <span className="size-[6px] rounded-full bg-white/20" />
              <span className="size-[6px] rounded-full bg-white/20" />
              <div className="ml-3 h-4 w-40 rounded bg-white/[0.06]" />
            </div>
            <div className="h-[262px] overflow-hidden">
              <div className="animate-pan">
                <SiteContent />
                <SiteContent />
              </div>
            </div>
          </div>
          <div className="relative mx-auto h-3 w-[480px] -translate-x-5 rounded-b-2xl bg-gradient-to-b from-[#2a323b] to-[#14181d] shadow-[0_20px_40px_-10px_rgba(0,0,0,.9)]">
            <div className="absolute left-1/2 top-0 h-1 w-20 -translate-x-1/2 rounded-b-md bg-black/50" />
          </div>
        </motion.div>
        {/* Smartphone */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.25, ease }}
          className="absolute left-[388px] top-[112px]"
        >
          <div className="animate-float h-[262px] w-[138px] rounded-[26px] border border-white/20 bg-ink-2 p-1.5 shadow-[0_30px_60px_-10px_rgba(0,0,0,.95),0_0_50px_-14px_rgba(54,169,232,.45)]">
            <div className="h-full overflow-hidden rounded-[20px] bg-gradient-to-b from-[#0e1319] to-ink">
              <div className="mx-auto mt-1.5 h-1 w-10 rounded-full bg-white/20" />
              <div className="h-[238px] overflow-hidden">
                <div className="animate-pan">
                  <SiteContent compact />
                  <SiteContent compact />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ScaledStage>
  );
}

/* ------------------------------------------------------------------ */
/* 3. SEO : progression de visibilité (illustration)                   */
/* ------------------------------------------------------------------ */

function SeoVisual() {
  const checks = [
    { label: "Audit SEO", w: 92 },
    { label: "Optimisation technique", w: 78 },
    { label: "Titres et contenus", w: 66 },
    { label: "Référencement local", w: 84 },
  ];
  return (
    <ScaledStage width={W} height={H}>
      <div className="absolute inset-0">
        {/* Graphique */}
        <div className="glass-strong absolute left-0 top-0 h-[250px] w-[336px] rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-white">Visibilité organique</span>
            <Badge>Illustration</Badge>
          </div>
          <svg viewBox="0 0 296 140" className="mt-4 h-[140px] w-full overflow-visible">
            <defs>
              <linearGradient id="sv-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#55BDF2" stopOpacity=".35" />
                <stop offset="100%" stopColor="#55BDF2" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 35, 70, 105, 140].map((y) => (
              <line key={y} x1="0" x2="296" y1={y} y2={y} stroke="rgba(255,255,255,.06)" />
            ))}
            <motion.path
              d="M0 120 C30 116 50 104 80 98 S126 92 150 74 S200 60 228 38 S270 20 296 10 L296 140 L0 140 Z"
              fill="url(#sv-area)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1.2 }}
            />
            <motion.path
              d="M0 120 C30 116 50 104 80 98 S126 92 150 74 S200 60 228 38 S270 20 296 10"
              fill="none"
              stroke="#55BDF2"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease }}
            />
            {[[80, 98], [150, 74], [228, 38], [296, 10]].map(([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r="4"
                fill="#050505"
                stroke="#8fd6fa"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.4 }}
              />
            ))}
          </svg>
          <div className="mt-2 flex justify-between text-[9px] uppercase tracking-wider text-mist/70">
            <span>Aujourd&apos;hui</span>
            <span>Évolution dans le temps</span>
          </div>
        </div>

        {/* Aperçu de résultat de recherche */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9, ease }}
          className="glass-strong absolute left-[356px] top-0 h-[145px] w-[204px] rounded-2xl p-4"
        >
          <div className="flex items-center gap-2 text-[9px] text-mist">
            <div className="flex size-4 items-center justify-center rounded-full bg-white/10">
              <div className="size-2 rounded-full bg-sky" />
            </div>
            votre-entreprise.fr
          </div>
          <div className="mt-2 text-[12px] font-medium leading-snug text-sky">Titre clair et optimisé de votre page</div>
          <Skel w="100%" h={4} className="mt-2.5" />
          <Skel w="86%" h={4} className="mt-1.5" />
          <Skel w="48%" h={4} className="mt-1.5" />
        </motion.div>

        {/* Fiche d'établissement */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.9, ease }}
          className="glass-strong absolute left-[356px] top-[160px] h-[90px] w-[204px] rounded-2xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-sky/15 text-sky">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.4" />
              </svg>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-white">Fiche Google</div>
              <div className="text-[9px] text-mist">Informations à jour</div>
            </div>
          </div>
          <div className="mt-3 flex gap-1.5">
            <Skel w={40} h={5} c="bg-sky/50" />
            <Skel w={26} h={5} />
            <Skel w={34} h={5} />
          </div>
        </motion.div>

        {/* Actions SEO */}
        <div className="glass-strong absolute left-0 top-[270px] h-[130px] w-[560px] rounded-2xl p-5">
          <div className="grid h-full grid-cols-2 gap-x-8 gap-y-4">
            {checks.map((c, i) => (
              <div key={c.label}>
                <div className="mb-2 flex items-center justify-between text-[11px] text-mist">
                  <span>{c.label}</span>
                  <Tick />
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-sky-bright to-sky"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.w}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 1.4, ease }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScaledStage>
  );
}

/* ------------------------------------------------------------------ */
/* 4. GEO : sources d'information et assistant IA (schéma illustratif) */
/* ------------------------------------------------------------------ */

function GeoVisual() {
  const cx = 280;
  const cy = 168;
  const sources = [
    { label: "Site web", x: 8, y: 26, ax: 168, ay: 48 },
    { label: "Données structurées", x: 386, y: 26, ax: 386, ay: 48 },
    { label: "Fiche Google", x: 8, y: 150, ax: 150, ay: 172 },
    { label: "Contenus utiles", x: 402, y: 150, ax: 402, ay: 172 },
    { label: "Informations cohérentes", x: 190, y: 0, ax: 280, ay: 44 },
  ];
  return (
    <ScaledStage width={W} height={H}>
      <div className="absolute inset-0">
        <div
          className="absolute left-[140px] top-[20px] size-[280px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(85,189,242,.2), transparent)" }}
        />
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" fill="none">
          {sources.map((s, i) => {
            const d = `M${s.ax} ${s.ay} C${(s.ax + cx) / 2} ${s.ay}, ${(s.ax + cx) / 2} ${cy}, ${cx} ${cy}`;
            return (
              <g key={s.label}>
                <path d={d} stroke="rgba(85,189,242,.5)" strokeWidth="1.3" strokeDasharray="4 6" className="animate-dash" />
                <circle r="3" fill="#8fd6fa">
                  <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite" path={d} begin={`${i * 0.4}s`} />
                </circle>
              </g>
            );
          })}
        </svg>

        {sources.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease }}
            className="glass-strong absolute flex h-[44px] items-center gap-2.5 rounded-xl px-3.5 text-[11px] font-medium text-white"
            style={{ left: s.x, top: s.y }}
          >
            <span className="size-2 rounded-full bg-sky shadow-[0_0_10px_rgba(85,189,242,.9)]" />
            {s.label}
          </motion.div>
        ))}

        {/* Noeud central : assistant IA */}
        <div className="absolute" style={{ left: cx - 46, top: cy - 46 }}>
          <span className="absolute inset-0 animate-pulse-ring rounded-full border border-sky/50" />
          <span className="absolute inset-0 animate-pulse-ring rounded-full border border-sky/40 [animation-delay:1.1s]" />
          <div className="relative flex size-[92px] items-center justify-center rounded-full border border-sky/40 bg-gradient-to-br from-sky/25 to-ink-2 shadow-[0_0_60px_-6px_rgba(85,189,242,.7)]">
            <svg viewBox="0 0 24 24" className="size-9 text-sky" fill="currentColor">
              <path d="M12 2.5c.7 4.8 2.7 6.8 7.5 7.5-4.8.7-6.8 2.7-7.5 7.5-.7-4.8-2.7-6.8-7.5-7.5 4.8-.7 6.8-2.7 7.5-7.5Z" />
              <path d="M19 15.5c.2 1.5.8 2.1 2.3 2.3-1.5.2-2.1.8-2.3 2.3-.2-1.5-.8-2.1-2.3-2.3 1.5-.2 2.1-.8 2.3-2.3Z" opacity=".7" />
            </svg>
          </div>
        </div>

        {/* Réponse */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.9, ease }}
          className="glass-strong absolute left-[90px] top-[286px] h-[114px] w-[380px] rounded-2xl p-5"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[11px] font-semibold text-white">
              <span className="size-2 rounded-full bg-sky" /> Réponse de l&apos;assistant
            </span>
            <Badge>Schéma illustratif</Badge>
          </div>
          <div className="mt-4 space-y-2">
            <Skel w="100%" h={5} c="bg-white/25" />
            <Skel w="94%" h={5} c="bg-white/18" />
            <Skel w="70%" h={5} c="bg-white/18" />
          </div>
        </motion.div>
      </div>
    </ScaledStage>
  );
}

export function ServiceVisual({ id }: { id: ServiceId }) {
  switch (id) {
    case "creation-web":
      return <WebVisual />;
    case "design-ux":
      return <BeforeAfter />;
    case "seo":
      return <SeoVisual />;
    case "geo":
      return <GeoVisual />;
  }
}

export const serviceVisualCaption: Record<ServiceId, string> = {
  "creation-web": "Aperçu illustratif d'un site sur ordinateur et smartphone.",
  "design-ux": "Même site, avant et après refonte : mêmes contenus, interface modernisée. Faites glisser le curseur pour comparer.",
  seo: "Illustration d'une progression de visibilité organique. Données fictives, aucun résultat réel.",
  geo: "Schéma illustratif : différentes sources d'information et un assistant IA. Aucune apparition n'est garantie.",
};
