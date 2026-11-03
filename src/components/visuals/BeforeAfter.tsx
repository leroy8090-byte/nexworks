"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { ScaledStage } from "@/components/ui/ScaledStage";
import { cn } from "@/lib/utils";

/**
 * Comparaison avant / après d'un MÊME site (même contenu, mêmes sections) :
 * à gauche une interface datée, à droite sa version modernisée (identité AZUR actuelle).
 */

const sample = {
  name: "AZUR PLOMBERIE",
  nav: ["Accueil", "Services", "Salle de bain", "À propos", "Contact"],
  title: "Votre plombier de confiance à Saint-Raphaël.",
  text: "Du dépannage à la rénovation complète de votre salle de bain, nous vous accompagnons avec des solutions adaptées à vos besoins.",
  cta: "Demander un devis",
  services: [
    { t: "Dépannage plomberie", d: "Fuite, robinet défectueux, canalisation bouchée." },
    { t: "Installation sanitaire", d: "Équipements sanitaires pour plus de confort." },
    { t: "Chauffe-eau", d: "Installation ou remplacement adapté à vos besoins." },
  ],
  phone: "01 23 45 67 89",
  mail: "contact@exemple.fr",
  hours: "Lun. – Sam., 8 h – 19 h",
  zone: "Saint-Raphaël et environs",
};

/* ------------------------------ AVANT ------------------------------ */

