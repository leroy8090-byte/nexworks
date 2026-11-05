"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Pages de démonstration autonomes (site complet d'un autre « client ») : on masque l'en-tête, le pied de page et les easter eggs NEXWORKS. */
export const standalonePrefixes = ["/azur-plomberie", "/maison-riviera", "/volt-fitness", "/orea-drive"];

export function useIsStandalone() {
  const pathname = usePathname() || "";
  return standalonePrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function HideOnDemo({ children }: { children: ReactNode }) {
  return useIsStandalone() ? null : <>{children}</>;
}

/** Applique l'identité NEXWORKS (polices, titres) sans toucher aux sites de démonstration. */
export function SiteScope({ children }: { children: ReactNode }) {
  return <div className={useIsStandalone() ? "contents" : "nx-site"}>{children}</div>;
}
