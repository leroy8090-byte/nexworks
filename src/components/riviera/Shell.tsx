"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { riviera, rivieraNav } from "@/data/riviera";
import { ContactHint, DemoBanner, RivieraButton, Wrap } from "./ui";

function Logo({ light }: { light: boolean }) {
  return (
    <Link
      href={riviera.basePath}
      aria-label={`${riviera.name} — Accueil`}
      className={`flex flex-col leading-none transition-colors ${light ? "text-[#FFFEFA]" : "text-[#24251F]"}`}
    >
      <span className="font-[family-name:var(--font-riviera-display)] text-[13px] font-medium tracking-[0.5em]">MAISON</span>
      <span className="mt-1 font-[family-name:var(--font-riviera-display)] text-[25px] font-medium tracking-[0.2em]">RIVIERA</span>
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
  const isActive = (href: string) => (href === riviera.basePath ? pathname === href : pathname.startsWith(href));

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <DemoBanner />
      <header
        className={`border-b transition-colors duration-500 ${
          transparent ? "border-transparent bg-transparent" : "border-[#D9CBB7]/60 bg-[#F6F3EC]/95 backdrop-blur"
        }`}
      >
        <Wrap className="flex h-[76px] items-center justify-between gap-6">
          <Logo light={transparent} />
          <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
            {rivieraNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={`text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${
                  transparent ? "text-[#FFFEFA]/90 hover:text-[#FFFEFA]" : "text-[#24251F] hover:text-[#68715B]"
                } ${isActive(n.href) ? "border-b border-current pb-1" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <RivieraButton
              href={`${riviera.basePath}/contact`}
              variant={transparent ? "light" : "primary"}
              className="hidden px-5 py-3 xl:inline-flex"
            >
              Confier mon projet
            </RivieraButton>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="riviera-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex size-11 flex-col items-center justify-center gap-[6px] lg:hidden ${
                transparent ? "text-[#FFFEFA]" : "text-[#24251F]"
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
              id="riviera-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[calc(100dvh-110px)] overflow-y-auto border-t border-[#D9CBB7]/60 bg-[#F6F3EC] lg:hidden"
            >
              <nav aria-label="Menu mobile" className="flex flex-col px-6 py-6">
                {rivieraNav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-[#D9CBB7]/60 py-4 font-[family-name:var(--font-riviera-display)] text-[1.9rem] font-light text-[#24251F]"
                  >
                    {n.label}
                  </Link>
                ))}
                <RivieraButton href={`${riviera.basePath}/contact`} className="mt-8" onClick={() => setOpen(false)}>
                  Confier mon projet
                </RivieraButton>
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
    <footer className="bg-[#24251F] text-[#D9CBB7]">
      <Wrap className="grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-riviera-display)] text-[13px] tracking-[0.5em] text-[#FFFEFA]">MAISON</p>
          <p className="mt-1 font-[family-name:var(--font-riviera-display)] text-[26px] tracking-[0.2em] text-[#FFFEFA]">RIVIERA</p>
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed">{riviera.promise}</p>
          <p className="mt-3 text-[13px] text-[#858178]">Concept fictif — {riviera.location}, {riviera.region}.</p>
        </div>
        <div>
          <h2 className="text-[11.5px] font-semibold uppercase tracking-[0.28em] text-[#FFFEFA]">Navigation</h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {rivieraNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-[#FFFEFA]">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[11.5px] font-semibold uppercase tracking-[0.28em] text-[#FFFEFA]">Contact</h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {riviera.phone && (
              <li>
                <a href={`tel:${riviera.phone.replace(/\s/g, "")}`} className="hover:text-[#FFFEFA]">
                  {riviera.phone}
                </a>
              </li>
            )}
            {riviera.email && (
              <li>
                <a href={`mailto:${riviera.email}`} className="hover:text-[#FFFEFA]">
                  {riviera.email}
                </a>
              </li>
            )}
            <li>
              <Link href={`${riviera.basePath}/contact`} className="hover:text-[#FFFEFA]">
                Formulaire de démonstration
              </Link>
            </li>
          </ul>
          <ContactHint className="mt-4 !text-[#858178]" />
        </div>
      </Wrap>
      <div className="border-t border-[#FFFEFA]/10">
        <Wrap className="flex flex-col gap-3 py-6 text-[12.5px] text-[#858178] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {riviera.name}. Projet de démonstration fictif réalisé pour le portfolio NEXWORKS AGENCY.
          </p>
          <div className="flex gap-5">
            <Link href={`${riviera.basePath}/mentions-legales`} className="hover:text-[#FFFEFA]">
              Mentions légales
            </Link>
            <Link href={`${riviera.basePath}/confidentialite`} className="hover:text-[#FFFEFA]">
              Confidentialité
            </Link>
          </div>
        </Wrap>
      </div>
    </footer>
  );
}

export function RivieraShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === riviera.basePath;
  return (
    <div className="min-h-dvh bg-[#F6F3EC] font-[family-name:var(--font-riviera-sans)] text-[#24251F] antialiased">
      <Header isHome={isHome} />
      <main id="contenu" className={isHome ? "" : "pt-[112px]"}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
