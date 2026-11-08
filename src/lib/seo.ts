import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { counterpartPath, ogLocale, type Lang } from "@/i18n/lang";

type PageMeta = {
  title: string;
  description: string;
  /** Chemin canonique, ex: "/services" */
  path: string;
  /** true = titre complet (sans suffixe de marque) */
  absoluteTitle?: boolean;
  noindex?: boolean;
  /** Langue de la page (français par défaut) */
  lang?: Lang;
};

/** Image d'aperçu des partages (réseaux sociaux, messageries), générée par app/opengraph-image. */
const shareImage = { url: "/opengraph-image", width: 1200, height: 630, alt: "NEXWORKS AGENCY : création de site internet, SEO et GEO" };
const shareImageEn = { url: "/en/opengraph-image", width: 1200, height: 630, alt: "NEXWORKS AGENCY: website creation, SEO and GEO" };

export function buildMetadata({ title, description, path, absoluteTitle, noindex, lang = "fr" }: PageMeta): Metadata {
  const url = `${siteConfig.url}${path}`;
  // Chaque page existe en français et en anglais : on le dit aux moteurs de recherche (hreflang)
  const fr = counterpartPath(path, "fr");
  const en = counterpartPath(path, "en");
  const languages = { fr, en, "x-default": fr };
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      alternateLocale: ogLocale[lang === "fr" ? "en" : "fr"],
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url,
      images: [lang === "en" ? shareImageEn : shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [(lang === "en" ? shareImageEn : shareImage).url],
    },
  };
}

export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;

export function organizationJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  const { legal } = siteConfig;
  const hasAddress = Boolean(legal.address && legal.city);
  return {
    "@context": "https://schema.org",
    // Une fiche d'établissement local exige une adresse réelle : on ne l'annonce que si elle est renseignée.
    "@type": hasAddress ? ["Organization", "ProfessionalService"] : "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: { "@type": "ImageObject", url: `${siteConfig.url}/brand/nexworks-logo.png`, width: 747, height: 134 },
    image: `${siteConfig.url}/opengraph-image`,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(legal.company ? { legalName: legal.company } : {}),
    ...(legal.siren ? { taxID: legal.siren } : {}),
    ...(legal.phone ? { telephone: legal.phone } : {}),
    ...(hasAddress
      ? { address: { "@type": "PostalAddress", streetAddress: legal.address, addressLocality: legal.city, postalCode: legal.postalCode, addressCountry: "FR" } }
      : {}),
    areaServed: { "@type": "Country", name: "France" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${siteConfig.url}/contact`,
      availableLanguage: ["French", "English"],
      ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}),
    },
    knowsAbout: [
      "Création de sites web",
      "Design UX/UI",
      "Refonte de sites web",
      "Référencement naturel (SEO)",
      "Generative Engine Optimization (GEO)",
      "Optimisation des performances web",
    ],
    inLanguage: siteConfig.language,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: ["fr", "en"],
    publisher: { "@id": organizationId },
  };
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function serviceJsonLd(s: { name: string; serviceType: string; description: string; path: string; items: string[]; lang?: Lang }) {
  const url = `${siteConfig.url}${s.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    url,
    inLanguage: s.lang ?? siteConfig.language,
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "France" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.name,
      itemListElement: s.items.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteConfig.url}${it.path}`,
    })),
  };
}
