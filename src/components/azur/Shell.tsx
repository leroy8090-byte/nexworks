"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { azur, azurNav, azurServices, azurZones, DEMO_NOTICE } from "@/data/azur";
import { cn, ease } from "@/lib/utils";
import { Arrow, btnCls, Mark, PhoneLine, Wrap } from "./ui";

const Logo = () => (
  <Link href={azur.basePath} aria-label="AZUR PLOMBERIE, accueil" className="flex items-center gap-2.5 text-white">
    <Mark />
    <span className="az-display text-[1.65rem]">Azur Plomberie</span>
  </Link>
);

export function AzurShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const onContact = pathname.startsWith(`${azur.basePath}/contact`);

  return (
    <div className="azur min-h-dvh">
      <p className="relative z-[60] bg-az-ink px-4 py-1.5 text-center text-[13px] font-semibold leading-snug text-white">
        {DEMO_NOTICE}{" "}
        <Link href="/realisations" className="font-bold underline underline-offset-2">Projet NEXWORKS AGENCY</Link>
      </p>
      <a href="#azur-contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-14 focus:z-[70] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-az-ink">
        Aller au contenu
      </a>

      <header className={cn("sticky top-0 z-50 -mb-[76px] transition-colors duration-300", solid || open ? "bg-az-deep/95 shadow-[0_10px_30px_-20px_rgba(0,0,0,.6)] backdrop-blur-md" : "bg-transparent")}>
        <Wrap className="flex h-[76px] items-center justify-between gap-5">
          <Logo />
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {azurNav.map((n) => {
              const active = pathname.startsWith(n.href);
              return (
                <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined} className={cn("relative py-2 text-base font-semibold transition-colors", active ? "text-white" : "text-white/80 hover:text-white")}>
                  {n.label}
                  {active && <motion.span layoutId="azur-nav" className="absolute inset-x-0 bottom-0 h-0.5 bg-az-brass" />}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Link href={`${azur.basePath}/contact?urgence=1`} className={btnCls("hot", "min-h-11 px-4 text-[15px] max-lg:!hidden")}>C&apos;est urgent</Link>
            <Link href={`${azur.basePath}/contact`} className={btnCls("white", "min-h-11 px-4 text-[15px] max-sm:!hidden")}>Demander un devis</Link>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="azur-menu" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-white/30 lg:hidden">
              <span className={cn("h-0.5 w-5 bg-white transition-transform", open && "translate-y-1 rotate-45")} />
              <span className={cn("h-0.5 w-5 bg-white transition-transform", open && "-translate-y-1 -rotate-45")} />
            </button>
          </div>
        </Wrap>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="azur-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.45, ease }} className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-az-deep px-5 pb-10 pt-32 lg:hidden">
            <nav aria-label="Navigation mobile" className="flex flex-col">
              {azurNav.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease }}>
                  <Link href={n.href} onClick={() => setOpen(false)} className="az-display block border-b border-white/15 py-4 text-[2.6rem] text-white">{n.label}</Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 grid gap-3">
              <Link href={`${azur.basePath}/contact?urgence=1`} onClick={() => setOpen(false)} className={btnCls("hot", "w-full")}>C&apos;est urgent<Arrow /></Link>
              <Link href={`${azur.basePath}/contact`} onClick={() => setOpen(false)} className={btnCls("white", "w-full")}>Demander un devis<Arrow /></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="azur-contenu">{children}</div>

      {/* Sur téléphone, les deux actions utiles restent à portée de pouce. */}
      {!onContact && (
        <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-white/15 bg-az-ink/95 p-2 backdrop-blur sm:hidden">
          <Link href={`${azur.basePath}/contact?urgence=1`} className={btnCls("hot", "min-h-12 px-2 text-[15px]")}>C&apos;est urgent</Link>
          <Link href={`${azur.basePath}/contact`} className={btnCls("white", "min-h-12 px-2 text-[15px]")}>Devis</Link>
        </div>
      )}

      <footer className="bg-az-ink pb-20 text-white sm:pb-0">
        <Wrap className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/75">Un artisan plombier imaginaire à Saint-Raphaël, créé par NEXWORKS AGENCY pour présenter son savoir-faire.</p>
            <p className="mt-4 text-[15px] text-white/75">{azur.hours}</p>
            <PhoneLine className="mt-1 block text-lg font-bold" />
          </div>
          <nav aria-label="Services">
            <h2 className="text-2xl">Services</h2>
            <ul className="mt-3 space-y-2.5 text-[15px] text-white/75">
              {azurServices.map((s) => (
                <li key={s.slug}><Link href={s.href ?? `${azur.basePath}/services/${s.slug}`} className="transition-colors hover:text-white">{s.title}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-2xl">Secteur</h2>
            <ul className="mt-3 space-y-2.5 text-[15px] text-white/75">
              {azurZones.map((z) => <li key={z.key}>{z.name}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl">Informations</h2>
            <ul className="mt-3 space-y-2.5 text-[15px] text-white/75">
              <li><Link href={`${azur.basePath}/a-propos`} className="transition-colors hover:text-white">L&apos;artisan</Link></li>
              <li><Link href={`${azur.basePath}/mentions-legales`} className="transition-colors hover:text-white">Mentions légales</Link></li>
              <li><Link href={`${azur.basePath}/confidentialite`} className="transition-colors hover:text-white">Confidentialité</Link></li>
              <li><Link href="/" className="transition-colors hover:text-white">Créé par NEXWORKS AGENCY</Link></li>
            </ul>
          </div>
        </Wrap>
      </footer>
    </div>
  );
}
