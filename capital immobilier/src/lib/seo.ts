import type { Metadata } from "next";
import { agency, LIVE, sectors } from "@/data/agency";

/** Le référencement au même endroit : balises de page et données structurées, sur une seule identité d'agence. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003").replace(/\/$/, "");
export const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);
export const AGENCY_ID = `${SITE_URL}/#agence`;
export const WEBSITE_ID = `${SITE_URL}/#site`;

/** Les réseaux sociaux lisent mal le WebP : chaque photo a sa version 1200 × 630 en JPEG. */
export function ogImage(src: string) {
  const media = src.match(/^\/media\/([^/]+)\.webp$/);
  if (media) return `/media/og/${media[1]}.jpg`;
  const bien = src.match(/^\/biens\/(\d+)\//);
  if (bien) return `/biens/${bien[1]}/og.jpg`;
  return src;
}

/** Coupe une description sur un mot, pour qu'elle reste lisible dans les résultats. */
export function clip(text: string, max = 158) {
  const one = text.replace(/\s+/g, " ").trim();
  if (one.length <= max) return one;
  return `${one.slice(0, max - 1).replace(/[\s,;:.'’(-]+\S*$/, "")}…`;
}

type PageMeta = { title: string; description: string; path: string; image?: string; alt?: string; absolute?: boolean; noindex?: boolean; type?: "website" | "article"; modified?: string };

export function pageMeta({ title, description, path, image = "/media/massif-esterel.webp", alt, absolute, noindex, type = "website", modified }: PageMeta): Metadata {
  /** Le nom de l’agence suit le titre, sauf si le résultat serait coupé dans les moteurs. */
  const branded = !absolute && title.length + agency.name.length + 3 <= 72;
  const full = branded ? `${title} | ${agency.name}` : title;
  const og = ogImage(image);
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type, locale: "fr_FR", siteName: agency.name, url: path, title: full, description,
      images: [{ url: og, width: 1200, height: 630, alt: alt ?? full }],
      ...(modified ? { modifiedTime: modified } : {}),
    },
    twitter: { card: "summary_large_image", title: full, description, images: [og] },
  };
}

const areas = () => sectors.map((s) => ({ "@type": "Place", name: s.name }));

/** L'agence : une seule entité, référencée partout par son identifiant. */
export const agencyLd = () => ({
  "@type": ["RealEstateAgent", "Organization"],
  "@id": AGENCY_ID,
  name: agency.name,
  url: `${SITE_URL}/`,
  logo: abs("/media/logo-dark.png"),
  image: abs("/media/og/saint-raphael-port.jpg"),
  description: agency.description,
  telephone: agency.phoneHref,
  faxNumber: agency.fax.replace(/\s/g, ""),
  email: agency.email,
  address: { "@type": "PostalAddress", streetAddress: agency.street, postalCode: agency.postalCode, addressLocality: agency.city, addressRegion: agency.region, addressCountry: "FR" },
  areaServed: areas(),
  knowsAbout: ["Transaction immobilière", "Location immobilière", "Location de vacances", "Gestion locative", "Syndic de copropriété", "Association syndicale libre (ASL)", "Association syndicale autorisée (ASA)"],
  sameAs: [...agency.socials.map((s) => s.href), ...(LIVE ? [] : [agency.officialSite])],
});

export const websiteLd = () => ({ "@type": "WebSite", "@id": WEBSITE_ID, url: `${SITE_URL}/`, name: agency.name, inLanguage: "fr-FR", publisher: { "@id": AGENCY_ID } });

export const siteLd = () => ({ "@context": "https://schema.org", "@graph": [agencyLd(), websiteLd()] });

export const webPageLd = ({ name, path, description }: { name: string; path: string; description?: string }) => ({
  "@context": "https://schema.org", "@type": "WebPage", "@id": `${abs(path)}#page`, url: abs(path), name, ...(description ? { description } : {}), inLanguage: "fr-FR", isPartOf: { "@id": WEBSITE_ID }, about: { "@id": AGENCY_ID },
});

export const breadcrumbLd = (items: { name: string; path?: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, ...(c.path ? { item: abs(c.path) } : {}) })),
});

export const serviceLd = ({ name, description, path }: { name: string; description: string; path: string }) => ({
  "@context": "https://schema.org", "@type": "Service", "@id": `${abs(path)}#service`, name, serviceType: name, description, url: abs(path), provider: { "@id": AGENCY_ID }, areaServed: areas(),
});

export const articleLd = ({ title, description, path, image, updated }: { title: string; description: string; path: string; image: string; updated: string }) => ({
  "@context": "https://schema.org", "@type": "Article", "@id": `${abs(path)}#article`, headline: title, description, url: abs(path), mainEntityOfPage: abs(path), image: abs(ogImage(image)), dateModified: updated, inLanguage: "fr-FR", author: { "@id": AGENCY_ID }, publisher: { "@id": AGENCY_ID },
});
