"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sierra, sierraNav } from "@/data/sierra";
import { ContactHint, DemoBanner, SierraButton, Wrap } from "./ui";

function Logo({ light }: { light: boolean }) {
  return (
    <Link
      href={sierra.basePath}
      aria-label={`${sierra.name} — Accueil`}
      className={`flex flex-col leading-none transition-colors ${light ? "text-[#FCFBF8]" : "text-[#222421]"}`}
    >
      <span className="font-[family-name:var(--font-sierra-display)] text-[12px] font-medium tracking-[0.42em]">SIERRA</span>
      <span className="mt-1 font-[family-name:var(--font-sierra-display)] text-[22px] font-medium tracking-[0.22em]">IMMOBILIER</span>
    </Link>
  );
}

function Header({ isHome }: { isHome: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
  const isActive = (href: string) => (href === sierra.basePath ? pathname === href : pathname.startsWith(href));

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <DemoBanner />
      <header
        className={`border-b transition-colors duration-500 ${
          transparent ? "border-transparent bg-transparent" : "border-[#D8C9B5]/70 bg-[#F5F2EC]/95 backdrop-blur"
        }`}
      >
        <Wrap className="flex h-[78px] items-center justify-between gap-6">
          <Logo light={transparent} />
          <nav aria-label="Navigation principale" className="hidden items-center gap-6 xl:flex">
            {sierraNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={`text-[11.5px] font-medium uppercase tracking-[0.16em] transition-colors ${
                  transparent ? "text-[#FCFBF8]/90 hover:text-[#FCFBF8]" : "text-[#222421] hover:text-[#263B48]"
                } ${isActive(n.href) ? "border-b border-current pb-1" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <SierraButton
              href={`${sierra.basePath}/estimation`}
              variant={transparent ? "light" : "primary"}
              className="hidden px-5 py-3 lg:inline-flex"
            >
              Estimer mon bien
            </SierraButton>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="sierra-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex size-11 flex-col items-center justify-center gap-[6px] xl:hidden ${
                transparent ? "text-[#FCFBF8]" : "text-[#222421]"
              }`}
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
              className="h-[calc(100dvh-112px)] overflow-y-auto border-t border-[#D8C9B5]/70 bg-[#F5F2EC] xl:hidden"
            >
              <nav aria-label="Menu mobile" className="flex flex-col px-6 py-6">
                {sierraNav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-[#D8C9B5]/70 py-4 font-[family-name:var(--font-sierra-display)] text-[1.85rem] font-light text-[#222421]"
                  >
                    {n.label}
                  </Link>
                ))}
                <SierraButton href={`${sierra.basePath}/estimation`} className="mt-8" onClick={() => setOpen(false)}>
                  Estimer mon bien
                </SierraButton>
                <a href={sierra.phoneHref} className="mt-4 text-center text-[13px] font-semibold tracking-wide text-[#263B48]">
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
    <footer className="bg-[#222421] text-[#D8C9B5]">
      <Wrap className="grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-sierra-display)] text-[12px] tracking-[0.42em] text-[#FCFBF8]">SIERRA</p>
          <p className="mt-1 font-[family-name:var(--font-sierra-display)] text-[24px] tracking-[0.2em] text-[#FCFBF8]">IMMOBILIER</p>
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed">{sierra.promise}</p>
          <p className="mt-3 text-[13px] text-[#77766F]">
            {sierra.address}, {sierra.postalCode} {sierra.city}
          </p>
          <p className="mt-2 text-[12.5px] text-[#77766F]">
            Membre {sierra.memberships.join(" · ")} (informations publiques).
          </p>
        </div>
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FCFBF8]">Navigation</h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {sierraNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-[#FCFBF8]">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`${sierra.basePath}/gestion-locative`} className="hover:text-[#FCFBF8]">
                Gestion locative
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FCFBF8]">Contact</h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            <li>
              <a href={sierra.phoneHref} className="hover:text-[#FCFBF8]">
                {sierra.phone}
              </a>
            </li>
            <li>
              <a href={sierra.officialSite} target="_blank" rel="noopener noreferrer" className="hover:text-[#FCFBF8]">
                Site officiel
              </a>
            </li>
            <li>
              <Link href={`${sierra.basePath}/contact`} className="hover:text-[#FCFBF8]">
                Formulaire (démonstration)
              </Link>
            </li>
          </ul>
          <ContactHint className="mt-4 !text-[#77766F]" />
        </div>
      </Wrap>
      <div className="border-t border-[#FCFBF8]/10">
        <Wrap className="flex flex-col gap-3 py-6 text-[12.5px] text-[#77766F] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Proposition de refonte non officielle — portfolio NEXWORKS AGENCY. Sierra Immobilier reste propriétaire de sa marque.
          </p>
          <div className="flex gap-5">
            <Link href={`${sierra.basePath}/mentions-legales`} className="hover:text-[#FCFBF8]">
              Mentions légales
            </Link>
            <Link href={`${sierra.basePath}/confidentialite`} className="hover:text-[#FCFBF8]">
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
      className="fixed bottom-6 right-6 z-40 inline-flex size-12 items-center justify-center bg-[#263B48] text-[#FCFBF8] transition-colors hover:bg-[#222421]"
    >
      ↑
    </button>
  );
}

export function SierraShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === sierra.basePath;
  return (
    <div className="min-h-dvh bg-[#F5F2EC] font-[family-name:var(--font-sierra-sans)] text-[#222421] antialiased">
      <Header isHome={isHome} />
      <main id="contenu" className={isHome ? "" : "pt-[114px]"}>
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
