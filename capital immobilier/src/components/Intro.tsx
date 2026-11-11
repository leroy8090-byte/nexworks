"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const SEEN = "capital-intro";
const PHOTO = "/media/massif-esterel"; // la même photo que l'accueil : à la fin de la plongée, la page est déjà là, rien ne saute
const WORD = ["C", "A", "P", "I", "T", "A", "L"];
const ZOOM_AT = 3; // le I : son fût plein sert de porte d'entrée dans la photo
const SPACING = 0.02; // espacement final des lettres (em), voir globals.css

/**
 * Décision prise avant l'affichage, dans le <head> : l'ouverture ne se joue que sur l'accueil, une seule fois par visite
 * (ou avec ?intro dans l'adresse), jamais si le visiteur a demandé moins d'animations ou économise ses données.
 * Elle pose data-intro="1" sur <html> (le site reste sous un voile blanc) et précharge la photo.
 */
export const INTRO_SCRIPT = `(function(){try{var d=document.documentElement,q=location.search.indexOf("intro")>-1;if(location.pathname==="/"&&(q||!sessionStorage.getItem("${SEEN}"))&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!(navigator.connection&&navigator.connection.saveData)){d.dataset.intro="1";var l=document.createElement("link");l.rel="preload";l.as="image";l.href="${PHOTO}-1920.webp";l.setAttribute("imagesrcset","${PHOTO}-1280.webp 1280w, ${PHOTO}-1920.webp 1920w");l.setAttribute("imagesizes","100vw");document.head.appendChild(l);setTimeout(function(){if(d.dataset.intro==="1")delete d.dataset.intro},10000)}}catch(e){}})()`;

type Phase = "off" | "ready" | "letters" | "zoom" | "fade" | "leaving";

// Durées en millisecondes
const T = { letters: 1350, zoom: 1100, fade: 650 };
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Ouverture « le golfe à travers le nom » (environ 3,5 s) :
 * 1. sur fond blanc, les lettres de CAPITAL se resserrent et laissent voir la photo de l'Estérel à travers elles ;
 * 2. le nom grandit en plongeant dans le I jusqu'à ce que la photo remplisse l'écran ;
 * 3. c'est exactement la photo de l'accueil : le voile s'efface, le titre monte, la page prend la main.
 *
 * Tout en code (aucune vidéo). Effet de découpe : un calque blanc en mode « screen », le noir des lettres y devient
 * transparent. Le zoom est recalculé à chaque image. Garde-fous : bouton « Passer », touche Échap, abandon si la photo
 * ou la police tardent, reprise de la main quoi qu'il arrive après 9 s.
 */
