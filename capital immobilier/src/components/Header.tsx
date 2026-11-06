"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { agency, LIVE, nav } from "@/data/agency";
import { useFavorites } from "./favorites";

/** Pages qui commencent par une grande photo : l'en-tête y reste transparent jusqu'au premier défilement. */
const PHOTO_TOP = ["/", "/acheter", "/louer", "/estimation", "/vendre", "/gestion-locative", "/syndic", "/asl-asa", "/location-vacances", "/agence", "/contact", "/honoraires", "/mentions-legales", "/confidentialite", "/secteurs", "/conseils", "/questions"];
const PHOTO_TOP_DYNAMIC = /^\/(secteurs|conseils|annonces)\//;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const favorites = useFavorites();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setOpen(false); setMenu(null); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open && !menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setMenu(null); } };
    window.addEventListener("keydown", onKey);
    if (open) document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, menu]);

  const clear = (PHOTO_TOP.includes(pathname) || PHOTO_TOP_DYNAMIC.test(pathname)) && !scrolled && !open && !menu;
  const showMenu = (label: string | null) => { if (closeTimer.current) clearTimeout(closeTimer.current); setMenu(label); };
  const hideMenu = () => { closeTimer.current = setTimeout(() => setMenu(null), 140); };

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {!LIVE && (
        <p className="bg-night px-4 py-1.5 text-center text-[12.5px] leading-snug text-white/85">
          Concept de refonte par <a href="https://www.nexworks.agency" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">NEXWORKS AGENCY</a>. Le site officiel reste <a href={agency.officialSite} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">capitalimmobilier.fr</a>.
        </p>
      )}
      <header className={`border-b transition-colors duration-500 ${clear ? "border-white/20 bg-transparent" : "border-rule bg-ivory/95 backdrop-blur-md"}`}>
        <div className={`mx-auto flex w-full max-w-[1480px] items-center justify-between gap-5 px-5 transition-[height] duration-500 sm:px-10 lg:px-16 ${scrolled ? "h-[62px]" : "h-[76px]"}`}>
          <Link href="/" aria-label={`${agency.name}, accueil`} className={`relative block h-[42px] w-[190px] shrink-0 origin-left transition-transform duration-500 sm:h-[46px] sm:w-[212px] ${scrolled ? "scale-[.86]" : ""}`}>
            <Image src="/media/logo-light.png" alt="" fill sizes="212px" loading="eager" className={`object-contain object-left transition-opacity duration-500 ${clear ? "opacity-100" : "opacity-0"}`} />
            <Image src="/media/logo-dark.png" alt="" fill sizes="212px" loading="eager" className={`object-contain object-left transition-opacity duration-500 ${clear ? "opacity-0" : "opacity-100"}`} />
          </Link>
          <nav aria-label="Navigation principale" className={`hidden items-center gap-7 xl:flex ${clear ? "text-white" : "text-night"}`} onPointerLeave={hideMenu}>
            {nav.map((n) => (
              <div key={n.label} className="relative" onPointerEnter={() => showMenu(n.children ? n.label : null)}>
                <Link href={n.href} aria-expanded={n.children ? menu === n.label : undefined} aria-haspopup={n.children ? "true" : undefined} onFocus={() => showMenu(n.children ? n.label : null)} className={`block py-2 text-[15px] transition-colors duration-500 ${menu === n.label ? "line-on" : "line-link"}`}>{n.label}</Link>
                <AnimatePresence>
                  {menu === n.label && n.children && (
                    <m.ul initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="absolute left-1/2 top-full z-10 mt-3 min-w-64 -translate-x-1/2 bg-white p-3 text-night shadow-[0_24px_60px_-28px_rgba(0,0,0,.45)]">
                      {n.children.map((c) => <li key={c.href}><Link href={c.href} onClick={() => setMenu(null)} onFocus={() => showMenu(n.label)} className="block whitespace-nowrap px-4 py-2.5 text-[15px] transition-colors hover:bg-ivory">{c.label}</Link></li>)}
                    </m.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
          <div className={`flex items-center gap-1 transition-colors duration-500 sm:gap-3 ${clear ? "text-white" : "text-night"}`}>
            <Link href="/favoris" aria-label={`Mes favoris (${favorites.length})`} className="relative grid size-11 place-items-center">
              <svg viewBox="0 0 24 24" aria-hidden className={`size-5 ${favorites.length ? "fill-current" : "fill-none"}`} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><path d="M12 20.5S3.5 15.3 3.5 9.2A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 8.5 2.7c0 6.1-8.5 11.3-8.5 11.3Z" /></svg>
              {favorites.length > 0 && <span className="absolute right-0.5 top-0.5 grid size-[18px] place-items-center rounded-full bg-sea text-[11px] font-medium text-white">{favorites.length}</span>}
            </Link>
            <Link href="/estimation" className={`hidden min-h-11 items-center px-5 text-[14.5px] font-medium transition-colors duration-300 sm:inline-flex ${clear ? "fill bg-sea text-white [--f:#fff] hover:text-night" : "fill bg-sea text-white [--f:var(--color-night)]"}`}>Estimer mon bien</Link>
            <button type="button" aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen((v) => !v)} className="inline-flex size-11 flex-col items-center justify-center gap-[7px] xl:hidden">
              <span className={`block h-px w-6 bg-current transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-1 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <m.div id="menu-mobile" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="h-[calc(100dvh-104px)] overflow-y-auto bg-night px-5 pb-10 pt-4 text-white sm:px-10 xl:hidden">
            <nav aria-label="Menu mobile">
              {nav.map((n, i) => (
                <m.div key={n.label} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="border-b border-white/15 py-3">
                  <Link href={n.href} onClick={() => setOpen(false)} className="block text-[2rem] leading-tight [font-family:var(--font-display)]">{n.label}</Link>
                  {n.children && <ul className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1">{n.children.slice(1).map((c) => <li key={c.href}><Link href={c.href} onClick={() => setOpen(false)} className="block py-1 text-[15px] text-white/75">{c.label}</Link></li>)}</ul>}
                </m.div>
              ))}
            </nav>
            <div className="mt-7 grid gap-3">
              <Link href="/estimation" onClick={() => setOpen(false)} className="grid min-h-[3.3rem] place-items-center bg-sea text-[15px] font-semibold text-white">Estimer mon bien</Link>
              <a href={`tel:${agency.phoneHref}`} className="grid min-h-[3.3rem] place-items-center border border-white/50 text-[15px]">{agency.phone}</a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
