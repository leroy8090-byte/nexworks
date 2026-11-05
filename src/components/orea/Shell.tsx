"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { DEMO_NOTICE, locations, orea } from "@/data/orea";
import { cn, ease } from "@/lib/utils";
import { Arrow, btnCls, Wrap } from "./ui";

const Logo = () => (
  <Link href={orea.basePath} aria-label="ORÉA DRIVE, accueil" className="flex items-center gap-2 text-white">
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
      <rect width="32" height="32" rx="7" fill="#ff5a1f" />
      <path d="M16 5l-3 22h6L16 5z" fill="#131518" />
      <path d="M16 9v3M16 15v3M16 21v3" stroke="#ff5a1f" strokeWidth="1.5" />
    </svg>
    <span className="font-[family-name:var(--font-orea-display)] text-2xl font-black uppercase leading-none tracking-wide">Oréa Drive</span>
  </Link>
);

export function OreaShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));
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
  const onReserve = pathname.startsWith(`${orea.basePath}/reserver`);

  return (
    <div className="orea min-h-dvh">
      <p className="relative z-[60] bg-or-flame px-4 py-1.5 text-center text-[13px] font-semibold leading-snug text-or-ink">
        {DEMO_NOTICE}{" "}
        <Link href="/realisations" className="font-bold underline underline-offset-2">
          Projet NEXWORKS AGENCY
        </Link>
      </p>
      <a href="#orea-contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-14 focus:z-[70] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-or-ink">
        Aller au contenu
      </a>
      <header className={cn("sticky top-0 z-50 -mb-[72px] transition-colors duration-300", solid || open ? "bg-or-ink/95 backdrop-blur-md" : "bg-transparent")}>
        <Wrap className="flex h-[72px] items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
            {orea.nav.map((n) => {
              const active = pathname.startsWith(n.href);
              return (
                <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined} className={cn("relative py-2 text-base font-semibold transition-colors", active ? "text-white" : "text-white/75 hover:text-white")}>
                  {n.label}
                  {active && <motion.span layoutId="orea-nav" className="absolute inset-x-0 bottom-0 h-0.5 bg-or-flame" />}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Link href={`${orea.basePath}/vehicules`} className={cn(btnCls("flame", "min-h-11 px-5 text-[15px]"), "max-sm:!hidden")}>
              Réserver
            </Link>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="orea-menu" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-white/25 lg:hidden">
              <span className={cn("h-0.5 w-5 bg-white transition-transform", open && "translate-y-1 rotate-45")} />
              <span className={cn("h-0.5 w-5 bg-white transition-transform", open && "-translate-y-1 -rotate-45")} />
            </button>
          </div>
        </Wrap>
        <motion.span aria-hidden style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-or-flame" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="orea-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.45, ease }} className="fixed inset-0 z-40 flex flex-col bg-or-ink px-5 pb-10 pt-32 lg:hidden">
            <nav aria-label="Navigation mobile" className="flex flex-col">
              {orea.nav.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease }}>
                  <Link href={n.href} onClick={() => setOpen(false)} className="block border-b border-white/15 py-4 font-[family-name:var(--font-orea-display)] text-5xl font-black uppercase text-white">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link href={`${orea.basePath}/vehicules`} onClick={() => setOpen(false)} className={btnCls("flame", "mt-8 w-full")}>
              Réserver un véhicule
              <Arrow />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="orea-contenu">{children}</div>

      {/* Le bouton de réservation reste à portée de pouce sur téléphone. */}
      {!onReserve && (
        <Link href={`${orea.basePath}/vehicules`} className={btnCls("flame", "fixed bottom-4 right-4 z-30 min-h-12 px-5 shadow-[0_12px_30px_-8px_rgba(0,0,0,.6)] sm:hidden")}>
          Réserver
        </Link>
      )}

      <footer className="bg-or-ink text-white">
        <Wrap className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">Un loueur de voitures imaginaire sur la Côte d&apos;Azur, créé par NEXWORKS AGENCY pour présenter son savoir-faire.</p>
          </div>
          <nav aria-label="Pied de page">
            <h2 className="text-xl">Le site</h2>
            <ul className="mt-3 space-y-2.5 text-[15px] text-white/70">
              {orea.nav.map((n) => (
                <li key={n.href}><Link href={n.href} className="transition-colors hover:text-white">{n.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-xl">Agences</h2>
            <ul className="mt-3 space-y-2.5 text-[15px] text-white/70">
              {locations.map((l) => <li key={l.key}>{l.name}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-xl">Informations</h2>
            <ul className="mt-3 space-y-2.5 text-[15px] text-white/70">
              <li><Link href={`${orea.basePath}/mentions-legales`} className="transition-colors hover:text-white">Mentions légales</Link></li>
              <li><Link href={`${orea.basePath}/confidentialite`} className="transition-colors hover:text-white">Confidentialité</Link></li>
              <li><Link href={`${orea.basePath}/credits-photos`} className="transition-colors hover:text-white">Crédits photos</Link></li>
              <li><Link href="/realisations" className="transition-colors hover:text-white">Créé par NEXWORKS AGENCY</Link></li>
            </ul>
          </div>
        </Wrap>
        <div className="orea-road h-3 bg-[#24272b]" aria-hidden />
      </footer>
    </div>
  );
}
