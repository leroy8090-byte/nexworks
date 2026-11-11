"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

type Consent = { external: boolean; at: string };
const KEY = "capital-consent";
const MAX_AGE = 182 * 24 * 3600 * 1000;
const OPEN = "capital-open-consent";
const listeners = new Set<() => void>();
let cache: Consent | null | undefined;

function read(): Consent | null {
  if (cache !== undefined) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    const v = raw ? (JSON.parse(raw) as Consent) : null;
    cache = v && Date.now() - new Date(v.at).getTime() < MAX_AGE ? v : null;
  } catch { cache = null; }
  return cache;
}
const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
export function saveConsent(external: boolean) {
  cache = { external, at: new Date().toISOString() };
  try { window.localStorage.setItem(KEY, JSON.stringify(cache)); } catch {}
  listeners.forEach((l) => l());
}
/** null : pas encore de choix. Les cartes et vidéos tierces ne se chargeront qu'après accord. */
export const useConsent = () => useSyncExternalStore(subscribe, read, () => null);

export function CookieBanner() {
  const consent = useConsent();
  const [ready, setReady] = useState(false);
  const [reopened, setReopened] = useState(false);
  useEffect(() => {
    const intro = Boolean(document.documentElement.dataset.intro);
    const t = setTimeout(() => setReady(true), intro ? 5200 : 400);
    const onOpen = () => { setReady(true); setReopened(true); };
    window.addEventListener(OPEN, onOpen);
    return () => { clearTimeout(t); window.removeEventListener(OPEN, onOpen); };
  }, []);
  if (!ready || (consent && !reopened)) return null;
  const choose = (v: boolean) => { saveConsent(v); setReopened(false); };
  return (
    <section role="dialog" aria-label="Vos préférences de confidentialité" className="cookie-in fixed inset-x-2 bottom-[4.25rem] z-[70] bg-night p-5 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,.6)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[27rem] sm:p-7">
      <h2 className="text-[1.75rem] leading-tight">Vos préférences</h2>
      <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/85">Ce site ne dépose aucun cookie de suivi. Avec votre accord, il pourra afficher des cartes et des vidéos de services tiers, qui ont leurs propres cookies. <Link href="/confidentialite" className="underline underline-offset-2">En savoir plus</Link></p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => choose(false)} className="min-h-11 border border-white/50 px-3 text-[14.5px] font-medium transition-colors hover:bg-white hover:text-night">Tout refuser</button>
        <button type="button" onClick={() => choose(true)} className="min-h-11 bg-white px-3 text-[14.5px] font-medium text-night transition-colors hover:bg-sand">Tout accepter</button>
      </div>
    </section>
  );
}

export function ConsentLink() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN))} className="line-link hover:text-white">Gestion des cookies</button>;
}
