import Link from "next/link";
import { navigation, siteConfig } from "@/config/site";
import { servicePagePath } from "@/data/service-pages";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Section";
import { Instagram, Linkedin, Mail } from "@/components/ui/Icons";
import { Logo } from "./Logo";

const linkCls = "text-[15px] text-mist transition-colors hover:text-white";
const titleCls = "text-sm font-bold text-white";

export function Footer() {
  const year = new Date().getFullYear();
  const { contactEmail, social } = siteConfig;
  return (
    <footer className="relative overflow-hidden bg-ink">
      <Container className="pb-8 pt-16 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo className="h-9" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mist">
              Des sites clairs, faciles à trouver, et un accompagnement qui ne s&apos;arrête pas à la mise en ligne.
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-4">
              {contactEmail && (
                <li>
                  <a href={`mailto:${contactEmail}`} className={`${linkCls} inline-flex items-center gap-2`}>
                    <Mail className="size-4 text-sky" />
                    {contactEmail}
                  </a>
                </li>
              )}
              {social.linkedin && (
                <li>
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={linkCls}>
                    <Linkedin className="size-5" />
                  </a>
                </li>
              )}
              {social.instagram && (
                <li>
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={linkCls}>
                    <Instagram className="size-5" />
                  </a>
                </li>
              )}
            </ul>
          </div>

          <nav aria-label="Services">
            <h2 className={titleCls}>Services</h2>
            <ul className="mt-4 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={servicePagePath(s.id)} className={linkCls}>
                    {s.plainTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Navigation du site">
            <h2 className={titleCls}>NEXWORKS</h2>
            <ul className="mt-4 space-y-3">
              {navigation.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={linkCls}>
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/mentions-legales" className={linkCls}>
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className={linkCls}>
                  Confidentialité
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-14 border-t border-white/10 pt-6 text-sm text-mist">© {year} {siteConfig.name}. Tous droits réservés.</p>
      </Container>

      {/* Filigrane décoratif : le mot est dessiné en CSS (pas de texte dans la page, rien à lire ni à contrôler) */}
      <p aria-hidden data-word="NEXWORKS" className="pointer-events-none -mb-[0.2em] select-none whitespace-nowrap text-center font-display text-[18.5vw] font-extrabold leading-[0.9] tracking-[-0.05em] text-white/[0.05] before:content-[attr(data-word)]" />
    </footer>
  );
}
