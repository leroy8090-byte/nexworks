import Image from "next/image";
import Link from "next/link";
import { agencyFor, destinationsFor } from "@/data/localized";
import { LIVE } from "@/data/site";
import { localePath, type Lang } from "@/i18n/config";
import { BigWordmark } from "./BigWordmark";
import { Icon } from "./ui";

const T = {
  fr: {
    props: "Propriétés", buy: "Acheter", rent: "Location saisonnière", newDev: "Programme neuf", selection: "Ma sélection",
    dest: "Destinations", agency: "L'agence", sell: "Vendre, estimer", private: "Collection privée", approach: "Notre approche", contact: "Contact",
    reach: "Nous joindre", about: "Villas, bastides et maisons de village, à la vente et en location saisonnière.",
    demo: ["Site de démonstration réalisé par ", ". L'agence MAÉRIVA, ses biens et ses prix sont fictifs."],
    legal: "Mentions légales", privacy: "Confidentialité", credits: "Crédits photos", call: "Appeler", meet: "Rendez-vous",
  },
  en: {
    props: "Properties", buy: "Buy", rent: "Seasonal rentals", newDev: "New development", selection: "My selection",
    dest: "Destinations", agency: "The agency", sell: "Sell, valuation", private: "Private collection", approach: "Our approach", contact: "Contact",
    reach: "Get in touch", about: "Villas, bastides and village houses, for sale and for seasonal rental.",
    demo: ["Demonstration website by ", ". The MAÉRIVA agency, its properties and its prices are fictional."],
    legal: "Legal notice", privacy: "Privacy", credits: "Photo credits", call: "Call", meet: "Appointment",
  },
};

export function Footer({ lang }: { lang: Lang }) {
  const t = T[lang];
  const agency = agencyFor(lang);
  const L = (p: string) => localePath(lang, p);
  const cols = [
    { t: t.props, links: [{ href: "/proprietes?transaction=vente", label: t.buy }, { href: "/proprietes?transaction=location", label: t.rent }, { href: "/proprietes?type=Programme+neuf", label: t.newDev }, { href: "/selection", label: t.selection }] },
    { t: t.dest, links: destinationsFor(lang).map((d) => ({ href: `/destinations/${d.slug}`, label: d.name })) },
    { t: t.agency, links: [{ href: "/vendre", label: t.sell }, { href: "/collection-privee", label: t.private }, { href: "/agence", label: t.approach }, { href: "/contact", label: t.contact }] },
  ];
  return (
    <footer className="border-t border-line bg-white pb-28 text-ink md:pb-10">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-10 lg:px-16">
        <div className="grid gap-14 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src="/brand/logo-navy.png" alt={`${agency.name} Real Estate`} width={1169} height={590} className="h-auto w-48" />
            <p className="mt-8 max-w-sm text-[15px] leading-[1.8] text-muted">{agency.baseline}. {t.about}</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            {cols.map((c) => (
              <div key={c.t}>
                <p className="caps text-pave-dark">{c.t}</p>
                <ul className="mt-5 space-y-3 text-[14.5px]">{c.links.map((l) => <li key={l.href}><Link href={L(l.href)} className="line">{l.label}</Link></li>)}</ul>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3">
            <p className="caps text-pave-dark">{t.reach}</p>
            <a href={`tel:${agency.phoneHref}`} className="serif mt-5 flex items-center gap-3 text-[1.8rem]"><Icon name="phone" className="size-5 text-gold" />{agency.phone}</a>
            <p className="mt-3 text-[14.5px] text-muted">{agency.hours}</p>
            <p className="mt-1 text-[14.5px] text-muted">{agency.city}, {agency.region}</p>
          </div>
        </div>
        <BigWordmark />
        <div className="flex flex-col gap-4 border-t border-line pt-8 text-[12.5px] text-muted md:flex-row md:items-center md:justify-between">
          <p>{LIVE ? `© ${new Date().getFullYear()} ${agency.name}` : <>{t.demo[0]}<a href="https://www.nexworks.agency" target="_blank" rel="noopener" className="line text-ink">NEXWORKS AGENCY</a>{t.demo[1]}</>}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href={L("/mentions-legales")} className="line">{t.legal}</Link></li>
            <li><Link href={L("/confidentialite")} className="line">{t.privacy}</Link></li>
            <li><Link href={L("/credits-photos")} className="line">{t.credits}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/** Sur téléphone : appeler ou prendre rendez-vous, toujours à portée de pouce. */
export function MobileBar({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-white/95 p-2.5 backdrop-blur-md md:hidden">
      <a href={`tel:${agencyFor(lang).phoneHref}`} className="flex min-h-12 items-center justify-center gap-2 border border-ink/20 text-[11px] font-medium tracking-[0.2em] text-ink uppercase"><Icon name="phone" className="size-4" />{t.call}</a>
      <Link href={localePath(lang, "/contact")} className="flex min-h-12 items-center justify-center bg-ink text-[11px] font-medium tracking-[0.2em] text-white uppercase">{t.meet}</Link>
    </div>
  );
}