function OldSite({ compact }: { compact?: boolean }) {
  const s = sample;
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#ece8d8] font-serif text-[#222]">
      <div className="bg-gradient-to-b from-[#2f5f9e] to-[#1b3d73] px-4 py-3">
        <div className={cn("font-bold text-[#f6ec9a]", compact ? "text-[20px]" : "text-[28px]")}>{s.name.toUpperCase()}</div>
        <div className={cn("text-white", compact ? "text-[11px]" : "text-[13px]")}>Bienvenue sur notre site !!!</div>
      </div>
      <div className={cn("flex flex-wrap gap-y-1 bg-[#c9c4b0] px-3 py-1.5 text-[#1a4fa0] underline", compact ? "text-[11px]" : "text-[13px]")}>
        {s.nav.map((l, i) => (
          <span key={l} className={cn("pr-2", i > 0 && "border-l border-[#8e8870] pl-2")}>
            {l}
          </span>
        ))}
      </div>

      <div className={cn("gap-3 p-3", compact ? "block" : "grid grid-cols-[170px_1fr]")}>
        {!compact && (
          <div className="space-y-2">
            <div className="border border-[#8e8870] bg-[#d9d4bf] p-2 text-[12px]">
              <div className="mb-1 font-bold text-[#7a1010]">Actualités</div>
              <div className="text-[#1a4fa0] underline">» Nouveau : site mis à jour</div>
              <div className="text-[#1a4fa0] underline">» Fermeture annuelle</div>
              <div className="text-[#1a4fa0] underline">» Archives</div>
            </div>
            <div className="border border-[#8e8870] bg-[#f3e07a] p-2 text-center text-[12px] font-bold text-[#7a1010]">
              PROMO !!!
            </div>
            <div className="border border-[#8e8870] bg-[#d9d4bf] p-2 text-[11px] text-[#555]">Visiteurs : 004512</div>
          </div>
        )}

        <div className="border border-[#8e8870] bg-white p-3">
          <div className={cn("font-bold text-[#b32525]", compact ? "text-[17px] leading-tight" : "text-[22px]")}>{s.title}</div>
          <p className={cn("mt-2 text-justify text-[#444]", compact ? "text-[11px] leading-snug" : "text-[13px] leading-snug")}>{s.text}</p>
          <div className={cn("mt-3 gap-2", compact ? "space-y-1.5" : "grid grid-cols-3")}>
            {s.services.map((x) => (
              <div key={x.t} className="border border-[#8e8870]">
                <div className="bg-[#cfd8e6] px-2 py-0.5 text-[12px] font-bold text-[#1b3d73]">{x.t}</div>
                <div className={cn("px-2 py-1 text-[#444]", compact ? "text-[10.5px]" : "text-[12px]")}>{x.d}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 inline-block border-2 border-[#7a1010] bg-[#d63030] px-3 py-1 text-[12px] font-bold text-white">
            CLIQUEZ ICI POUR UN DEVIS !
          </div>
          <div className={cn("mt-3 border-t border-[#8e8870] pt-2 text-[#333]", compact ? "text-[10.5px] leading-snug" : "text-[12px]")}>
            Tél : {s.phone} — E-mail : <span className="text-[#1a4fa0] underline">{s.mail}</span>
            <br />
            Horaires : {s.hours}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ APRÈS — identité AZUR actuelle ------------------------------ */

const navy = "#002D72";
const mid = "#0077C2";
const sky = "#4FC3F7";
const yellow = "#FFC107";

const ServiceIcon = ({ i }: { i: number }) => (
  <svg viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {i === 0 && <path d="M14.7 6.3a4 4 0 0 0-5.4 5L3.5 17.1a1.8 1.8 0 0 0 2.5 2.5l5.8-5.8a4 4 0 0 0 5-5.4l-2.4 2.4-2.1-.5-.5-2.1 2.3-2.5Z" />}
    {i === 1 && (
      <>
        <path d="M5 11V8a4 4 0 0 1 8 0" />
        <path d="M5 11h14v2a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-2Z" />
        <path d="M9 21.5v-2M15 21.5v-2" />
      </>
    )}
    {i === 2 && <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.5 1 2 2 2.3-.4-3 0-5.5 1-8.3Z" />}
  </svg>
);

function MascotLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="32" r="30" fill={sky} />
      <path d="M32 10c8 10 14 16 14 26a14 14 0 0 1-28 0c0-10 6-16 14-26Z" fill="#7DD3FC" stroke={navy} strokeWidth="2.2" />
      <circle cx="27" cy="34" r="2.4" fill={navy} />
      <path d="M36 33.5c1.2.2 2.2 1.1 2.2 2.4" stroke={navy} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M26 40c2.2 2.4 7.5 2.6 10.2.2" stroke={navy} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M42 28l3 8 3-2-1.5 6" stroke="#E8EEF5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 24l2-3 2 3-2 1Z" fill={yellow} />
    </svg>
  );
}

function NewSite({ compact }: { compact?: boolean }) {
  const s = sample;
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#EBF7FC] font-sans text-[#002D72]">
      <div className={cn("bg-[#001a4a] text-center text-[#b7c8d8]", compact ? "px-3 py-1 text-[9px]" : "px-6 py-1.5 text-[11px]")}>
        Projet de démonstration fictif — NEXWORKS AGENCY
      </div>

      <div className={cn("flex items-center justify-between border-b border-[#D5DEE7] bg-white", compact ? "px-3 py-2" : "px-8 py-2.5")}>
        <div className="flex items-center gap-2">
          <MascotLogo size={compact ? 30 : 38} />
          <div className="leading-tight">
            <div className={cn("font-extrabold tracking-tight", compact ? "text-[13px]" : "text-[16px]")} style={{ color: mid }}>
              AZUR
            </div>
            <div className={cn("font-bold uppercase tracking-[0.12em]", compact ? "text-[8px]" : "text-[9px]")} style={{ color: navy }}>
              Plomberie
            </div>
          </div>
        </div>
        {compact ? (
          <span className="rounded-full px-3 py-1.5 text-[11px] font-bold" style={{ background: yellow, color: navy }}>
            Devis
          </span>
        ) : (
          <div className="flex items-center gap-5 text-[12.5px] font-semibold" style={{ color: navy }}>
            {s.nav.map((l, i) => (
              <span key={l} style={i === 0 ? { color: mid } : undefined}>
                {l}
              </span>
            ))}
            <span className="rounded-full px-4 py-2 text-[12.5px] font-bold shadow-sm" style={{ background: yellow, color: navy }}>
              Demander un devis
            </span>
          </div>
        )}
      </div>

      <div className={cn(compact ? "px-3 py-4" : "grid grid-cols-[1.15fr_.85fr] items-center gap-6 px-8 py-5")}>
        <div>
          <p
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-[#B8DFF5] bg-white font-bold uppercase tracking-[0.14em]",
              compact ? "px-2.5 py-1 text-[8px]" : "px-3 py-1 text-[10px]",
            )}
            style={{ color: mid }}
          >
            <span className="size-1.5 rounded-full" style={{ background: yellow }} />
            Plomberie · Dépannage · Rénovation
          </p>
          <h3 className={cn("mt-3 font-extrabold leading-[1.08] tracking-tight", compact ? "text-[20px]" : "text-[28px]")} style={{ color: navy }}>
            Votre <span style={{ color: mid }}>plombier de confiance</span> à Saint-Raphaël.
          </h3>
          <p className={cn("text-[#536273]", compact ? "mt-2 text-[11.5px] leading-relaxed" : "mt-2.5 max-w-[420px] text-[13.5px] leading-relaxed")}>
            {s.text}
          </p>
          <div className={cn("flex flex-wrap gap-2", compact ? "mt-3" : "mt-4")}>
            <span className={cn("rounded-full font-bold", compact ? "px-3.5 py-2 text-[12px]" : "px-5 py-2.5 text-[13px]")} style={{ background: yellow, color: navy }}>
              {s.cta}
            </span>
            {!compact && (
              <span className="rounded-full border-2 bg-white px-5 py-2.5 text-[13px] font-bold" style={{ borderColor: mid, color: mid }}>
                Découvrir nos services
              </span>
            )}
          </div>
          <p className={cn("font-medium text-[#536273]", compact ? "mt-2.5 text-[10px]" : "mt-3 text-[12px]")}>
            Particuliers · Installation · Dépannage · Rénovation
          </p>
        </div>

        {!compact && (
          <div className="relative overflow-hidden rounded-[1.25rem] shadow-[0_24px_40px_-28px_rgba(0,45,114,.55)]">
            <div className="aspect-[5/4] bg-gradient-to-br from-[#D7F0FB] via-[#F7FBFD] to-[#BFE6F7]">
              <div className="absolute inset-0 flex items-end justify-center pb-6">
                <div className="h-[72%] w-[78%] rounded-t-[40%] bg-white/70 shadow-inner" />
              </div>
              <div className="absolute left-3 bottom-10 rounded-xl border border-white/70 bg-white/95 px-3 py-2 shadow-md">
                <p className="text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: mid }}>
                  Intervention
                </p>
                <p className="text-[12px] font-bold" style={{ color: navy }}>
                  Dépannage plomberie
                </p>
              </div>
              <div className="absolute right-3 top-8 rounded-xl px-3 py-2 text-white shadow-md" style={{ background: navy }}>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: sky }}>
                  Devis
                </p>
                <p className="text-[12px] font-bold">Demander une intervention</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={cn("grid gap-2.5 bg-white", compact ? "grid-cols-1 px-3 pt-1" : "grid-cols-3 px-8 pt-1")}>
        {s.services.map((x, i) => (
          <div key={x.t} className={cn("rounded-xl border border-[#E4EBF1] bg-[#F8FBFD]", compact ? "flex items-center gap-2.5 p-2.5" : "p-3")}>
            <div className={cn("shrink-0 rounded-xl text-white", compact ? "size-7 p-1.5" : "mb-2 size-8 p-1.5")} style={{ background: sky, color: navy }}>
              <ServiceIcon i={i} />
            </div>
            <div>
              <div className={cn("font-bold", compact ? "text-[12px]" : "text-[13.5px]")} style={{ color: navy }}>
                {x.t}
              </div>
              <div className={cn("text-[#536273]", compact ? "text-[10px] leading-snug" : "mt-0.5 text-[11.5px] leading-snug")}>{x.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex items-center justify-between text-white",
          compact ? "px-3 py-2.5 text-[10px]" : "px-8 py-3 text-[12px]",
        )}
        style={{ background: navy }}
      >
        <span>
          Zone indicative · {s.zone}
        </span>
        {!compact && <span className="text-white/70">{s.mail}</span>}
        <span className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ background: yellow, color: navy }}>
          Contact
        </span>
      </div>
    </div>
  );
}

/* --------------------------- Comparateur --------------------------- */

function Compare({ width, height, before, after, className }: { width: number; height: number; before: ReactNode; after: ReactNode; className?: string }) {
  const pos = useMotionValue(50);
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const left = useTransform(pos, (p) => `${p}%`);
  const box = useRef<HTMLDivElement>(null);
  const anim = useRef<ReturnType<typeof animate> | null>(null);
  const dragging = useRef(false);
  const touched = useRef(false);
  const inView = useInView(box, { margin: "-80px" });

  useEffect(() => {
    if (!inView || touched.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    anim.current = animate(pos, [50, 28, 72, 50], { duration: 9, ease: "easeInOut", repeat: Infinity });
    return () => anim.current?.stop();
  }, [inView, pos]);

  const setFromX = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  const onDown = (e: ReactPointerEvent) => {
    touched.current = true;
    anim.current?.stop();
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromX(e.clientX);
  };
  const onMove = (e: ReactPointerEvent) => dragging.current && setFromX(e.clientX);
  const onUp = () => (dragging.current = false);
  const onKey = (e: ReactKeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    touched.current = true;
    anim.current?.stop();
    pos.set(Math.min(100, Math.max(0, pos.get() + (e.key === "ArrowLeft" ? -5 : 5))));
  };

  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-between gap-3 text-xs">
        <span className="rounded-full bg-[#1a1a1a] px-3 py-1.5 font-bold uppercase tracking-wider text-white ring-1 ring-white/30">Avant</span>
        <span className="text-center text-mist/80">Faites glisser pour comparer</span>
        <span className="rounded-full bg-sky px-3 py-1.5 font-bold uppercase tracking-wider text-[#050505]">Après</span>
      </div>
      <ScaledStage width={width} height={height} interactive>
        <div
          ref={box}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onKeyDown={onKey}
          tabIndex={0}
          role="group"
          aria-label="Comparaison avant et après refonte du même site de plombier. Utilisez les flèches gauche et droite ou faites glisser pour comparer."
          style={{ touchAction: "pan-y" }}
          className="absolute inset-0 cursor-ew-resize select-none overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)]"
        >
          <div className="absolute inset-0">{after}</div>
          <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
            {before}
          </motion.div>

          <motion.div className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-sky shadow-[0_0_18px_rgba(85,189,242,.9)]" style={{ left }}>
            <div className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sky/70 bg-[#050505] text-sky shadow-[0_0_24px_rgba(85,189,242,.55)]">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
              </svg>
            </div>
          </motion.div>
        </div>
      </ScaledStage>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <div>
      <Compare className="hidden md:block" width={1000} height={560} before={<OldSite />} after={<NewSite />} />
      <Compare className="md:hidden" width={400} height={640} before={<OldSite compact />} after={<NewSite compact />} />
    </div>
  );
}
