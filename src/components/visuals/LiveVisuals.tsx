"use client";

import { animate, AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { projects } from "@/data/projects";
import type { ServiceId } from "@/data/services";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { cn, ease } from "@/lib/utils";

/** Le texte s'écrit lettre après lettre. */
function useTyped(text: string, run: boolean, speed = 40) {
  const calm = useCalmMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run || calm) return;
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) clearInterval(id);
        return Math.min(v + 1, text.length);
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, run, calm, speed]);
  return calm ? text : text.slice(0, n);
}

const Caret = ({ on }: { on: boolean }) => (on ? <span aria-hidden className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 animate-pulse bg-sky" /> : null);

/* ---------- Création de site : vos vrais sites, sur ordinateur et sur téléphone ---------- */

const DEMOS = ["solea-restaurant", "calyra-hotel", "azur-plomberie", "orea-drive"].map((slug) => projects.find((p) => p.slug === slug)!).filter(Boolean);
const shortName = (name: string) => name.split(" ")[0].charAt(0) + name.split(" ")[0].slice(1).toLowerCase();

function WebLive() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { amount: 0.3 });
  const calm = useCalmMotion();
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (!seen || held || calm) return;
    const id = setInterval(() => setI((v) => (v + 1) % DEMOS.length), 7000);
    return () => clearInterval(id);
  }, [seen, held, calm]);
  const p = DEMOS[i];
  const to = `${-(1 - (p.images.desktop.width * 10) / 16 / p.images.desktop.height) * 100}%`;
  const toM = `${-(1 - ((p.images.mobile.width * 18) / 9) / p.images.mobile.height) * 100}%`;

  return (
    <div ref={ref} onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}>
      <div role="group" aria-label="Choisir un site à regarder" className="flex flex-wrap gap-2">
        {DEMOS.map((d, k) => (
          <button key={d.slug} type="button" aria-pressed={k === i} onClick={() => { setI(k); setHeld(true); }} className={cn("min-h-10 rounded-full border px-4 text-sm font-bold transition-colors", k === i ? "border-sky bg-sky text-ink" : "border-white/20 text-white hover:border-white")}>
            {shortName(d.name)}
          </button>
        ))}
      </div>
      <div className="relative mt-4 pb-6 pr-[9%]">
        <BrowserFrame url={`${p.name.toLowerCase()} · site de démonstration`}>
          <div className="relative aspect-[16/10] overflow-hidden bg-ink-3">
            <AnimatePresence initial={false}>
              <motion.div key={p.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                <Image src={p.images.desktop.src} alt={`Le site ${p.name}, qui défile`} width={p.images.desktop.width} height={p.images.desktop.height} sizes="(max-width: 1024px) 86vw, 640px" className="nx-pan block h-auto w-full" style={{ ["--to" as string]: to }} />
              </motion.div>
            </AnimatePresence>
          </div>
        </BrowserFrame>
        <div className="absolute bottom-0 right-0 w-[24%] overflow-hidden rounded-[1rem] border-[3px] border-black bg-ink shadow-[0_24px_50px_-10px_rgba(0,0,0,.9)] sm:rounded-[1.4rem] sm:border-4">
          <div className="relative aspect-[9/18] overflow-hidden">
            <Image key={p.slug} src={p.images.mobile.src} alt="" width={p.images.mobile.width} height={p.images.mobile.height} sizes="180px" className="nx-pan block h-auto w-full" style={{ ["--to" as string]: toM }} />
          </div>
        </div>
      </div>
      <p className="mt-3 max-w-[72%] text-sm leading-relaxed text-mist">{p.summary}</p>
      <Link href={`/realisations/${p.slug}`} className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-sky">
        Voir ce projet <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

/* ---------- Refonte : le même artisan, avant et après ---------- */

function OldSite() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-[#ece8d8] font-serif text-[#222] [container-type:inline-size]">
      <div className="bg-gradient-to-b from-[#2f5f9e] to-[#1b3d73] px-[2cqw] py-[1.4cqw]">
        <p className="text-[4.2cqw] font-bold leading-none text-[#f6ec9a]">AZUR PLOMBERIE</p>
        <p className="mt-[0.6cqw] text-[1.7cqw] text-white">Bienvenue sur notre site !!!</p>
      </div>
      <div className="flex gap-[1.6cqw] bg-[#c9c2a5] px-[2cqw] py-[0.8cqw] text-[1.6cqw] text-[#00c] underline">
        <span>Accueil</span><span>Services</span><span>Salle de bain</span><span>A propos</span><span>Contact</span>
      </div>
      <div className="flex gap-[1.6cqw] p-[2cqw]">
        <div className="w-[24%] shrink-0 space-y-[1.2cqw]">
          <div className="border border-[#888] bg-white p-[1cqw] text-[1.45cqw] leading-snug">
            <p className="font-bold text-[#a00]">Actualités</p>
            <p className="text-[#00c] underline">Nouveau : site mis à jour</p>
            <p className="text-[#00c] underline">Fermeture annuelle</p>
          </div>
          <div className="border-2 border-dashed border-[#a00] bg-[#ff9] p-[1cqw] text-center text-[1.7cqw] font-bold text-[#a00]">PROMO !!!</div>
          <div className="border border-[#888] bg-white p-[0.8cqw] text-[1.3cqw]">Visiteurs : 004 521</div>
        </div>
        <div className="min-w-0 flex-1 border border-[#888] bg-white p-[1.6cqw]">
          <p className="text-[3cqw] font-bold leading-tight text-[#a00]">Votre plombier de confiance</p>
          <p className="mt-[0.8cqw] text-[1.6cqw] leading-snug">Du dépannage à la rénovation complète de votre salle de bain, nous vous accompagnons avec des solutions adaptées à vos besoins.</p>
          <table className="mt-[1.2cqw] w-full border-collapse text-[1.4cqw]"><tbody>
            <tr><td className="border border-[#888] bg-[#ddd] p-[0.6cqw] font-bold">Dépannage</td><td className="border border-[#888] bg-[#ddd] p-[0.6cqw] font-bold">Installation</td></tr>
            <tr><td className="border border-[#888] p-[0.6cqw]">Fuite, robinet, canalisation</td><td className="border border-[#888] p-[0.6cqw]">Sanitaires, chauffe-eau</td></tr>
          </tbody></table>
          <p className="mx-auto mt-[1.4cqw] w-fit border-2 border-[#600] bg-[#c00] px-[1.6cqw] py-[0.7cqw] text-[1.7cqw] font-bold text-white">CLIQUEZ ICI POUR UN DEVIS !</p>
          <p className="mt-[1.6cqw] text-[1.5cqw] leading-snug">Nous intervenons sur Saint-Raphaël et ses environs. N&apos;hésitez pas à nous contacter pour tout renseignement.</p>
          <p className="mt-[0.8cqw] text-[1.5cqw] text-[#00c] underline">Voir nos photos de chantiers (fichier à télécharger)</p>
        </div>
      </div>
      <p className="mx-[2cqw] border-t border-[#888] pt-[0.8cqw] text-center text-[1.3cqw] text-[#555]">Dernière mise à jour : 12/03/2009. Site optimisé pour Internet Explorer 6, en 1024 × 768.</p>
    </div>
  );
}

