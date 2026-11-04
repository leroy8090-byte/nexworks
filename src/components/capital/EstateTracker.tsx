"use client";

import { useEffect } from "react";

/** Statistiques NEXWORKS ESTATE (sans cookie). Chargé une fois la page en place, pour que la fiche d'un bien soit reconnue. */
export function EstateTracker({ src, publicKey }: { src: string; publicKey: string }) {
  useEffect(() => {
    if (document.querySelector("script[data-estate-tracker]")) return;
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.dataset.key = publicKey;
    s.dataset.estateTracker = "";
    document.head.appendChild(s);
  }, [src, publicKey]);
  return null;
}
