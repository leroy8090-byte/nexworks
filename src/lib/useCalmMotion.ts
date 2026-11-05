import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};

/**
 * Préférence « réduire les animations », pour les composants qui changent de structure selon elle.
 * Le premier rendu reprend celui du serveur, puis React applique la préférence : pas d'erreur d'hydratation.
 */
export function useCalmMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