function RedesignLive() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const calm = useCalmMotion();
  const [x, setX] = useState(50);
  const touched = useRef(false);
  // Le curseur se montre une fois de lui-même, pour montrer qu'on peut le déplacer.
  useEffect(() => {
    if (!seen || calm) return;
    const c = animate(50, [18, 82, 50], { duration: 3.4, ease: "easeInOut", onUpdate: (v: number) => { if (!touched.current) setX(v); } });
    return () => c.stop();
  }, [seen, calm]);

  return (
    <div ref={ref}>
      <BrowserFrame url="azur-plomberie · avant et après la refonte">
        <div className="relative aspect-[1400/891] overflow-hidden bg-ink-3">
          <OldSite />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${x}%)` }}>
            <Image src="/projects/azur-cover.webp" alt="Le même artisan après la refonte : un site clair, avec deux boutons, urgence ou projet" fill sizes="(max-width: 1024px) 92vw, 1024px" className="object-cover object-top" />
          </div>
          <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-black/80 px-3 py-1 text-xs font-bold text-white sm:bottom-3 sm:left-3">Avant</span>
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-sky px-3 py-1 text-xs font-bold text-ink sm:bottom-3 sm:right-3">Après</span>
          <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${x}%` }}>
            <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-xl">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="m9 6-5 6 5 6M15 6l5 6-5 6" /></svg>
            </span>
          </div>
          <input type="range" min={0} max={100} value={Math.round(x)} onChange={(e) => { touched.current = true; setX(Number(e.target.value)); }} aria-label="Comparer le site avant et après la refonte" className="absolute inset-0 size-full cursor-ew-resize opacity-0" />
        </div>
      </BrowserFrame>
      <p className="mt-3 text-center text-sm font-semibold text-white">Faites glisser pour comparer le même artisan, avant et après.</p>
      <p className="mt-1 text-center text-xs text-mist">Azur Plomberie est une entreprise fictive, créée pour nos démonstrations.</p>
    </div>
  );
}

