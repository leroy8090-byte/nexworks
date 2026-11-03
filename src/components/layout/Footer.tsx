import Link from "next/link";
import { navigation, siteConfig } from "@/config/site";
import { sectors } from "@/data/content";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Section";
import { Instagram, Linkedin, Mail } from "@/components/ui/Icons";
import { Logo } from "./Logo";

const linkCls = "text-sm text-mist transition-colors hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();
  const { contactEmail, social } = siteConfig;
  return (
    <footer className="relative border-t border-white/[0.07] bg-ink-2">
      <div className="hairline-b absolute inset-x-0 top-0" aria-hidden />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-10" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">{siteConfig.promise}</p>
            <ul className="mt-6 flex flex-wrap items-center gap-3">
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
            <h2 className="font-display text-sm font-semibold text-white">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className={linkCls}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Secteurs">
            <h2 className="font-display text-sm font-semibold text-white">Secteurs</h2>
            <ul className="mt-5 space-y-3">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link href={`/secteurs/${s.slug}`} className={linkCls}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Navigation du site">
            <h2 className="font-display text-sm font-semibold text-white">NEXWORKS</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={linkCls}>
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/confidentialite" className={linkCls}>
                  Confidentialité
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.07] pt-6 text-xs text-mist/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. Tous droits réservés.</p>
          <p>{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
