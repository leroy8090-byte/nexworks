"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { azur, azurNav, azurServices } from "@/data/azur";
import { AzurButton, ContactHint, DemoBanner, Wrap } from "./ui";
import { AzurIcons } from "./Icons";

function Logo({ compact }: { compact?: boolean }) {
  return (
    <Link href={azur.basePath} className="inline-flex shrink-0 items-center" aria-label={`${azur.name} — Accueil`}>
      <Image
        src="/azur/logo.webp"
        alt={azur.name}
        width={compact ? 140 : 168}
        height={compact ? 140 : 168}
        priority
        className={compact ? "h-11 w-auto" : "h-12 w-auto sm:h-14"}
      />
    </Link>
  );
}

export function AzurHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  return (
    <header className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_8px_30px_-18px_rgba(16,42,67,.35)]" : ""} border-[#E4EBF1]`}>
      <Wrap className="flex h-[72px] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Navigation principale" className="hidden items-center gap-5 text-[14px] font-semibold text-[#002D72] lg:flex">
          {azurNav.map((n) => (
            <Link key={n.href} href={n.href} className="transition hover:text-[#0077C2]">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <AzurButton href="/azur-plomberie/contact" className="hidden px-5 py-2.5 text-[14px] sm:inline-flex">
            Demander un devis
          </AzurButton>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-[#E4EBF1] text-[#002D72] lg:hidden"
            aria-expanded={open}
            aria-controls="azur-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <AzurIcons.close className="size-5" /> : <AzurIcons.menu className="size-5" />}
          </button>
        </div>
      </Wrap>

      <AnimatePresence>
        {open && (
          <motion.div
            id="azur-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[#E4EBF1] bg-white lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Menu mobile">
              {azurNav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-[16px] font-semibold text-[#002D72] hover:bg-[#F3F6F8]"
                >
                  {n.label}
                </Link>
              ))}
              <AzurButton href="/azur-plomberie/contact" className="mt-2 w-full" onClick={() => setOpen(false)}>
                Demander un devis
              </AzurButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function AzurFooter() {
  return (
    <footer className="bg-[#002D72] text-[#A8B8C8]">
      <Wrap className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="inline-flex rounded-2xl bg-white p-1.5 shadow-sm">
            <Image src="/azur/logo.webp" alt={azur.name} width={168} height={168} className="h-16 w-auto" />
          </div>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed">{azur.promise}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-[#7f93a8]">
            Concept fictif situé à {azur.location}, sur la {azur.region}.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Navigation</h2>
          <ul className="mt-4 space-y-2 text-[14px]">
            {azurNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-[#4FC3F7]">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Services</h2>
          <ul className="mt-4 space-y-2 text-[14px]">
            {azurServices.map((s) => (
              <li key={s.slug}>
                <Link href={s.href ?? `/azur-plomberie/services/${s.slug}`} className="hover:text-[#4FC3F7]">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Contact</h2>
          <ul className="mt-4 space-y-2 text-[14px]">
            {azur.phone ? (
              <li>
                <a href={`tel:${azur.phone.replace(/\s/g, "")}`} className="hover:text-[#4FC3F7]">
                  {azur.phone}
                </a>
              </li>
            ) : (
              <li>Téléphone non configuré</li>
            )}
            {azur.email ? (
              <li>
                <a href={`mailto:${azur.email}`} className="hover:text-[#4FC3F7]">
                  {azur.email}
                </a>
              </li>
            ) : (
              <li>E-mail non configuré</li>
            )}
            <li>
              <Link href="/azur-plomberie/zone-d-intervention" className="hover:text-[#4FC3F7]">
                Zone d&apos;intervention indicative
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            <ContactHint />
          </div>
        </div>
      </Wrap>
      <div className="border-t border-white/10">
        <Wrap className="flex flex-col gap-3 py-5 text-[12.5px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {azur.name}. Projet de démonstration fictif réalisé pour le portfolio NEXWORKS AGENCY.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/azur-plomberie/mentions-legales" className="hover:text-white">
              Mentions légales
            </Link>
            <Link href="/azur-plomberie/confidentialite" className="hover:text-white">
              Confidentialité
            </Link>
          </div>
        </Wrap>
      </div>
    </footer>
  );
}

export function AzurShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-white font-[family-name:var(--font-azur-sans)] text-[#002D72] antialiased">
      <DemoBanner />
      <AzurHeader />
      <main id="contenu">{children}</main>
      <AzurFooter />
      {/* Barre mobile */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[#E4EBF1] bg-white/95 p-2.5 backdrop-blur sm:hidden">
        {azur.phone ? (
          <a href={`tel:${azur.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 rounded-full bg-[#4FC3F7] py-3 text-[14px] font-bold text-[#002D72]">
            <AzurIcons.phone className="size-4" />
            Appeler
          </a>
        ) : (
          <Link href="/azur-plomberie/contact" className="flex items-center justify-center rounded-full bg-[#E3F6FD] py-3 text-[14px] font-bold text-[#002D72]">
            Contact
          </Link>
        )}
        <Link href="/azur-plomberie/contact" className="flex items-center justify-center rounded-full bg-[#FFC107] py-3 text-[14px] font-bold text-[#002D72]">
          Demander un devis
        </Link>
      </div>
      <div className="h-16 sm:hidden" aria-hidden />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  alt: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#002D72]">
      <Image src={image} alt="" fill priority className="object-cover opacity-35" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#002D72] via-[#002D72]/85 to-[#002D72]/35" />
      <Wrap className="relative py-16 sm:py-24">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#4FC3F7]">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-azur-display)] text-[2.4rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[3.2rem]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75">{text}</p>
        <span className="sr-only">{alt}</span>
      </Wrap>
    </section>
  );
}