/* ---------- SEO : ce que vos futurs clients lisent dans les résultats de recherche ---------- */

const SNIPPETS = {
  avant: { title: "Accueil | Mon site", text: "Bienvenue sur notre site. Cliquez ici pour en savoir plus.", links: [] as string[] },
  apres: { title: "Plombier à Saint-Raphaël : dépannage et fuites | Azur Plomberie", text: "Fuite, chauffe-eau, salle de bain. Le prix est annoncé avant les travaux. Du lundi au samedi, de 8 h à 19 h.", links: ["Dépannage", "Recherche de fuite", "Secteur"] },
};
const IMPROVED = ["Un titre qui dit ce que vous faites", "Votre ville et vos services", "Une raison de cliquer"];

function Result({ title, url, text, muted }: { title: string; url: string; text: string; muted?: boolean }) {
  return (
    <div className={muted ? "opacity-45" : undefined}>
      <p className="text-xs text-mist">{url}</p>
      <p className="mt-0.5 text-[15px] font-bold leading-snug text-sky sm:text-[17px]">{title}</p>
      <p className="mt-0.5 text-[13px] leading-relaxed text-mist sm:text-sm">{text}</p>
    </div>
  );
}

export function SeoLive() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { amount: 0.3 });
  const calm = useCalmMotion();
  const query = useTyped("plombier saint-raphaël fuite", seen);
  const typed = query.length >= 28;
  const [mode, setMode] = useState<"avant" | "apres">("avant");
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (!typed || held || calm) return;
    const id = setInterval(() => setMode((m) => (m === "avant" ? "apres" : "avant")), 4200);
    return () => clearInterval(id);
  }, [typed, held, calm]);
  const shown = calm ? "apres" : mode;
  const s = SNIPPETS[shown];
  const after = shown === "apres";

  return (
    <div ref={ref}>
      <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.05] px-5 py-3 text-[15px] text-white">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="size-4 shrink-0 text-mist"><circle cx="9" cy="9" r="6" /><path d="m14 14 4 4" /></svg>
        <span className="min-h-[1.4em] truncate">{query}<Caret on={!typed && !calm} /></span>
      </div>

      <div role="group" aria-label="Comparer le résultat" className="mt-4 inline-flex rounded-full border border-white/15 p-1 text-sm font-bold">
        {(["avant", "apres"] as const).map((m) => (
          <button key={m} type="button" aria-pressed={shown === m} onClick={() => { setHeld(true); setMode(m); }} className={cn("min-h-9 rounded-full px-4 transition-colors", shown === m ? "bg-sky text-ink" : "text-white hover:bg-white/10")}>
            {m === "avant" ? "Avant" : "Après notre travail"}
          </button>
        ))}
      </div>

      <div className="mt-3 min-h-[148px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:min-h-[132px] sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={shown} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.28, ease }}>
            <Result title={s.title} url="azur-plomberie.fr" text={s.text} />
            {s.links.length > 0 && (
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-semibold text-white">
                {s.links.map((l) => <span key={l} className="underline underline-offset-2">{l}</span>)}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <ul className="mt-4 space-y-2">
        {IMPROVED.map((t, i) => (
          <li key={t} className={cn("flex items-center gap-2.5 text-[15px] transition-colors duration-500", after ? "text-white" : "text-white/40")} style={{ transitionDelay: after ? `${i * 120}ms` : "0ms" }}>
            <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full transition-all duration-500", after ? "scale-100 bg-sky text-ink" : "scale-75 bg-white/10 text-transparent")} style={{ transitionDelay: after ? `${i * 120}ms` : "0ms" }}>
              <Check className="size-3" strokeWidth={3} />
            </span>
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-mist">Exemple sur notre site de démonstration. Aucune position dans les résultats ne peut être garantie.</p>
    </div>
  );
}

/* ---------- GEO : quand un client pose la question à une IA ---------- */

const QUESTION = "Qui peut réparer une fuite à Saint-Raphaël ?";
const ANSWER = "D'après son site, Azur Plomberie est un artisan installé à Saint-Raphaël. Il s'occupe des fuites, du dépannage et des chauffe-eau, et intervient aussi à Fréjus. Il conseille de fermer d'abord le robinet d'arrêt le plus proche.";
const READ = ["Son métier", "Sa ville", "Ses services", "Ses conseils"];

export function GeoLive() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { amount: 0.3 });
  const calm = useCalmMotion();
  const [run, setRun] = useState(0);
  const question = useTyped(QUESTION, seen && run >= 0, 34);
  const asked = question.length >= QUESTION.length;
  const words = ANSWER.split(" ");
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!asked || calm) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      id = setInterval(() => setN((v) => (v >= words.length ? v : v + 1)), 75);
    }, 800);
    return () => { clearTimeout(start); if (id) clearInterval(id); };
  }, [asked, calm, run, words.length]);
  const shown = calm ? words.length : n;
  const done = shown >= words.length;

  return (
    <div ref={ref}>
      <div className="flex min-h-[46px] justify-end">
        <p className="max-w-[86%] rounded-2xl rounded-br-md bg-sky px-4 py-2.5 text-[15px] font-semibold text-ink">{question}<Caret on={!asked && !calm} /></p>
      </div>
      <div className="mt-3 min-h-[190px] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] p-4 text-[15px] leading-relaxed text-white sm:min-h-[150px] sm:p-5 sm:text-base">
        {asked && shown === 0 && !calm ? (
          <span aria-label="L'assistant répond" className="flex h-6 items-center gap-1.5">
            {[0, 1, 2].map((d) => <motion.span key={d} animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }} className="size-2 rounded-full bg-sky" />)}
          </span>
        ) : (
          <p>{words.slice(0, shown).join(" ")}</p>
        )}
        <AnimatePresence>
          {done && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 inline-flex items-center gap-2 rounded-full border border-sky/40 px-3 py-1 text-xs font-bold text-sky">
              Source : le site d&apos;Azur Plomberie
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-4 text-sm font-bold text-white">Ce que l&apos;assistant a pu comprendre</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {READ.map((t, i) => {
          const on = shown >= ((i + 1) / READ.length) * words.length;
          return (
            <li key={t} className={cn("rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-all duration-500", on ? "border-sky bg-sky/15 text-white" : "border-white/15 text-white/40")}>{t}</li>
          );
        })}
      </ul>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-md text-xs leading-relaxed text-mist">Exemple fictif. Aucune citation par une IA ne peut être garantie.</p>
        {!calm && done && (
          <button type="button" onClick={() => { setN(0); setRun((r) => r + 1); }} className="text-sm font-bold text-sky underline underline-offset-4">Revoir la réponse</button>
        )}
      </div>
    </div>
  );
}

const panels: Record<ServiceId, () => ReactNode> = {
  "creation-web": WebLive,
  "design-ux": RedesignLive,
  seo: SeoLive,
  geo: GeoLive,
};

/** Une démonstration vivante par service, avec de vrais textes et de vrais sites. */
export function LiveService({ id }: { id: ServiceId }) {
  const Panel = panels[id];
  return <Panel />;
}
