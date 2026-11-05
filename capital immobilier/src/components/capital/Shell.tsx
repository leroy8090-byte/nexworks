"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { capital, capitalNav, communes } from "@/data/capital";
import { SocialIcon, SOCIALS, type SocialLinks } from "@/lib/social-icons";
import { CapButton, DemoBanner, serif, Wrap } from "./ui";

function Logo({ light }: { light: boolean }) {
  return (
    <Link href={capital.basePath} aria-label={`${capital.name} — Accueil`} className="relative block h-[43px] w-[200px] shrink-0 min-[375px]:h-[50px] min-[375px]:w-[234px] sm:h-[58px] sm:w-[271px]">
      {/* Les deux versions restent montées pour un fondu sans rechargement au scroll. */}
      <Image src="/capital-immobilier/logo-light.png" alt="" fill sizes="271px" loading="eager" className={`object-contain object-left transition-opacity duration-500 ${light ? "opacity-100" : "opacity-0"}`} />
      <Image src="/capital-immobilier/logo-dark.png" alt="" fill sizes="271px" loading="eager" className={`object-contain object-left transition-opacity duration-500 ${light ? "opacity-0" : "opacity-100"}`} />
    </Link>
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const transparent = isHome && !scrolled && !open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <DemoBanner />
      <header className={`border-b transition-colors duration-500 ${transparent ? "border-transparent bg-gradient-to-b from-[#183B50]/45 to-transparent" : "border-[#E8E0D4] bg-[#F8F7F3]/95 backdrop-blur"}`}>
        <Wrap className="flex h-[78px] items-center justify-between gap-6">
          <Logo light={transparent} />
          <nav aria-label="Navigation principale" className="hidden items-center gap-6 xl:flex">
            {capitalNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={`relative text-[13.5px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  transparent ? "text-[#F8F7F3]" : "text-[#252A2D] hover:text-[#183B50]"
                } ${isActive(n.href) ? "after:scale-x-100" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <CapButton href={`${capital.basePath}/estimation`} variant={transparent ? "sand" : "primary"} arrow={false} className="max-sm:!hidden !px-5 !py-3">
              Estimer mon bien
            </CapButton>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="capital-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex size-11 flex-col items-center justify-center gap-[6px] xl:hidden ${transparent ? "text-[#F8F7F3]" : "text-[#183B50]"}`}
            >
              <span className={`block h-px w-6 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </Wrap>
        <AnimatePresence>
          {open && (
            <motion.div
              id="capital-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="h-[calc(100dvh-112px)] overflow-y-auto border-t border-[#E8E0D4] bg-[#F8F7F3] xl:hidden"
            >
              <nav aria-label="Menu mobile" className="flex flex-col px-6 py-4">
                {capitalNav.map((n) => (
                  <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className={`${serif} border-b border-[#E8E0D4] py-3.5 text-[1.8rem] text-[#252A2D]`}>
                    {n.label}
                  </Link>
                ))}
                <CapButton href={`${capital.basePath}/estimation`} className="mt-7" onClick={() => setOpen(false)}>
                  Estimer mon bien
                </CapButton>
                <a href={`tel:${capital.phoneHref}`} className="mt-5 text-center text-[15px] font-semibold text-[#183B50]">
                  {capital.phone}
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}

function Footer({ socials }: { socials: SocialLinks }) {
  const b = capital.basePath;
  return (
    <footer className="bg-[#183B50] text-[#E8E0D4]">
      <Wrap className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/capital-immobilier/logo-stacked-light.png" alt={capital.name} width={969} height={718} sizes="190px" className="h-auto w-[190px]" />
          <address className="mt-6 text-[14px] not-italic leading-relaxed">
            {capital.address.street}
            <br />
            {capital.address.postalCode} {capital.address.city}
          </address>
          <ul className="mt-4 space-y-1.5 text-[14px]">
            <li>
              <a href={`tel:${capital.phoneHref}`} className="hover:text-white">
                {capital.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${capital.email}`} className="break-all hover:text-white">
                {capital.email}
              </a>
            </li>
          </ul>
          {SOCIALS.some((n) => socials[n.key]) && (
            <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Réseaux sociaux">
              {SOCIALS.filter((n) => socials[n.key]).map((n) => (
                <li key={n.key}>
                  <a href={socials[n.key]} target="_blank" rel="noopener noreferrer" aria-label={n.label} title={n.label} className="grid size-10 place-items-center rounded-full border border-[#F8F7F3]/25 text-[#F8F7F3] transition-colors hover:bg-[#F8F7F3] hover:text-[#183B50]">
                    <SocialIcon path={n.path} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2 className="cap-label text-[12px] font-semibold uppercase tracking-[0.24em] text-[#F8F7F3]">Navigation</h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {[...capitalNav, { label: "Nos biens", href: `${b}/biens` }, { label: "Gestion de copropriété", href: `${b}/gestion-copropriete` }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="cap-label text-[12px] font-semibold uppercase tracking-[0.24em] text-[#F8F7F3]">Nos secteurs</h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {communes.map((c) => (
              <li key={c.slug}>
                <Link href={`${b}/secteurs/${c.slug}`} className="hover:text-white">
                  Immobilier à {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="cap-label text-[12px] font-semibold uppercase tracking-[0.24em] text-[#F8F7F3]">À savoir</h2>
          <p className="mt-5 text-[13.5px] leading-relaxed text-[#E8E0D4]/80">
            Ce site est un concept de refonte réalisé par NEXWORKS AGENCY. Les annonces sont des biens de test et les photographies sont des illustrations. Le site officiel de l&apos;agence reste{" "}
            <a href={capital.publicSite} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              capitalimmobilier.fr
            </a>
            .
          </p>
          <Link href="/realisations/capital-immobilier" className="mt-4 inline-block text-[13.5px] underline underline-offset-2 hover:text-white">
            Voir la fiche de réalisation
          </Link>
        </div>
      </Wrap>
      <div className="border-t border-[#F8F7F3]/10">
        <Wrap className="flex flex-col gap-3 py-6 text-[12.5px] text-[#E8E0D4]/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Concept de refonte NEXWORKS AGENCY pour CAPITAL IMMOBILIER — démonstration.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href={`${b}/mentions-legales`} className="hover:text-white">
              Mentions légales
            </Link>
            <Link href={`${b}/confidentialite`} className="hover:text-white">
              Confidentialité
            </Link>
            <Link href={`${b}/credits-photos`} className="hover:text-white">
              Crédits photos
            </Link>
          </div>
        </Wrap>
      </div>
    </footer>
  );
}

export function CapitalShell({ children, socials }: { children: ReactNode; socials: SocialLinks }) {
  const pathname = usePathname();
  const isHome = pathname === capital.basePath;
  return (
    <div className="min-h-dvh bg-[#F8F7F3] font-[family-name:var(--font-cap-sans)] text-[#252A2D] antialiased">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2">
        Aller au contenu
      </a>
      <Header isHome={isHome} />
      <main id="contenu" className={isHome ? "" : "pt-[112px]"}>
        {children}
      </main>
      <Footer socials={socials} />
    </div>
  );
}
