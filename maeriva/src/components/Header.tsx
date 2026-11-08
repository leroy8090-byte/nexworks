"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { agencyFor, navFor } from "@/data/localized";
import { LIVE } from "@/data/site";
import { frenchPath, localePath, type Lang } from "@/i18n/config";
import { SelectionCount } from "./Selection";
import { Icon } from "./ui";

const T = {
  fr: { demo: "Site de démonstration réalisé par NEXWORKS AGENCY · agence, biens et prix fictifs", home: "accueil", main: "Navigation principale", mobile: "Menu mobile", selection: "Ma sélection", meet: "Rendez-vous", book: "Prendre rendez-vous", call: "Appeler le", open: "Ouvrir le menu", close: "Fermer le menu", lang: "Changer de langue" },
  en: { demo: "Demonstration website by NEXWORKS AGENCY · fictional agency, properties and prices", home: "home", main: "Main navigation", mobile: "Mobile menu", selection: "My selection", meet: "Appointment", book: "Book an appointment", call: "Call", open: "Open the menu", close: "Close the menu", lang: "Change language" },
};

/** Le logo de l'agence : l'emblème (maison, cyprès, vagues) et le nom. */
export function Logo({ compact }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Image src="/brand/emblem-navy.png" alt="" width={618} height={298} priority className={`w-auto transition-[height] duration-300 ${compact ? "h-8" : "h-9"}`} />
      <Image src="/brand/wordmark-navy.png" alt="MAÉRIVA" width={1169} height={194} priority className={`w-auto transition-[height] duration-300 ${compact ? "h-[16px]" : "h-[18px]"}`} />
    </span>
  );
}

/** FR / EN : mène à la même page dans l'autre langue, en gardant la recherche en cours. */
function LangSwitch({ lang, className = "" }: { lang: Lang; className?: string }) {
  const path = usePathname();
  const params = useSearchParams();
  const q = params.toString();
  const fr = frenchPath(path) + (q ? `?${q}` : "");
  return (
    <span className={`flex items-center gap-1.5 text-[11px] font-medium tracking-[0.2em] ${className}`} role="group" aria-label={T[lang].lang}>
      {(["fr", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden className="text-stone">/</span>}
          {l === lang
            ? <span aria-current="true" className="text-ink">{l.toUpperCase()}</span>
            : <a href={localePath(l, fr)} hrefLang={l} lang={l} className="line text-muted hover:text-ink">{l.toUpperCase()}</a>}
        </span>
      ))}
    </span>
  );
}

/** En-tête blanc, toujours lisible ; un simple filet apparaît quand on descend. */
export function Header({ lang }: { lang: Lang }) {
  const t = T[lang];
  const agency = agencyFor(lang);
  const nav = navFor(lang);
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    // L'en-tête s'efface quand on descend (au-delà du premier écran) et revient dès qu'on remonte.
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (Math.abs(y - last) > 6) { setHidden(y > last && y > 320); last = y; }
    };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const hide = hidden && !open;
  useEffect(() => {
    if (hide) document.documentElement.dataset.header = "hidden"; else delete document.documentElement.dataset.header;
  }, [hide]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [open]);
  const current = frenchPath(path);
  const active = (href: string) => current === href || current.startsWith(`${href}/`);
  const L = (p: string) => localePath(lang, p);
  return (
    <div className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${hide ? "-translate-y-full" : ""}`}>
      {!LIVE && <p className="bg-paper px-4 py-1.5 text-center text-[11px] leading-snug tracking-wide text-muted">{t.demo}</p>}
      <header className={`bg-white/95 backdrop-blur-md transition-shadow duration-300 ${scrolled || open ? "shadow-[0_1px_0_var(--color-line)]" : ""}`}>
        <div className={`mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 transition-[height] duration-300 sm:px-10 lg:px-16 ${scrolled ? "h-[68px]" : "h-[84px]"}`}>
          <Link href={L("/")} data-logo aria-label={`${agency.name}, ${t.home}`}><Logo compact={scrolled} /></Link>
          <nav aria-label={t.main} className="hidden items-center gap-8 xl:flex">
            {nav.map((n) => <Link key={n.href} href={L(n.href)} aria-current={active(n.href) ? "page" : undefined} className="line text-[11.5px] font-medium tracking-[0.2em] text-ink uppercase">{n.label}</Link>)}
          </nav>
          <div className="flex items-center gap-1 sm:gap-3">
            <Suspense fallback={null}><LangSwitch lang={lang} className="mr-1 hidden sm:flex" /></Suspense>
            <Link href={L("/selection")} aria-label={t.selection} className="relative grid size-11 place-items-center text-ink"><Icon name="heart" /><SelectionCount /></Link>
            <Link href={L("/contact")} className="hidden min-h-11 items-center rounded-[1px] bg-ink px-6 text-[11px] font-medium tracking-[0.22em] text-white uppercase transition-colors hover:bg-sea md:inline-flex">{t.meet}</Link>
            <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="menu" aria-label={open ? t.close : t.open} className="relative grid size-12 place-items-center text-ink xl:hidden">
              <span className={`absolute h-px w-6 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-px w-6 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <m.div id="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 -z-10 overflow-y-auto bg-white xl:hidden">
            <div className="grid min-h-full content-between gap-10 px-6 pt-36 pb-10 sm:px-10">
              <nav aria-label={t.mobile}>
                {nav.map((n, i) => (
                  <m.div key={n.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }} className="border-b border-line">
                    <Link href={L(n.href)} aria-current={active(n.href) ? "page" : undefined} className="flex items-baseline justify-between py-4"><span className="serif text-[2.2rem] leading-none text-ink">{n.label}</span><span className="text-[11px] tracking-[0.2em] text-gold">0{i + 1}</span></Link>
                  </m.div>
                ))}
              </nav>
              <div className="grid gap-3">
                <Suspense fallback={null}><LangSwitch lang={lang} className="justify-center py-2" /></Suspense>
                <Link href={L("/contact")} className="grid min-h-[3.4rem] place-items-center bg-ink text-[11.5px] font-medium tracking-[0.24em] text-white uppercase">{t.book}</Link>
                <a href={`tel:${agency.phoneHref}`} className="grid min-h-[3.4rem] place-items-center border border-ink/25 text-[11.5px] tracking-[0.24em] text-ink uppercase">{t.call} {agency.phone}</a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
