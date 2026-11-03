"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sierra, sierraNav } from "@/data/sierra";
import { FavoritesBar, ScrollProgress, SierraExtrasProvider } from "./Extras";
import { ContactHint, DemoBanner, SierraButton, Wrap } from "./ui";

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href={sierra.basePath} aria-label={`${sierra.name} — Accueil`} className="inline-flex items-center">
      <Image
        src={sierra.logo}
        alt="Sierra Immobilier"
        width={compact ? 160 : 200}
        height={compact ? 106 : 133}
        className="h-10 w-auto sm:h-12"
        priority
      />
    </Link>
  );
}

function Header({ isHome }: { isHome: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = !isHome || scrolled || open;
  const isActive = (href: string) => (href === sierra.basePath ? pathname === href : pathname.startsWith(href));

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <DemoBanner />
      <header className={`border-b transition-colors duration-500 ${solid ? "border-white/10 bg-[#231F31]/95 backdrop-blur" : "border-transparent bg-transparent"}`}>
        <Wrap className="flex h-[78px] items-center justify-between gap-4">
          <Logo />
          <nav aria-label="Navigation principale" className="hidden items-center gap-5 xl:flex">
            {sierraNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={`text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  isActive(n.href) ? "text-[#A68936]" : "text-white/85 hover:text-[#A68936]"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <SierraButton href={`${sierra.basePath}/estimation`} variant="gold" className="hidden px-5 py-3 lg:inline-flex">
              Estimer
            </SierraButton>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="sierra-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-11 flex-col items-center justify-center gap-[6px] text-white xl:hidden"
            >
              <span className={`block h-px w-6 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </Wrap>
        <AnimatePresence>
          {open && (
            <motion.div
              id="sierra-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[calc(100dvh-112px)] overflow-y-auto border-t border-white/10 bg-[#231F31] xl:hidden"
            >
              <nav aria-label="Menu mobile" className="flex flex-col px-6 py-6">
                {sierraNav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-white/10 py-4 text-[1.35rem] font-semibold tracking-wide text-white"
                  >
                    {n.label}
                  </Link>
                ))}
                <SierraButton href={`${sierra.basePath}/estimation`} variant="gold" className="mt-8" onClick={() => setOpen(false)}>
                  Estimer mon bien
                </SierraButton>
                <a href={sierra.phoneHref} className="mt-4 text-center text-[13px] font-semibold tracking-wide text-[#A68936]">
                  {sierra.phone}
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1A1624] text-white/70">
      <Wrap className="grid gap-12 py-16 md:grid-cols-3">
        <div>
          <Image src={sierra.logo} alt="Sierra Immobilier" width={180} height={120} className="h-12 w-auto" />
          <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#A68936]">{sierra.servicesLine}</p>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed">{sierra.promise}</p>
          <p className="mt-3 text-[13px]">
            {sierra.address}
            <br />
            {sierra.postalCode} {sierra.city}
          </p>
        </div>
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.28em] text-white">Navigation</h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {sierraNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-[#A68936]">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`${sierra.basePath}/admin`} className="text-[#A68936] hover:text-white">
                Back-office
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.28em] text-white">Contact</h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            <li>
              <a href={sierra.phoneHref} className="hover:text-[#A68936]">
                {sierra.phone}
              </a>
            </li>
            <li>
              <a href={sierra.officialSite} target="_blank" rel="noopener noreferrer" className="hover:text-[#A68936]">
                sierra-immo.fr
              </a>
            </li>
          </ul>
          <ContactHint className="mt-4 !text-white/45" />
        </div>
      </Wrap>
      <div className="border-t border-white/10">
        <Wrap className="flex flex-col gap-3 py-6 text-[12px] text-white/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Proposition non officielle — portfolio NEXWORKS AGENCY.</p>
          <div className="flex gap-5">
            <Link href={`${sierra.basePath}/mentions-legales`} className="hover:text-white">
              Mentions légales
            </Link>
            <Link href={`${sierra.basePath}/confidentialite`} className="hover:text-white">
              Confidentialité
            </Link>
          </div>
        </Wrap>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      aria-label="Retour en haut"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 inline-flex size-12 items-center justify-center bg-[#A68936] text-white hover:bg-[#231F31]"
    >
      ↑
    </button>
  );
}

export function SierraShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === sierra.basePath;
  const isGate = pathname.startsWith(`${sierra.basePath}/acces`) || pathname.startsWith(`${sierra.basePath}/admin`);
  if (isGate) {
    return <>{children}</>;
  }
  return (
    <SierraExtrasProvider>
      <div className="min-h-dvh bg-[#FBFAF8] font-[family-name:var(--font-sierra-sans)] text-[#231F31] antialiased">
        <ScrollProgress />
        <Header isHome={isHome} />
        <main id="contenu" className={isHome ? "" : "pt-[114px]"}>
          {children}
        </main>
        <Footer />
        <FavoritesBar />
        <BackToTop />
      </div>
    </SierraExtrasProvider>
  );
}
