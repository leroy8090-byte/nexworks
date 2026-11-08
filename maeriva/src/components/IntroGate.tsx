"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Phase = "off" | "loading" | "playing" | "handoff" | "leaving";

/** Position du logo dans la dernière image de la vidéo, et sa découpe dans public/intro/intro-logo.png */
// Mesurés dans la dernière image de chaque version (script d'encodage) : l'ordinateur reçoit l'image 1920 × 1080,
// le téléphone un cadrage vertical 810 × 1080 pris dans la même image, donc plus net.
const HD = { frame: { w: 1920, h: 1080 }, logo: { left: 725, top: 318, width: 432, height: 349 } };
const MOBILE = { frame: { w: 810, h: 1080 }, logo: { left: 180, top: 325, width: 434, height: 350 } };
const END_BG = "#f9f7f3"; // le blanc cassé de la dernière image

/**
 * L'introduction vidéo (3,4 s) : l'extérieur de l'agence, l'entrée, l'accueil, l'écran, puis le logo.
 * Fin enchaînée avec le site : le logo de la vidéo est remplacé par sa découpe exacte, la vidéo s'efface,
 * le logo remonte se fondre dans celui de l'en-tête, et la page d'accueil fait son entrée.
 *
 * Jouée seulement à la première visite de l'accueil pendant la session (ou avec ?intro dans l'adresse),
 * jamais si le visiteur a demandé moins d'animations ou économise ses données : la décision est prise
 * avant l'affichage, dans le <head>, qui pose data-intro sur <html>.
 * Garde-fous : bouton « Passer », touche Échap, abandon si la lecture ne démarre pas vite.
 */
