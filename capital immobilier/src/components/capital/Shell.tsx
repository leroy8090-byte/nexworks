"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { capital, capitalNav, communes } from "@/data/capital";
import { SocialIcon, SOCIALS, type SocialLinks } from "@/lib/social-icons";
import { useFavorites } from "./favorites";
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

function Header() {
  const [open, setOpen] = useState(false);
  const [away, setAway] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    let last = window.scrollY;
    // L'en-tête s'efface quand on lit et revient dès qu'on remonte.
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 6) {
        const hide = y > last && y > 500;
        setAway(hide);
        // La barre de filtres se place juste sous l'en-tête quand il est visible.
        document.documentElement.style.setProperty("--cap-sticky", hide ? "12px" : "124px");
        last = y;
      }
    };
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

  const transparent = false;
  const favorites = useFavorites();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out ${away && !open ? "-translate-y-full" : ""}`}>
      <DemoBanner />
      <header className={`border-b transition-colors duration-500 ${transparent ? "border-transparent bg-transparent" : "border-[#F0E4CE] bg-[#FBF7EE]/95 backdrop-blur"}`}>
        <Wrap className="flex h-[78px] items-center justify-between gap-6">
          <Logo light={transparent} />
          <nav aria-label="Navigation principale" className="hidden items-center gap-6 xl:flex">
            {capitalNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={`relative text-[13.5px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  transparent ? "text-[#FBF7EE]" : "text-[#1F2D33] hover:text-[#0E4F68]"
                } ${isActive(n.href) ? "after:scale-x-100" : ""}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href={`${capital.basePath}/favoris`} aria-label={`Mes favoris (${favorites.length})`} className="relative grid size-11 place-items-center rounded-full text-[#B94F33] transition-colors hover:bg-[#F0E4CE]">
              <svg viewBox="0 0 24 24" aria-hidden className={`size-6 ${favorites.length ? "fill-current" : "fill-none"}`} stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 20.5S3.5 15.3 3.5 9.2A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 8.5 2.7c0 6.1-8.5 11.3-8.5 11.3Z" /></svg>
              {favorites.length > 0 && <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-[#0E4F68] text-[11px] font-bold text-white">{favorites.length}</span>}
            </Link>
            <CapButton href={`${capital.basePath}/estimation`} variant={transparent ? "sand" : "primary"} arrow={false} className="max-sm:!hidden !px-5 !py-3">
              Estimer mon bien
            </CapButton>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="capital-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex size-11 flex-col items-center justify-center gap-[6px] xl:hidden ${transparent ? "text-[#FBF7EE]" : "text-[#0E4F68]"}`}
            >
              <span className={`block h-px w-6 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </Wrap>
        <motion.span aria-hidden style={{ scaleX: scrollYProgress }} className="block h-0.5 origin-left bg-[#B94F33]" />
        <AnimatePresence>
          {open && (
            <motion.div
              id="capital-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="h-[calc(100dvh-112px)] overflow-y-auto border-t border-[#F0E4CE] bg-[#FBF7EE] xl:hidden"
            >
              <nav aria-label="Menu mobile" className="flex flex-col px-6 py-4">
                {capitalNav.map((n) => (
                  <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className={`${serif} border-b border-[#F0E4CE] py-3.5 text-[1.8rem] text-[#1F2D33]`}>
                    {n.label}
                  </Link>
                ))}
                <CapButton href={`${capital.basePath}/estimation`} className="mt-7" onClick={() => setOpen(false)}>
                  Estimer mon bien
                </CapButton>
                <a href={`tel:${capital.phoneHref}`} className="mt-5 text-center text-[15px] font-semibold text-[#0E4F68]">
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
    <footer className="relative bg-[#0B3A4C] pb-16 pt-6 text-[#F0E4CE] sm:pb-0">
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
                  <a href={socials[n.key]} target="_blank" rel="noopener noreferrer" aria-label={n.label} title={n.label} className="grid size-10 place-items-center rounded-full border border-[#FBF7EE]/25 text-[#FBF7EE] transition-colors hover:bg-[#FBF7EE] hover:text-[#0E4F68]">
                    <SocialIcon path={n.path} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2 className="cap-label text-[12px] font-semibold uppercase tracking-[0.24em] text-[#FBF7EE]">Navigation</h2>
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
          <h2 className="cap-label text-[12px] font-semibold uppercase tracking-[0.24em] text-[#FBF7EE]">Nos secteurs</h2>
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
          <h2 className="cap-label text-[12px] font-semibold uppercase tracking-[0.24em] text-[#FBF7EE]">À savoir</h2>
          <p className="mt-5 text-[13.5px] leading-relaxed text-[#F0E4CE]/80">
            Ce site est un concept de refonte réalisé par NEXWORKS AGENCY. Les annonces sont des biens de test et les photographies sont des illustrations. Le site officiel de l&apos;agence reste{" "}
            <a href={capital.publicSite} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              capitalimmobilier.fr
            </a>
            .
          </p>
          <a href="https://www.nexworks.agency" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-[13.5px] underline underline-offset-2 hover:text-white">
            Découvrir NEXWORKS AGENCY
          </a>
        </div>
      </Wrap>
      <div className="border-t border-[#FBF7EE]/10">
        <Wrap className="flex flex-col gap-3 py-6 text-[12.5px] text-[#F0E4CE]/70 sm:flex-row sm:items-center sm:justify-between">
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
  return (
    <div className="min-h-dvh bg-[#FBF7EE] font-[family-name:var(--font-cap-sans)] text-[#1F2D33] antialiased">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" className="pt-[112px]">
        {children}
      </main>
      {/* Sur téléphone, les deux actions utiles restent à portée de pouce. */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-[#F0E4CE] bg-[#FBF7EE]/95 p-2 backdrop-blur sm:hidden">
        <Link href={`${capital.basePath}/biens`} className="grid h-12 place-items-center bg-[#0E4F68] text-[14px] font-semibold text-[#FBF7EE]">Voir les biens</Link>
        <Link href={`${capital.basePath}/contact`} className="grid h-12 place-items-center border border-[#0E4F68]/40 text-[14px] font-semibold text-[#0E4F68]">Contacter l&apos;agence</Link>
      </div>
      <Footer socials={socials} />
    </div>
  );
}
