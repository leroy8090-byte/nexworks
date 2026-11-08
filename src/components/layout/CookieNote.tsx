"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { pagePath } from "@/i18n/lang";
import { useLang } from "@/i18n/use-lang";

const KEY = "nx-cookie-note-v1";
const hasCaptcha = Boolean((process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "").trim());

const T = {
  fr: {
    region: "Information sur les cookies",
    tag: "Cookies",
    title: "Ici, les cookies, c'est pour le goûter.",
    text: "Aucun cookie pour vous suivre, aucune pub qui vous court après.",
    captcha: " Seule une vérification anti-robot protège le formulaire de devis, pour que les robots n'aient pas droit au dessert.",
    ok: "Parfait, merci",
    more: "Les détails",
    close: "Fermer",
  },
  en: {
    region: "Cookie information",
    tag: "Cookies",
    title: "Here, cookies are for snack time.",
    text: "No cookies to follow you around, no ads chasing you down the street.",
    captcha: " Only an anti-robot check guards the quote form, so the bots don't get any dessert.",
    ok: "Sounds good",
    more: "The details",
    close: "Close",
  },
} as const;

/** Un cookie bleu aux couleurs de NEXWORKS, lunettes de soleil sur le nez : « je ne vous suis pas ». */
function Cookie() {
  return (
    <svg viewBox="0 0 96 96" className="cookie-wobble size-full" aria-hidden>
      <defs>
        <linearGradient id="ck-body" x1="14" y1="10" x2="84" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8fd6f8" />
          <stop offset="0.55" stopColor="#55bdf2" />
          <stop offset="1" stopColor="#1d86c4" />
        </linearGradient>
      </defs>
      <path
        d="M48 6c4 5 11 7 17 5 1 7 7 12 14 12 1 6 5 10 11 11-3 6-1 13 4 17-5 4-6 11-3 17-7 1-11 6-12 12-6-1-12 2-15 8-5-4-12-4-17 0-4-5-10-8-16-7-1-6-6-11-12-12 1-6-1-12-6-15 4-5 5-11 2-17 6-1 11-5 12-11 7 0 13-4 15-10 4 3 9 4 13 2 0 0 0-3 0-3Z"
        fill="url(#ck-body)"
      />
      <path d="M16 62c5 12 17 21 31 22 14 1 27-6 33-17-6 8-17 13-29 12C34 78 22 72 16 62Z" fill="#0a6aa8" opacity=".35" />
      {[[29, 28, 4.4], [66, 24, 3.6], [74, 54, 4.2], [24, 56, 3.4], [56, 72, 3.8], [46, 14, 2.8]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.82} fill="#0b1a26" />
      ))}
      <g>
        <rect x="19" y="38" width="26" height="15" rx="6" fill="#06090d" />
        <rect x="51" y="38" width="26" height="15" rx="6" fill="#06090d" />
        <rect x="43" y="42" width="10" height="3.5" rx="1.75" fill="#06090d" />
        <path d="M23 42l7-0.5-7 6.5Z" fill="#55bdf2" opacity=".7" />
        <path d="M55 42l7-0.5-7 6.5Z" fill="#55bdf2" opacity=".7" />
      </g>
      <path d="M36 64c4 5 20 5 24 0" fill="none" stroke="#0b1a26" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Petit mot d'information sur les cookies. Le site n'en utilise aucun de suivi : on le dit avec le sourire,
 * une seule fois (le choix de fermer est gardé dans ce navigateur).
 */
export function CookieNote() {
  const lang = useLang();
  const t = T[lang];
  const [open, setOpen] = useState(false);
  const ok = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(KEY) === "1";
    } catch {}
    if (seen) return;
    const id = window.setTimeout(() => setOpen(true), 1600);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  }

  if (!open) return null;
  return (
    <section
      aria-label={t.region}
      className="cookie-note fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-[27rem] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:mx-0"
    >
      <div className="relative overflow-hidden rounded-3xl border border-sky/30 bg-[#0a0e13] p-4 sm:p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9),0_0_60px_-24px_rgba(85,189,242,0.55)] backdrop-blur-xl">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-sky/15 blur-3xl" />
        <div className="relative flex gap-3.5 sm:gap-4">
          <div className="size-14 shrink-0 sm:size-20">
            <Cookie />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky">{t.tag}</p>
            <h2 className="mt-0.5 font-display text-base font-semibold leading-snug text-white sm:text-[17px]">{t.title}</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-mist sm:mt-2 sm:text-[13.5px]">
              {t.text}
              {hasCaptcha ? t.captcha : ""}
            </p>
          </div>
        </div>
        <div className="relative mt-3 flex flex-wrap items-center gap-x-5 gap-y-0 sm:mt-4">
          <button
            ref={ok}
            type="button"
            onClick={dismiss}
            className="btn-shine relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-sky px-5 text-sm font-bold text-ink transition hover:bg-[#7dcef7] active:scale-[0.97]"
          >
            {t.ok}
          </button>
          <Link href={pagePath(lang, "privacy")} className="inline-flex min-h-11 items-center text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline">
            {t.more}
          </Link>
        </div>
      </div>
    </section>
  );
}
