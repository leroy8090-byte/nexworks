"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { volt, voltNav } from "@/data/volt";
import { ContactHint, DemoBanner, VoltButton, Wrap } from "./ui";

function Logo() {
  return (
    <Link href={volt.basePath} aria-label={`${volt.name} — Accueil`} className="flex items-baseline gap-2 leading-none text-[#F5F5F0]">
      <span className="font-[family-name:var(--font-volt-display)] text-[2.2rem] tracking-[0.04em]">
        VOLT<span className="text-[#C6FF3D]">.</span>
      </span>
      <span className="hidden text-[9.5px] font-extrabold uppercase tracking-[0.32em] text-[#F5F5F0]/70 sm:block">
        FITNESS CLUB
      </span>
    </Link>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div className="h-full origin-left bg-[#C6FF3D]" style={{ transform: `scaleX(${p})` }} />
    </div>
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
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Retour en haut de page"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            })
          }
          className="fixed bottom-6 right-6 z-40 inline-flex size-12 items-center justify-center bg-[#C6FF3D] text-[#101010] transition-colors hover:bg-[#F5F5F0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF3D]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function Header({ isHome }: { isHome: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

  const transparent = isHome && !scrolled && !open;
  const isActive = (href: string) => (href === volt.basePath ? pathname === href : pathname.startsWith(href));

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <DemoBanner />
      <header
        className={`border-b transition-colors duration-500 ${
          transparent ? "border-transparent bg-transparent" : "border-[#F5F5F0]/10 bg-[#101010]/95 backdrop-blur"
        }`}
      >
        <Wrap className="flex h-[72px] items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
            {voltNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={`border-b-2 pb-1 text-[12px] font-bold uppercase tracking-[0.16em] transition-colors hover:text-[#C6FF3D] ${
                  isActive(n.href) ? "border-[#C6FF3D] text-[#C6FF3D]" : "border-transparent text-[#F5F5F0]"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <VoltButton href={`${volt.basePath}/contact?cours=essai`} className="hidden px-5 py-3 xl:inline-flex">
              ESSAYER LE CLUB
            </VoltButton>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="volt-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-11 flex-col items-center justify-center gap-[6px] text-[#F5F5F0] lg:hidden"
            >
              <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </button>
          </div>
        </Wrap>
        <AnimatePresence>
          {open && (
            <motion.div
              id="volt-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="h-[calc(100dvh-108px)] overflow-y-auto border-t border-[#F5F5F0]/10 bg-[#101010] lg:hidden"
            >
              <nav aria-label="Menu mobile" className="flex flex-col px-6 py-6">
                {voltNav.map((n, i) => (
                  <motion.div key={n.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className={`block border-b border-[#F5F5F0]/10 py-3 font-[family-name:var(--font-volt-display)] text-[2.8rem] uppercase leading-none ${
                        isActive(n.href) ? "text-[#C6FF3D]" : "text-[#F5F5F0]"
                      }`}
                    >
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
                <VoltButton href={`${volt.basePath}/contact?cours=essai`} className="mt-8" onClick={() => setOpen(false)}>
                  ESSAYER LE CLUB
                </VoltButton>
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
    <footer className="border-t border-[#F5F5F0]/10 bg-[#101010] text-[#F5F5F0]/70">
      <Wrap className="grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-volt-display)] text-[3rem] leading-none text-[#F5F5F0]">
            VOLT<span className="text-[#C6FF3D]">.</span>
          </p>
          <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.34em] text-[#F5F5F0]/70">FITNESS CLUB</p>
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed">{volt.promise}</p>
          <p className="mt-3 text-[13px] text-[#858585]">
            Concept fictif — {volt.location}, {volt.region}.
          </p>
        </div>
        <div>
          <h2 className="text-[11.5px] font-extrabold uppercase tracking-[0.28em] text-[#C6FF3D]">Navigation</h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {voltNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-[#C6FF3D]">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[11.5px] font-extrabold uppercase tracking-[0.28em] text-[#C6FF3D]">Contact</h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {volt.phone && (
              <li>
                <a href={`tel:${volt.phone.replace(/\s/g, "")}`} className="hover:text-[#C6FF3D]">
                  {volt.phone}
                </a>
              </li>
            )}
            {volt.email && (
              <li>
                <a href={`mailto:${volt.email}`} className="hover:text-[#C6FF3D]">
                  {volt.email}
                </a>
              </li>
            )}
            <li>
              <Link href={`${volt.basePath}/contact`} className="hover:text-[#C6FF3D]">
                Formulaire de démonstration
              </Link>
            </li>
          </ul>
          <ContactHint className="mt-4" />
        </div>
      </Wrap>
      <div className="border-t border-[#F5F5F0]/10">
        <Wrap className="flex flex-col gap-3 py-6 text-[12.5px] text-[#858585] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {volt.name}. Projet de démonstration fictif — site conçu par{" "}
            <Link href="/" className="underline underline-offset-2 hover:text-[#C6FF3D]">
              NEXWORKS AGENCY
            </Link>
            .
          </p>
          <div className="flex gap-5">
            <Link href={`${volt.basePath}/mentions-legales`} className="hover:text-[#C6FF3D]">
              Mentions légales
            </Link>
            <Link href={`${volt.basePath}/confidentialite`} className="hover:text-[#C6FF3D]">
              Confidentialité
            </Link>
          </div>
        </Wrap>
      </div>
    </footer>
  );
}

export function VoltShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === volt.basePath;
  return (
    <div className="min-h-dvh bg-[#101010] font-[family-name:var(--font-volt-sans)] text-[#F5F5F0] antialiased selection:bg-[#C6FF3D] selection:text-[#101010]">
      <ScrollProgress />
      <Header isHome={isHome} />
      <main id="contenu" className={isHome ? "" : "pt-[108px]"}>
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
