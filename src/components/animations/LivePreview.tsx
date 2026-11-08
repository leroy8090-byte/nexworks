"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScaledStage } from "@/components/ui/ScaledStage";
import { SCENES, type SceneSlug } from "./scenes";

const PAUSE = 1800; // temps de pause sur la page d'accueil avant de rejouer

/**
 * Aperçu animé d'une carte : l'animation tourne en direct, en boucle, à l'échelle de la carte
 * (scène de 1280 × 800 réduite), dès que la carte est visible. Hors de l'écran, elle finit son tour puis attend.
 * Avant la première apparition (ou si le visiteur a demandé moins d'animations) : l'image fixe `poster`.
 */
export function LivePreview({ slug, poster }: { slug: SceneSlug; poster: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [started, setStarted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [run, setRun] = useState(0);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { setInView(e.isIntersecting); if (e.isIntersecting) setStarted(true); }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fin d'un tour : on rejoue après une pause, seulement si la carte est à l'écran
  useEffect(() => {
    if (!ended || !inView) return;
    const t = window.setTimeout(() => { setEnded(false); setRun((r) => r + 1); }, PAUSE);
    return () => window.clearTimeout(t);
  }, [ended, inView]);

  const Scene = SCENES[slug];
  return (
    <div ref={box} className="relative h-full">
      {started && !reduced ? (
        <ScaledStage width={1280} height={800} className="h-full">
          <div className="anx-mini"><Scene key={run} preview onDone={() => setEnded(true)} /></div>
        </ScaledStage>
      ) : (
        poster
      )}
    </div>
  );
}
