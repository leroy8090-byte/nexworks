"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scène à dimensions "design" fixes (px) mise à l'échelle pour remplir la largeur disponible.
 * Permet de composer des visuels complexes (mockups, dashboards) qui restent nets et proportionnés
 * sur tous les écrans, sans débordement horizontal. Décoratif : masqué aux lecteurs d'écran.
 */
export function ScaledStage({
  width,
  height,
  children,
  className,
  label,
  interactive,
}: {
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
  /** Description accessible optionnelle (sinon aria-hidden) */
  label?: string;
  /** true = contenu interactif accessible (pas de aria-hidden) */
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
      {...(interactive ? {} : label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width,
          height,
          transform: `scale(${scale ?? 1})`,
          opacity: scale === null ? 0 : 1,
          transition: "opacity .4s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}
