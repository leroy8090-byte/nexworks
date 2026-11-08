"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { animPhoto, animSrcSet } from "./data";
import { MaskWords } from "./Words";

type Phase = "wait" | "letters" | "zoom" | "settle" | "fade" | "done";

const WORD = ["M", "A", "É", "R", "I", "V", "A"];
const ZOOM_AT = 4; // le I : son fût plein sert de porte d'entrée dans la photo
const T = { letters: 1350, zoom: 1100, settle: 950, fade: 600 };
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Animation 1 : « le golfe à travers le nom » (reprise de l'intro du site MAÉRIVA).
 * Les lettres laissent voir la photo (calque blanc en mode « screen » : le noir y devient transparent),
 * on plonge dans le I, la photo se range dans le cadre de la page d'accueil puis s'efface sur la villa.
 * Le zoom est recalculé à chaque image pour garder des bords nets.
 */
export function GolfeNom({ onDone, preview = false }: { onDone: () => void; /** Aperçu dans une carte : pas de titre principal (h1) */ preview?: boolean }) {
  const [phase, setPhase] = useState<Phase>("wait");
  const stage = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const pivot = useRef<HTMLSpanElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const st = stage.current, img = photo.current, w = word.current, iEl = pivot.current, fr = frame.current;
    if (!st || !img || !w || !iEl || !fr) return;
    let alive = true, raf = 0;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(() => alive && fn(), ms));

    // Dans un aperçu réduit (carte), les mesures à l'écran sont à l'échelle k : on les ramène aux pixels de la scène.
    const scaleOf = () => st.getBoundingClientRect().width / st.offsetWidth || 1;

    const zoom = () => {
      const k = scaleOf(), r = w.getBoundingClientRect(), p = iEl.getBoundingClientRect();
      const size = parseFloat(getComputedStyle(w).fontSize);
      // centre du fût : la largeur de la lettre comprend l'espacement qui la suit (0,06 em)
      w.style.transformOrigin = `${(p.left - r.left) / k + (p.width / k - size * 0.06) / 2}px ${(p.top - r.top + p.height * 0.55) / k}px`;
      const max = (Math.hypot(st.offsetWidth, st.offsetHeight) * 1.25) / (size * 0.03);
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / T.zoom);
        w.style.transform = `scale(${Math.pow(max, ease(t))})`;
        if (veil.current) veil.current.style.opacity = String(Math.min(1, (1 - t) / 0.12)); // sur la fin, le blanc s'efface
        if (t < 1) raf = requestAnimationFrame(step); else settle();
      };
      setPhase("zoom");
      raf = requestAnimationFrame(step);
    };

    // La photo plein écran se range dans le cadre de la page d'accueil
    const settle = () => {
      const k = scaleOf(), s = st.getBoundingClientRect(), f = fr.getBoundingClientRect();
      const curve = "cubic-bezier(0.76,0,0.24,1)";
      img.style.transition = ["left", "top", "width", "height"].map((k) => `${k} ${T.settle}ms ${curve}`).join(", ");
      Object.assign(img.style, { left: `${(f.left - s.left) / k}px`, top: `${(f.top - s.top) / k}px`, width: `${f.width / k}px`, height: `${f.height / k}px` });
      setPhase("settle");
      later(() => { setPhase("fade"); later(() => { setPhase("done"); done.current(); }, T.fade); }, T.settle);
    };

    const fontsReady = document.fonts ? document.fonts.load(`600 100px ${getComputedStyle(w).fontFamily}`).catch(() => null) : Promise.resolve();
    const photoReady = img.decode().catch(() => undefined);
    // Photo déjà en cache : son chargement peut ne jamais se signaler ; on n'attend jamais plus de 2,5 s
    const cap = new Promise<void>((ok) => window.setTimeout(ok, 2500));
    Promise.race([Promise.all([photoReady, fontsReady]), cap]).then(() => {
      if (!alive) return;
      later(() => { setPhase("letters"); later(zoom, T.letters + 150); }, 250);
    });
    return () => { alive = false; cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, []);

  const landing = phase === "settle" || phase === "fade" || phase === "done";
  const late = landing;
  const Title = preview ? "p" : "h1";
  return (
    <div ref={stage} className="anx-scene">
      {/* La page d'accueil, derrière */}
      <div data-show={landing ? "" : undefined} className="absolute inset-0 flex flex-col">
        <header className="anx-drop flex h-[76px] shrink-0 items-center justify-between px-5 @min-[640px]:px-10 @min-[1024px]:px-16">
          <span className="anx-serif text-[1.3rem] tracking-[0.22em] text-[#141619]">MAÉRIVA</span>
          <nav className="anx-caps hidden gap-9 text-[10px] text-[#141619] @min-[1024px]:flex"><span>Propriétés</span><span>Destinations</span><span>Vendre</span><span>L&apos;agence</span></nav>
          <span className="anx-caps bg-[#141619] px-5 py-3 text-[10px] text-white">Rendez-vous</span>
        </header>
        <div className="grid min-h-0 flex-1 content-start items-center gap-8 px-5 pt-6 @min-[640px]:px-10 @min-[1024px]:grid-cols-2 @min-[1024px]:content-center @min-[1024px]:gap-16 @min-[1024px]:px-16 @min-[1024px]:pt-0">
          <div>
            <p className="anx-fade anx-caps text-[#a68a56]" style={{ "--d": "100ms" } as CSSProperties}>Golfe de Saint-Tropez</p>
            <Title className="anx-serif mt-5 text-[2.7rem] leading-[1.04] text-[#141619] @min-[640px]:text-[4.4rem] @min-[1280px]:text-[5.4rem]">
              <MaskWords text="Les plus belles maisons du golfe, en toute *discrétion.*" start={150} step={70} accent="text-[#7d6538]" />
            </Title>
            <p className="anx-fade mt-6 hidden max-w-md text-[15px] leading-[1.8] text-[#6b6f76] @min-[640px]:block" style={{ "--d": "550ms" } as CSSProperties}>
              Villas face à la mer, bastides au milieu des vignes, maisons de village. À vendre, ou pour l&apos;été.
            </p>
            <div className="anx-fade mt-8 flex flex-wrap gap-3" style={{ "--d": "700ms" } as CSSProperties}>
              <span className="anx-caps bg-[#141619] px-6 py-4 text-[10px] text-white">Voir les propriétés →</span>
              <span className="anx-caps border border-[#141619]/25 px-6 py-4 text-[10px] text-[#141619]">Estimer ma propriété</span>
            </div>
          </div>
          <div ref={frame} className="relative aspect-[4/5] w-full overflow-hidden bg-[#f7f5f1] @min-[1024px]:h-[min(74cqh,640px)] @min-[1024px]:w-auto @min-[1024px]:justify-self-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={animPhoto("villa-moderne", 1280)} srcSet={animSrcSet("villa-moderne")} sizes="(min-width:1024px) 45vw, 100vw" alt="Villa contemporaine blanche sur une colline face à la mer"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1800ms] ease-out" style={{ transform: phase === "fade" || phase === "done" ? "none" : "scale(1.06)" }} />
          </div>
        </div>
      </div>

      {/* L'introduction, par-dessus */}
      {phase !== "done" && (
        <div aria-hidden className={`absolute inset-0 z-50 isolate overflow-hidden ${late ? "pointer-events-none" : "bg-white"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={photo} src={animPhoto("ponche-aerien")} srcSet={animSrcSet("ponche-aerien")} sizes="100vw" alt="" decoding="async"
            className={`absolute object-cover transition-opacity duration-[600ms] ease-out ${phase === "fade" ? "opacity-0" : ""}`}
            style={{ left: 0, top: 0, width: "100%", height: "100%" }} />
          <div ref={veil} className={`absolute inset-0 grid place-items-center bg-white mix-blend-screen ${late ? "hidden" : ""}`}>
            <div ref={word} className="anx-word anx-serif whitespace-nowrap font-semibold leading-none" data-on={phase === "wait" ? undefined : ""}>
              {WORD.map((l, i) => (
                <span key={i} ref={i === ZOOM_AT ? pivot : undefined} className="anx-letter inline-block" style={{ "--i": i } as CSSProperties}>{l}</span>
              ))}
            </div>
          </div>
          <p className={`anx-place anx-caps pointer-events-none absolute inset-x-0 text-center tracking-[0.42em] text-[#141619]/70 transition-opacity duration-300 ${phase === "letters" ? "opacity-100" : "opacity-0"}`}>Golfe de Saint-Tropez</p>
        </div>
      )}
    </div>
  );
}