export function Intro() {
  const [phase, setPhase] = useState<Phase>("off");
  const photo = useRef<HTMLImageElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const pivot = useRef<HTMLSpanElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (document.documentElement.dataset.intro === "1") setPhase("ready");
  }, []);

  const started = phase !== "off";
  useEffect(() => {
    const img = photo.current, w = word.current, iEl = pivot.current;
    if (!started || !img || !w || !iEl) return;
    const root = document.documentElement;
    try { sessionStorage.setItem(SEEN, "1"); } catch { /* stockage indisponible : rien de grave */ }
    let done = false, alive = true, raf = 0;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(() => alive && fn(), ms));

    // « Passer », Échap ou contretemps : simple fondu, la page fait son entrée habituelle.
    const skip = () => {
      if (done) return; done = true;
      cancelAnimationFrame(raf);
      delete root.dataset.intro;
      setPhase("leaving");
      later(() => setPhase("off"), 600);
    };
    skipRef.current = skip;

    // Le zoom : le nom grandit autour du I ; l'échelle progresse de façon exponentielle (vitesse perçue régulière).
    const zoom = () => {
      const r = w.getBoundingClientRect(), p = iEl.getBoundingClientRect();
      const size = parseFloat(getComputedStyle(w).fontSize);
      // centre du fût : la largeur de la lettre comprend l'espacement qui la suit
      const ox = p.left + (p.width - size * SPACING) / 2 - r.left, oy = p.top + p.height * 0.55 - r.top;
      w.style.transformOrigin = `${ox}px ${oy}px`;
      const stem = size * 0.1; // épaisseur du fût du I, comptée un peu en dessous du réel : on va plus loin que nécessaire
      const max = (Math.hypot(window.innerWidth, window.innerHeight) * 1.25) / stem;
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / T.zoom);
        w.style.transform = `scale(${Math.pow(max, ease(t))})`;
        if (veil.current) veil.current.style.opacity = String(Math.min(1, (1 - t) / 0.12)); // sur la fin, le blanc s'efface : plus aucun bord
        if (t < 1) raf = requestAnimationFrame(step); else fade();
      };
      setPhase("zoom");
      raf = requestAnimationFrame(step);
    };

    // La photo plein écran est celle de l'accueil : elle s'efface dessus, le titre monte, la photo de l'accueil se pose.
    const fade = () => {
      if (done) return; done = true;
      root.dataset.intro = "2"; // le titre et les boutons de l'accueil font leur entrée
      setPhase("fade");
      later(() => { delete root.dataset.intro; setPhase("off"); }, T.fade);
    };

    // On attend la photo et la police, sans jamais faire patienter plus de 2,5 s.
    const fontsReady = document.fonts ? document.fonts.load(`800 100px ${getComputedStyle(w).fontFamily}`).catch(() => null).then(() => document.fonts.ready) : Promise.resolve();
    const photoReady = img.complete && img.naturalWidth ? Promise.resolve() : new Promise<void>((ok, ko) => { img.onload = () => ok(); img.onerror = () => ko(); });
    const failsafe = window.setTimeout(skip, 2500);
    Promise.all([photoReady, fontsReady]).then(() => {
      window.clearTimeout(failsafe);
      if (done || !alive) return;
      setPhase("letters");
      later(zoom, T.letters + 150);
    }, skip);

    const hardStop = window.setTimeout(skip, 9000);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && skip();
    window.addEventListener("keydown", esc);
    return () => {
      alive = false; cancelAnimationFrame(raf); timers.forEach(clearTimeout); window.clearTimeout(failsafe); window.clearTimeout(hardStop);
      window.removeEventListener("keydown", esc);
    };
  }, [started]);

  // Rendue directement dans <body>, au-dessus de tout le site (en-tête compris).
  if (phase === "off") return null;
  const late = phase === "fade";
  return createPortal(
    <div className={`fixed inset-0 z-[300] isolate overflow-hidden transition-opacity duration-500 ${phase === "leaving" ? "opacity-0" : ""} ${late ? "pointer-events-none" : "bg-white"}`}>
      {/* La photo : derrière le calque blanc, puis seule à l'écran. Légèrement agrandie, comme la photo de l'accueil à son arrivée. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={photo} src={`${PHOTO}-1920.webp`} srcSet={`${PHOTO}-1280.webp 1280w, ${PHOTO}-1920.webp 1920w`} sizes="100vw" alt="" aria-hidden decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[650ms] ease-out ${late ? "opacity-0" : ""}`}
        style={{ transform: "scale(1.08)" }} />

      {/* Le calque blanc : le noir des lettres y devient transparent et laisse voir la photo */}
      <div ref={veil} aria-hidden className={`absolute inset-0 grid place-items-center bg-white mix-blend-screen ${late ? "hidden" : ""}`}>
        <div ref={word} className="intro-word whitespace-nowrap font-extrabold leading-none [font-family:var(--font-cap-display)]" data-on={phase === "ready" ? undefined : ""}>
          {WORD.map((l, i) => (
            <span key={i} ref={i === ZOOM_AT ? pivot : undefined} className="intro-letter inline-block" style={{ "--i": i } as React.CSSProperties}>{l}</span>
          ))}
        </div>
      </div>

      {/* La suite du nom, sous les lettres ; elle s'efface avant la plongée */}
      <p aria-hidden className={`intro-place pointer-events-none absolute inset-x-0 text-center text-[11px] font-semibold uppercase tracking-[0.42em] text-night/70 transition-opacity duration-300 ${phase === "letters" ? "opacity-100" : "opacity-0"}`}>Immobilier · Saint-Raphaël</p>

      {!late && (
        <button type="button" onClick={() => skipRef.current()} className="absolute bottom-5 right-5 z-10 inline-flex min-h-11 items-center gap-2 border border-night/20 bg-white/85 px-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-night backdrop-blur-sm transition-colors hover:bg-night hover:text-white sm:bottom-8 sm:right-8">
          Passer <span aria-hidden>→</span>
        </button>
      )}
    </div>,
    document.body,
  );
}
