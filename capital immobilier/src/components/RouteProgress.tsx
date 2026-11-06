"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Changement de page : un rideau noir bordé de rouge passe l'écran. Il ne retient jamais la navigation. */
export function RouteProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "in" | "out">("idle");
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element).closest("a");
      if (!a || a.target === "_blank" || !a.href.startsWith(location.origin)) return;
      if (new URL(a.href).pathname === location.pathname) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setState("in");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  useEffect(() => {
    setState((s) => (s === "in" ? "out" : s));
    const t = setTimeout(() => setState((s) => (s === "out" ? "idle" : s)), 700);
    return () => clearTimeout(t);
  }, [pathname]);
  // Filet de sécurité : le rideau ne reste jamais devant la page.
  useEffect(() => {
    if (state !== "in") return;
    const t = setTimeout(() => setState("idle"), 2500);
    return () => clearTimeout(t);
  }, [state]);
  if (state === "idle") return null;
  return <div aria-hidden className={`route-wipe ${state === "out" ? "route-wipe-out" : ""}`} />;
}
