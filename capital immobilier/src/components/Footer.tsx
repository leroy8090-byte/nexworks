import Image from "next/image";
import Link from "next/link";
import { agency, LIVE } from "@/data/agency";
import { ConsentLink } from "./Cookies";
import { eyebrowCls } from "./ui";

const COLS = [
  { title: "Services", links: [["Transaction", "/acheter"], ["Location", "/louer"], ["Location de vacances", "/location-vacances"], ["Gestion locative", "/gestion-locative"], ["Syndic de copropriété", "/syndic"], ["ASL et ASA", "/asl-asa"]] },
  { title: "Navigation", links: [["Toutes les annonces", "/biens"], ["Estimer mon bien", "/estimation"], ["L’agence", "/agence"], ["Contact", "/contact"]] },
  { title: "Ressources", links: [["Nos secteurs", "/secteurs"], ["Conseils", "/conseils"], ["Questions fréquentes", "/questions"], ["Plan du site", "/plan-du-site"]] },
];

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t-4 border-sea bg-night pb-20 text-white/80 sm:pb-0">
      <div className="mx-auto grid w-full max-w-[1480px] gap-12 px-5 py-16 sm:px-10 md:grid-cols-2 lg:grid-cols-4 lg:px-16 xl:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] lg:py-20">
        <div className="lg:col-span-4 xl:col-span-1">
          <Image src="/media/logo-stacked-light.png" alt={agency.name} width={969} height={718} sizes="170px" className="h-auto w-[170px]" />
          <address className="mt-7 text-[15.5px] not-italic leading-relaxed">{agency.street}<br />{agency.postalCode} {agency.city}</address>
          <p className="mt-3 text-[15.5px] leading-relaxed">
            <a href={`tel:${agency.phoneHref}`} className="line-link hover:text-white">{agency.phone}</a><br />
            <a href={`mailto:${agency.email}`} className="line-link break-all hover:text-white">{agency.email}</a>
          </p>
        </div>
        {COLS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className={`${eyebrowCls} text-white`}>{c.title}</p>
            <ul className="mt-5 space-y-3 text-[15.5px]">{c.links.map(([l, h]) => <li key={l}><Link href={h} className="line-link hover:text-white">{l}</Link></li>)}</ul>
          </nav>
        ))}
        <nav aria-label="Réseaux sociaux">
          <p className={`${eyebrowCls} text-white`}>Nous suivre</p>
          <ul className="mt-5 space-y-3 text-[15.5px]">{agency.socials.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className="line-link hover:text-white">{s.label}</a></li>)}</ul>
        </nav>
      </div>
      <div className="overflow-hidden pb-4"><p aria-hidden className="footer-mark select-none whitespace-nowrap px-3 text-center text-[9.1vw] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white [font-family:var(--font-display)]">Capital Immobilier</p></div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-3 px-5 py-6 text-[14px] text-white/65 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
          <p>{LIVE ? `© ${new Date().getFullYear()} ${agency.name}` : "Concept de refonte réalisé par NEXWORKS AGENCY."}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/mentions-legales" className="line-link hover:text-white">Mentions légales</Link>
            <Link href="/confidentialite" className="line-link hover:text-white">Politique de confidentialité</Link>
            <Link href="/honoraires" className="line-link hover:text-white">Barème des honoraires</Link>
            <Link href="/credits-photos" className="line-link hover:text-white">Crédits photos</Link>
            <ConsentLink />
          </div>
        </div>
      </div>
    </footer>
  );
}
