"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { animPhoto, animSrcSet } from "./data";
import { MaskWords } from "./Words";

type Phase = "wait" | "run" | "open" | "hero" | "done";
type Box = { t: number; r: number; b: number; l: number; w: number; h: number };

/** Les photos du défilé ; la dernière devient la photo plein écran de la page d'accueil. */
const SEQ = [
  { file: "port-voiliers", alt: "Le port de Saint-Tropez et ses voiliers" },
  { file: "piscine-debordement", alt: "Piscine à débordement face à la mer et aux îles" },
  { file: "sejour-vue", alt: "Séjour vitré ouvert sur le paysage" },
  { file: "villa-blanche", alt: "Villa blanche à arcades sous un ciel bleu" },
  { file: "villa-moderne", alt: "Villa contemporaine blanche sur une colline face à la mer" },
];
const LAST = SEQ.length - 1;
const T = { start: 250, every: 400, reveal: 750, open: 1150, heroAfter: 550, end: 4700 };
const CURTAIN = "cubic-bezier(0.76, 0, 0.24, 1)";
const SOFT = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Animation 2 : « le défilé ».
 * Un cadre vertical au centre d'une page blanche ; les photos s'y succèdent, chacune dévoilée de bas en haut
 * (découpe clip-path calculée sur le cadre), pendant qu'un compteur avance de 000 à 100.
 * Le cadre s'ouvre ensuite jusqu'à remplir l'écran sur la dernière photo, qui devient la page d'accueil :
 * le menu descend, le titre monte mot par mot.
 */
