import type { Metadata } from "next";
import { localePath, type Lang } from "@/i18n/config";
import { agencyFor, destinationsFor, priceText } from "@/data/localized";
import { type Property } from "@/data/properties";
import { LIVE } from "@/data/site";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3006").replace(/\/$/, "");
export const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);
export const AGENCY_ID = `${SITE_URL}/#agence`;
export const og = (src: string) => src.replace(/^\/photos\/(.+)\.webp$/, "/photos/og/$1.jpg");

/**
 * Titre, description, adresse canonique, versions dans les autres langues (hreflang) et aperçus de partage.
 * `path` est toujours l'adresse française de la page ; l'adresse anglaise en est déduite.
 */
export function pageMeta({ lang, title, description, path, image = "/photos/villa-moderne.webp", absolute }: { lang: Lang; title: string; description: string; path: string; image?: string; absolute?: boolean }): Metadata {
  const name = agencyFor(lang).name;
  const full = absolute || title.length > 48 ? title : `${title} | ${name}`;
  const url = localePath(lang, path);
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: url, languages: { fr: localePath("fr", path), en: localePath("en", path), "x-default": localePath("fr", path) } },
    openGraph: { type: "website", locale: lang === "fr" ? "fr_FR" : "en_GB", alternateLocale: lang === "fr" ? "en_GB" : "fr_FR", siteName: name, url, title: full, description, images: [{ url: og(image), width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: full, description, images: [og(image)] },
  };
}

const demo = (lang: Lang) => (LIVE ? {} : { disambiguatingDescription: lang === "fr" ? "Site de démonstration réalisé par NEXWORKS AGENCY : agence et biens fictifs." : "Demonstration website by NEXWORKS AGENCY: fictional agency and properties." });

export const agencyLd = (lang: Lang) => {
  const a = agencyFor(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent", "@id": AGENCY_ID, name: a.name, url: abs(localePath(lang, "/")), description: a.description,
        telephone: a.phoneHref, image: abs(og("/photos/villa-moderne.webp")), logo: abs("/brand/logo-navy.png"),
        address: { "@type": "PostalAddress", addressLocality: a.city, addressRegion: a.region, addressCountry: "FR" },
        areaServed: destinationsFor(lang).flatMap((d) => d.communes).map((name) => ({ "@type": "City", name })),
        knowsLanguage: ["fr", "en"],
        ...demo(lang),
      },
      { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: abs(localePath(lang, "/")), name: a.name, inLanguage: lang === "fr" ? "fr-FR" : "en-GB", publisher: { "@id": AGENCY_ID } },
    ],
  };
};

/** Une annonce : le bien, son prix et l'agence qui le propose. */
export const listingLd = (p: Property, lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  name: `${p.name}, ${p.city}`,
  url: abs(localePath(lang, `/proprietes/${p.slug}`)),
  inLanguage: lang === "fr" ? "fr-FR" : "en-GB",
  description: p.description[0],
  image: p.images.map((i) => abs(i.src)),
  offers: { "@type": "Offer", ...(p.price !== null ? { price: p.price, priceCurrency: "EUR" } : {}), description: priceText(p, lang), businessFunction: p.transaction === "vente" ? "http://purl.org/goodrelations/v1#Sell" : "http://purl.org/goodrelations/v1#LeaseOut", seller: { "@id": AGENCY_ID } },
  about: {
    "@type": p.type === "Maison de village" ? "House" : "SingleFamilyResidence",
    numberOfRooms: p.bedrooms, numberOfBedrooms: p.bedrooms, numberOfBathroomsTotal: p.bathrooms,
    floorSize: { "@type": "QuantitativeValue", value: p.surface, unitCode: "MTK" },
    address: { "@type": "PostalAddress", addressLocality: p.city, addressRegion: "Var", addressCountry: "FR" },
  },
  ...demo(lang),
});

export const breadcrumbLd = (items: { name: string; path: string }[], lang: Lang) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [{ name: lang === "fr" ? "Accueil" : "Home", path: "/" }, ...items].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(localePath(lang, c.path)) })),
});

export const faqLd = (items: { q: string; a: string }[]) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
