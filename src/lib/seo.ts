import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMeta = {
  title: string;
  description: string;
  /** Chemin canonique, ex: "/services" */
  path: string;
  /** true = titre complet (sans suffixe de marque) */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function buildMetadata({ title, description, path, absoluteTitle, noindex }: PageMeta): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;

export function organizationJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": organizationId,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/nexworks-logo.png`,
    image: `${siteConfig.url}/opengraph-image`,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}),
    ...(sameAs.length ? { sameAs } : {}),
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
    inLanguage: siteConfig.language,
    publisher: { "@id": organizationId },
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