export function Defile({ onDone }: { onDone: () => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState<Box | null>(null);
  const [phase, setPhase] = useState<Phase>("wait");
  const [shown, setShown] = useState(0); // nombre de photos dévoilées
  const done = useRef(onDone);
  done.current = onDone;

  // Le cadre : vertical, au centre ; plus large sur téléphone
  useLayoutEffect(() => {
    const s = stage.current?.getBoundingClientRect();
    if (!s) return;
    const w = s.width < 640 ? s.width * 0.56 : Math.min(s.width * 0.2, (s.height * 0.5) / 1.25, 340);
    const h = w * 1.25, l = (s.width - w) / 2, t = (s.height - h) / 2;
    setBox({ t, l, w, h, r: s.width - l - w, b: s.height - t - h });
  }, []);

  useEffect(() => {
    if (!box) return;
    let alive = true, raf = 0;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(() => alive && fn(), ms));
    // On attend les photos (au plus 3 s) pour que le défilé ne saute aucune image
    const ready = Promise.all(SEQ.map((p) => new Promise<void>((ok) => { const i = new Image(); i.srcset = animSrcSet(p.file); i.sizes = "100vw"; i.src = animPhoto(p.file); i.decode().then(ok, ok); })));
    const cap = new Promise<void>((ok) => window.setTimeout(ok, 3000));
    Promise.race([ready, cap]).then(() => {
      if (!alive) return;
      later(() => {
        setPhase("run");
        SEQ.forEach((_, i) => later(() => setShown(i + 1), i * T.every));
        // Le compteur et sa ligne : de 000 à 100, jusqu'à la fin du dernier dévoilement
        const total = LAST * T.every + T.reveal, t0 = performance.now();
        const tick = (now: number) => {
          const k = Math.min(1, (now - t0) / total), v = 1 - Math.pow(1 - k, 2.2);
          if (counter.current) counter.current.textContent = String(Math.round(v * 100)).padStart(3, "0");
          if (bar.current) bar.current.style.transform = `scaleX(${v})`;
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        const openAt = total + 150;
        later(() => setPhase("open"), openAt);
        later(() => setPhase("hero"), openAt + T.heroAfter);
        later(() => { setPhase("done"); done.current(); }, T.end);
      }, T.start);
    });
    return () => { alive = false; cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, [box]);

  const opened = phase === "open" || phase === "hero" || phase === "done";
  const hero = phase === "hero" || phase === "done";
  const px = (b: Box, top: number) => `inset(${top}px ${b.r}px ${b.b}px ${b.l}px)`;

  return (
    <div ref={stage} className="absolute inset-0 bg-white">
      {/* Les photos : chacune découpée sur le cadre, la dernière s'ouvre en plein écran */}
      {box && SEQ.map((p, i) => {
        const on = i < shown, isLast = i === LAST;
        const clip = isLast && opened ? "inset(0px 0px 0px 0px)" : on ? px(box, box.t) : px(box, box.t + box.h);
        const scale = isLast && hero ? 1 : isLast && opened ? 1.05 : on ? 1.18 : 1.4;
        const imgTransition = isLast && hero ? `transform 9000ms ${SOFT}` : isLast && opened ? `transform ${T.open + 300}ms ${CURTAIN}` : `transform 1500ms ${SOFT}`;
        return (
          <div key={p.file} className="absolute inset-0" style={{ clipPath: clip, transition: `clip-path ${isLast && opened ? T.open : T.reveal}ms ${CURTAIN}`, zIndex: i + 1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={animPhoto(p.file)} srcSet={animSrcSet(p.file)} sizes="100vw" alt={isLast ? p.alt : ""} aria-hidden={isLast ? undefined : true}
              className="absolute inset-0 h-full w-full object-cover" style={{ transform: `scale(${scale})`, transition: imgTransition }} />
          </div>
        );
      })}

      {/* Pendant le défilé : la marque, la légende, le compteur et sa ligne sous le cadre */}
      <div aria-hidden className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ${phase === "run" ? "opacity-100" : "opacity-0"}`}>
        <p className="anx-serif absolute inset-x-0 top-7 text-center text-[1.15rem] tracking-[0.42em] text-[#141619]">MAÉRIVA</p>
        {box && <span ref={bar} className="absolute h-px origin-left bg-[#141619]" style={{ left: box.l, top: box.t + box.h + 18, width: box.w, transform: "scaleX(0)" }} />}
        <p className="anx-caps absolute bottom-7 left-5 max-w-[10rem] leading-[1.9] text-[#141619]/70 sm:left-10 sm:max-w-none lg:left-16">Villas d&apos;exception<br />Golfe de Saint-Tropez</p>
        <p className="anx-serif absolute right-5 bottom-4 text-[3.4rem] leading-none font-light text-[#141619] tabular-nums sm:right-10 sm:text-[5.5rem] lg:right-16"><span ref={counter}>000</span></p>
      </div>

      {/* La page d'accueil : voile pour la lisibilité, menu, titre */}
      <div data-show={hero ? "" : undefined} className="absolute inset-0 z-30 flex flex-col text-white">
        <div className={`pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.62),rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.28))] transition-opacity duration-[1200ms] ${hero ? "opacity-100" : "opacity-0"}`} />
        <header className="relative flex h-[84px] shrink-0 items-center justify-between px-5 sm:px-10 lg:px-16">
          <span className="anx-drop anx-serif text-[1.35rem] tracking-[0.22em]">MAÉRIVA</span>
          <nav className="anx-caps hidden gap-9 text-[10px] lg:flex">
            {["Propriétés", "Destinations", "Vendre", "L'agence"].map((l, i) => <span key={l} className="anx-drop" style={{ "--d": `${80 + i * 60}ms` } as CSSProperties}>{l}</span>)}
          </nav>
          <span className="anx-drop anx-caps border border-white/60 px-5 py-3 text-[10px]" style={{ "--d": "320ms" } as CSSProperties}>Rendez-vous</span>
        </header>
        <div className="relative mt-auto flex items-end justify-between gap-10 px-5 pb-24 sm:px-10 sm:pb-16 lg:px-16">
          <div className="max-w-3xl">
            <p className="anx-fade anx-caps text-[#e4d3ad]" style={{ "--d": "100ms" } as CSSProperties}>Golfe de Saint-Tropez</p>
            <h1 className="anx-serif mt-5 text-[3.1rem] leading-[1] sm:text-[5.6rem] xl:text-[7rem]">
              <MaskWords text="L'art de vivre *le golfe.*" start={180} step={90} accent="text-[#e4d3ad]" />
            </h1>
            <p className="anx-fade mt-6 max-w-md text-[15px] leading-[1.8] text-white/85" style={{ "--d": "600ms" } as CSSProperties}>
              Villas face à la mer, bastides au milieu des vignes, maisons de village. À vendre, ou pour l&apos;été.
            </p>
            <div className="anx-fade mt-8 flex flex-wrap gap-3" style={{ "--d": "750ms" } as CSSProperties}>
              <span className="anx-caps bg-white px-6 py-4 text-[10px] text-[#141619]">Voir les propriétés →</span>
              <span className="anx-caps border border-white/50 px-6 py-4 text-[10px]">Estimer ma propriété</span>
            </div>
          </div>
          <div className="anx-fade hidden flex-col items-center gap-4 sm:flex" style={{ "--d": "900ms" } as CSSProperties}>
            <span className="anx-caps text-[9.5px] [writing-mode:vertical-rl]">Défiler</span>
            <span className="relative h-14 w-px overflow-hidden bg-white/25"><span className="anx-scroll-line absolute inset-0 bg-white" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
