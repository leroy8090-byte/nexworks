"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { INTRO_PHOTO } from "@/lib/intro";

type Phase = "off" | "ready" | "letters" | "zoom" | "settle" | "fade" | "leaving";

const WORD = ["M", "A", "É", "R", "I", "V", "A"];
const ZOOM_AT = 4; // le I : son fût plein sert de porte d'entrée dans la photo

// Durées en millisecondes
const T = { letters: 1350, zoom: 1100, settle: 950, fade: 600 };
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Introduction « le golfe à travers le nom » (environ 4 s) :
 * 1. sur fond blanc, les lettres de MAÉRIVA apparaissent et laissent voir la photo de Saint-Tropez à travers elles ;
 * 2. le nom grandit en plongeant dans le I jusqu'à ce que la photo remplisse l'écran ;
 * 3. la photo se range dans le cadre de la photo d'accueil pendant que le titre de la page apparaît ;
 * 4. elle s'efface sur la photo de la villa, qui se pose.
 *
 * Tout en code (aucune vidéo) : net sur tous les écrans, léger sur téléphone.
 * Effet de découpe : un calque blanc en mode « screen » ; le noir des lettres y devient transparent.
 * Le zoom est recalculé à chaque image (pas de calque mis en cache) pour garder des bords nets.
 *
 * Jouée seulement à la première visite de l'accueil pendant la session (ou avec ?intro dans l'adresse),
 * jamais si le visiteur a demandé moins d'animations ou économise ses données : la décision est prise
 * avant l'affichage, dans le <head>, qui pose data-intro sur <html> et précharge la photo.
 * Garde-fous : bouton « Passer », touche Échap, abandon si la photo ou la police tardent.
 */
