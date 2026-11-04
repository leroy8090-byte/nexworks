import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { capital } from "@/data/capital";

/**
 * Convention des démos du repo : noindex/nofollow posé dans le layout (comme maison-riviera, azur-plomberie, volt-fitness).
 * On ajoute malgré tout un canonical et des Open Graph propres par page, prêts pour une éventuelle mise en ligne.
 */
export function capitalMeta(title: string, description: string, path = ""): Metadata {
  const url = `${siteConfig.url}${capital.basePath}${path}`;
  return {
    title,
    description,
    alternates: { canonical: `${capital.basePath}${path}` },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: capital.name,
      title: `${title} | ${capital.name}`,
      description,
      url,
      images: [{ url: `${capital.basePath}/og.jpg`, width: 1200, height: 630, alt: "Piscine face à la mer, photographie d'illustration" }],
    },
  };
}

/** Données structurées : uniquement des faits publics vérifiés (nom, adresse, téléphone, e-mail, zones citées). */
export function agencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}${capital.basePath}#agency`,
    name: capital.name,
    description: capital.description,
    telephone: `+33${capital.phoneHref.slice(3)}`,
    email: capital.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: capital.address.street,
      postalCode: capital.address.postalCode,
      addressLocality: capital.address.city,
      addressCountry: "FR",
    },
    areaServed: ["Saint-Raphaël", "Fréjus", "Anthéor", "Bagnols-en-Forêt", "Callian", "Fayence"].map((name) => ({ "@type": "City", name })),
    sameAs: [capital.publicSite],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteConfig.url}${capital.basePath}${it.path}`,
    })),
  };
}