export function IntroGate({ skipLabel }: { skipLabel: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const logo = useRef<HTMLImageElement>(null);
  const [phase, setPhase] = useState<Phase>("off");
  const box = useRef(HD);
  const finishRef = useRef<() => void>(() => {});

  // 1. La décision du <head> : faut-il jouer l'introduction ?
  useEffect(() => {
    if (document.documentElement.dataset.intro === "1") setPhase("loading");
  }, []);

  // 2. La vidéo est à l'écran : on la lance.
  const started = phase !== "off";
  useEffect(() => {
    const v = video.current;
    if (!started || !v) return;
    const root = document.documentElement;
    try { sessionStorage.setItem("maeriva:intro", "1"); } catch { /* stockage indisponible : rien de grave */ }
    let done = false, alive = true;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    const release = () => { delete root.dataset.intro; }; // la page reprend : défilement, animations d'entrée de l'accueil

    // Fin normale : passage de relais vers le site, avec le logo qui rejoint l'en-tête.
    const handoff = () => {
      if (done) return; done = true;
      const img = logo.current, target = document.querySelector<HTMLElement>("[data-logo]");
      if (!img || !target) { setPhase("leaving"); release(); later(() => alive && setPhase("off"), 650); return; }
      // Le logo découpé se pose exactement sur celui de la dernière image (la vidéo couvre l'écran : object-fit cover).
      const vw = window.innerWidth, vh = window.innerHeight;
      const { frame: F, logo: L } = box.current;
      const s = Math.max(vw / F.w, vh / F.h);
      const ox = (vw - F.w * s) / 2, oy = (vh - F.h * s) / 2;
      const from = { x: ox + L.left * s, y: oy + L.top * s, w: L.width * s, h: L.height * s };
      const t = target.getBoundingClientRect();
      const toH = t.height * 1.9, toW = toH * (L.width / L.height);
      const to = { x: t.left + t.width * 0.18 - toW / 2, y: t.top + t.height / 2 - toH / 2, w: toW };
      Object.assign(img.style, { left: `${from.x}px`, top: `${from.y}px`, width: `${from.w}px`, transform: "none", transition: "opacity 180ms ease", opacity: "1" });
      root.dataset.handoff = "1"; // le logo de l'en-tête reste caché pendant le trajet
      release();
      setPhase("handoff");
      // Trajet du logo vers l'en-tête, pendant que la vidéo s'efface
      later(() => {
        img.style.transition = "transform 1050ms cubic-bezier(0.65, 0, 0.25, 1), opacity 420ms ease 700ms";
        img.style.transform = `translate(${to.x - from.x}px, ${to.y - from.y}px) scale(${to.w / from.w})`;
        img.style.transformOrigin = "0 0";
        img.style.opacity = "0";
      }, 200);
      later(() => { delete root.dataset.handoff; }, 960);   // le logo de l'en-tête apparaît sous le logo qui arrive
      later(() => alive && setPhase("off"), 1400);
    };
    // Bouton « Passer » ou Échap : simple fondu, sans trajet du logo.
    const skip = () => {
      if (done) return; done = true;
      release();
      setPhase("leaving");
      later(() => alive && setPhase("off"), 650);
    };
    finishRef.current = skip;

    const mobile = window.matchMedia("(max-width: 820px)").matches;
    box.current = mobile ? MOBILE : HD;
    v.src = mobile ? "/intro/maeriva-intro-mobile.mp4" : "/intro/maeriva-intro.mp4";
    const failsafe = window.setTimeout(skip, 4000);  // la lecture n'a pas démarré à temps
    const hardStop = window.setTimeout(skip, 9000);  // quoi qu'il arrive, le site reprend la main
    const onPlaying = () => { window.clearTimeout(failsafe); if (!done) setPhase("playing"); };
    v.addEventListener("playing", onPlaying, { once: true });
    v.addEventListener("ended", handoff);
    v.addEventListener("error", skip);
    v.play().catch(skip); // lecture automatique refusée par le navigateur : on passe directement au site
    const esc = (e: KeyboardEvent) => e.key === "Escape" && skip();
    window.addEventListener("keydown", esc);
    return () => {
      alive = false; timers.forEach(clearTimeout); window.clearTimeout(failsafe); window.clearTimeout(hardStop);
      window.removeEventListener("keydown", esc); v.removeEventListener("ended", handoff); v.removeEventListener("error", skip);
      delete root.dataset.handoff;
    };
  }, [started]);

  // Rendue directement dans <body>, au-dessus de tout le site (en-tête compris).
  if (phase === "off") return null;
  const fading = phase === "handoff" || phase === "leaving";
  return createPortal(
    <>
      <div className={`fixed inset-0 z-[100] transition-opacity ease-out ${phase === "handoff" ? "duration-[800ms]" : "duration-[600ms]"} ${fading ? "pointer-events-none opacity-0" : "opacity-100"}`} style={{ background: phase === "handoff" ? END_BG : "#0b0b0c" }}>
        <video ref={video} muted playsInline preload="auto" aria-hidden disablePictureInPicture className="absolute inset-0 h-full w-full object-cover" />
        {/* Le temps que la vidéo arrive : l'emblème, très discret */}
        <div aria-hidden className={`pointer-events-none absolute inset-0 grid place-items-center bg-[#0b0b0c] transition-opacity duration-500 ${phase === "loading" ? "opacity-100" : "opacity-0"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/emblem-light.png" alt="" width={124} height={60} className="h-10 w-auto animate-pulse opacity-50" />
        </div>
        <button type="button" onClick={() => finishRef.current()} className="absolute right-5 bottom-5 z-10 inline-flex min-h-11 items-center gap-2 border border-white/40 bg-black/25 px-5 text-[10.5px] font-medium tracking-[0.24em] text-white uppercase backdrop-blur-sm transition-colors hover:bg-white hover:text-ink sm:right-8 sm:bottom-8">
          {skipLabel} <span aria-hidden>→</span>
        </button>
      </div>
      {/* Le logo de la dernière image, détouré : il prend le relais de la vidéo puis rejoint l'en-tête */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={logo} src="/intro/intro-logo.png" alt="" aria-hidden width={HD.logo.width} height={HD.logo.height} className="pointer-events-none fixed z-[101] h-auto opacity-0" style={{ left: 0, top: 0 }} />
    </>,
    document.body,
  );
}
