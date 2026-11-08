"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { langFromPath, type Lang } from "./lang";

/** Langue de la page affichée, d'après son adresse (rendu serveur et navigateur identiques). */
export function useLang(): Lang {
  return langFromPath(usePathname() || "/");
}

/** Le document est servi avec lang="fr" : sur les pages anglaises, on corrige l'attribut pour les lecteurs d'écran et le navigateur. */
export function LangAttr() {
  const lang = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
