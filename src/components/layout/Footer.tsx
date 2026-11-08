"use client";

import Link from "next/link";
import { navigationFor, siteConfig } from "@/config/site";
import { servicesFor, servicePagePathFor } from "@/data/localized";
import { pagePath } from "@/i18n/lang";
import { useLang } from "@/i18n/use-lang";
import { Container } from "@/components/ui/Section";
import { Instagram, Linkedin, Mail } from "@/components/ui/Icons";
import { LangSwitch } from "./LangSwitch";
import { Logo } from "./Logo";

const T = {
  fr: { tagline: "Des sites clairs, faciles à trouver, et un accompagnement qui ne s'arrête pas à la mise en ligne.", services: "Services", site: "Navigation du site", legal: "Mentions légales", privacy: "Confidentialité", rights: "Tous droits réservés." },
  en: { tagline: "Clear websites that are easy to find, and support that doesn't stop at launch.", services: "Services", site: "Site navigation", legal: "Legal notice", privacy: "Privacy policy", rights: "All rights reserved." },
};

const linkCls = "text-[15px] text-mist transition-colors hover:text-white";
const navLinkCls = `${linkCls} inline-block py-1.5`;
const titleCls = "text-sm font-bold text-white";

export function Footer() {
  const lang = useLang();
  const t = T[lang];
  const navigation = navigationFor(lang);
  const services = servicesFor(lang);
  const year = new Date().getFullYear();
  const { contactEmail, social } = siteConfig;
  return (
    <footer className="relative overflow-hidden bg-ink">
      <Container className="pb-8 pt-16 sm:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo lang={lang} className="h-9" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mist">
              {t.tagline}
            </p>
            <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
              {contactEmail && (
                <li>
                  <a href={`mailto:${contactEmail}`} className={`${linkCls} inline-flex min-h-11 items-center gap-2`}>
                    <Mail className="size-4 text-sky" />
                    {contactEmail}
                  </a>
                </li>
              )}
              {social.linkedin && (
                <li>
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`${linkCls} inline-flex size-11 items-center justify-center`}>
                    <Linkedin className="size-5" />
                  </a>
                </li>
              )}
              {social.instagram && (
                <li>
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`${linkCls} inline-flex size-11 items-center justify-center`}>
                    <Instagram className="size-5" />
                  </a>
                </li>
              )}
            </ul>
            <LangSwitch className="mt-4" />
          </div>

          <nav aria-label={t.services}>
            <h2 className={titleCls}>{t.services}</h2>
            <ul className="mt-3 space-y-1">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={servicePagePathFor(lang, s.id)} className={navLinkCls}>
                    {s.plainTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.site}>
            <h2 className={titleCls}>NEXWORKS</h2>
            <ul className="mt-3 space-y-1">
              {navigation.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={navLinkCls}>
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={pagePath(lang, "legal")} className={navLinkCls}>
                  {t.legal}
                </Link>
              </li>
              <li>
                <Link href={pagePath(lang, "privacy")} className={navLinkCls}>
                  {t.privacy}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-14 border-t border-white/10 pt-6 text-sm text-mist">© {year} {siteConfig.name}. {t.rights}</p>
      </Container>

      {/* Filigrane décoratif : le mot est dessiné en CSS (pas de texte dans la page, rien à lire ni à contrôler) */}
      <p aria-hidden data-word="NEXWORKS" className="pointer-events-none -mb-[0.2em] select-none whitespace-nowrap text-center font-display text-[18.5vw] font-extrabold leading-[0.9] tracking-[-0.05em] text-white/[0.05] before:content-[attr(data-word)]" />
    </footer>
  );
}