export function IntroGate({ skipLabel, place }: { skipLabel: string; place: string }) {
  const [phase, setPhase] = useState<Phase>("off");
  const photo = useRef<HTMLImageElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const pivot = useRef<HTMLSpanElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});

  // 1. La décision du <head> : faut-il jouer l'introduction ?
  useEffect(() => {
    if (document.documentElement.dataset.intro === "1") setPhase("ready");
  }, []);

  // 2. Le déroulé
  const started = phase !== "off";
  useEffect(() => {
    const img = photo.current, w = word.current, iEl = pivot.current;
    if (!started || !img || !w || !iEl) return;
    const root = document.documentElement;
    try { sessionStorage.setItem("maeriva:intro", "1"); } catch { /* stockage indisponible : rien de grave */ }
    let done = false, alive = true, raf = 0;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(() => alive && fn(), ms));
    const finish = () => { delete root.dataset.intro; };

    // Bouton « Passer », Échap ou contretemps : simple fondu, la page fait son entrée habituelle.
    const skip = () => {
      if (done) return; done = true;
      cancelAnimationFrame(raf);
      finish();
      setPhase("leaving");
      later(() => setPhase("off"), 600);
    };
    skipRef.current = skip;

    // Le zoom : le nom grandit autour du I, l'échelle progresse de façon exponentielle (vitesse perçue régulière).
    const zoom = () => {
      const r = w.getBoundingClientRect(), p = iEl.getBoundingClientRect();
      const size = parseFloat(getComputedStyle(w).fontSize);
      // centre du fût : la largeur de la lettre comprend l'espacement qui la suit (0,06 em)
      const ox = p.left + (p.width - size * 0.06) / 2 - r.left, oy = p.top + p.height * 0.55 - r.top;
      w.style.transformOrigin = `${ox}px ${oy}px`;
      const stem = size * 0.03; // épaisseur du fût du I, comptée au plus juste : on va un peu plus loin que nécessaire
      const max = (Math.hypot(window.innerWidth, window.innerHeight) * 1.25) / stem;
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / T.zoom);
        w.style.transform = `scale(${Math.pow(max, ease(t))})`;
        if (veil.current) veil.current.style.opacity = String(Math.min(1, (1 - t) / 0.12)); // sur la fin, le blanc s'efface : plus aucun bord
        if (t < 1) raf = requestAnimationFrame(step); else settle();
      };
      setPhase("zoom");
      raf = requestAnimationFrame(step);
    };

    // La photo plein écran se range dans le cadre de la photo d'accueil.
    const settle = () => {
      if (done) return;
      const frame = document.querySelector<HTMLElement>("[data-hero-frame]");
      frame?.setAttribute("data-intro-played", ""); // voir globals.css : pas de voile blanc, la villa se pose sans repartir du blanc
      root.dataset.intro = "2";           // le titre de l'accueil fait son entrée
      setPhase("settle");
      if (!frame) { later(fade, 50); return; }
      const f = frame.getBoundingClientRect();
      img.style.transition = `left ${T.settle}ms cubic-bezier(0.76,0,0.24,1), top ${T.settle}ms cubic-bezier(0.76,0,0.24,1), width ${T.settle}ms cubic-bezier(0.76,0,0.24,1), height ${T.settle}ms cubic-bezier(0.76,0,0.24,1)`;
      Object.assign(img.style, { left: `${f.left}px`, top: `${f.top}px`, width: `${f.width}px`, height: `${f.height}px` });
      later(fade, T.settle);
    };

    // Fondu sur la photo de la villa, qui se pose ; la page est rendue au visiteur.
    const fade = () => {
      if (done) return; done = true;
      delete root.dataset.intro;
      setPhase("fade");
      later(() => setPhase("off"), T.fade);
    };

    // On attend la photo et la police, sans jamais faire patienter plus de 2,5 s.
    const fontsReady = document.fonts ? document.fonts.load(`600 100px ${getComputedStyle(w).fontFamily}`).catch(() => null).then(() => document.fonts.ready) : Promise.resolve();
    const photoReady = img.complete && img.naturalWidth ? Promise.resolve() : new Promise<void>((ok, ko) => { img.onload = () => ok(); img.onerror = () => ko(); });
    const failsafe = window.setTimeout(skip, 2500);
    Promise.all([photoReady, fontsReady]).then(() => {
      window.clearTimeout(failsafe);
      if (done || !alive) return;
      setPhase("letters");
      later(zoom, T.letters + 150);
    }, skip);

    const hardStop = window.setTimeout(skip, 9000); // quoi qu'il arrive, le site reprend la main
    const esc = (e: KeyboardEvent) => e.key === "Escape" && skip();
    window.addEventListener("keydown", esc);
    return () => {
      alive = false; cancelAnimationFrame(raf); timers.forEach(clearTimeout); window.clearTimeout(failsafe); window.clearTimeout(hardStop);
      window.removeEventListener("keydown", esc);
    };
  }, [started]);

  // Rendue directement dans <body>, au-dessus de tout le site (en-tête compris).
  if (phase === "off") return null;
  const shown = phase !== "ready";
  const late = phase === "settle" || phase === "fade";
  return createPortal(
    <div className={`fixed inset-0 z-[100] isolate overflow-hidden transition-opacity duration-500 ${phase === "leaving" ? "opacity-0" : ""} ${late ? "pointer-events-none" : "bg-white"}`}>
      {/* La photo : derrière le calque blanc, puis seule à l'écran, puis rangée dans le cadre de l'accueil */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={photo} src={`${INTRO_PHOTO}-1920.webp`} srcSet={`${INTRO_PHOTO}-1280.webp 1280w, ${INTRO_PHOTO}-1920.webp 1920w`} sizes="100vw" alt="" aria-hidden decoding="async"
        className={`absolute object-cover transition-opacity duration-[600ms] ease-out ${phase === "fade" ? "opacity-0" : ""}`}
        style={{ left: 0, top: 0, width: "100%", height: "100%" }} />

      {/* Le calque blanc : le noir des lettres y devient transparent et laisse voir la photo */}
      <div ref={veil} aria-hidden className={`absolute inset-0 grid place-items-center bg-white mix-blend-screen ${late ? "hidden" : ""}`}>
        <div ref={word} className="intro-word serif whitespace-nowrap leading-none font-semibold" data-on={shown ? "" : undefined}>
          {WORD.map((l, i) => (
            <span key={i} ref={i === ZOOM_AT ? pivot : undefined} className="intro-letter inline-block" style={{ "--i": i } as React.CSSProperties}>{l}</span>
          ))}
        </div>
      </div>

      {/* La signature, sous le nom ; elle s'efface avant la plongée */}
      <p aria-hidden className={`intro-place caps pointer-events-none absolute inset-x-0 text-center text-[10.5px] tracking-[0.42em] text-ink/70 transition-opacity duration-300 ${phase === "letters" ? "opacity-100" : "opacity-0"}`}>{place}</p>

      {!late && (
        <button type="button" onClick={() => skipRef.current()} className="absolute right-5 bottom-5 z-10 inline-flex min-h-11 items-center gap-2 border border-ink/15 bg-white/80 px-5 text-[10.5px] font-medium tracking-[0.24em] text-ink uppercase backdrop-blur-sm transition-colors hover:bg-ink hover:text-white sm:right-8 sm:bottom-8">
          {skipLabel} <span aria-hidden>→</span>
        </button>
      )}
    </div>,
    document.body,
  );
}
