import "server-only";
import { cache } from "react";
import { slugify, type Property } from "@/data/capital";
import type { SocialLinks } from "@/lib/social-icons";

/** Les biens viennent du logiciel NEXWORKS ESTATE. Le webhook invalide ce tag dès qu'un bien change ; `revalidate` rattrape un webhook perdu. */
export const CAPITAL_PROPERTIES_TAG = "capital-properties";
const FALLBACK_SECONDS = 60;
const PAGE_SIZE = 100;

type ApiProperty = {
  reference: string;
  title: string;
  property_type: string;
  transaction: "sale" | "rental";
  price: number | null;
  fees: number | null;
  fees_note: string | null;
  city: string | null;
  address: string | null;
  surface: number | null;
  land_surface: number | null;
  rooms: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  description: string;
  features: string[];
  dpe: string | null;
  ges: string | null;
  photos: string[];
  video_urls: string[];
};

function toProperty(a: ApiProperty): Property {
  const commune = a.city ?? "";
  return {
    slug: `${slugify(a.title)}-${slugify(a.reference)}`,
    ref: a.reference,
    title: a.title,
    transaction: a.transaction === "rental" ? "location" : "vente",
    type: a.property_type.toLowerCase(),
    typeLabel: a.property_type,
    commune,
    address: a.address,
    price: a.price,
    fees: a.fees,
    feesNote: a.fees_note,
    surface: a.surface,
    landSurface: a.land_surface,
    rooms: a.rooms,
    bedrooms: a.bedrooms,
    bathrooms: a.bathrooms,
    description: a.description.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
    features: a.features,
    dpe: a.dpe,
    ges: a.ges,
    images: a.photos.map((src, i) => ({ src, alt: `${a.title}${commune ? ` à ${commune}` : ""}, photo ${i + 1}` })),
    videos: a.video_urls ?? [],
  };
}

/** La clé reste côté serveur. Logiciel injoignable : le site reste en ligne et affiche « aucun bien », l'erreur part dans les logs. */
export const getProperties = cache(async (): Promise<Property[]> => {
  const base = process.env.ESTATE_API_URL;
  const key = process.env.ESTATE_API_KEY;
  if (!base || !key) {
    console.error("ESTATE_API_URL ou ESTATE_API_KEY manquant : aucun bien affiché.");
    return [];
  }
  try {
    const all: ApiProperty[] = [];
    for (let offset = 0; ; offset += PAGE_SIZE) {
      const res = await fetch(`${base}/properties?limit=${PAGE_SIZE}&offset=${offset}`, {
        headers: { Authorization: `Bearer ${key}` },
        next: { tags: [CAPITAL_PROPERTIES_TAG], revalidate: FALLBACK_SECONDS },
      });
      if (!res.ok) throw new Error(`API des biens : HTTP ${res.status}`);
      const { data } = (await res.json()) as { data: ApiProperty[] };
      all.push(...data);
      if (data.length < PAGE_SIZE) return all.map(toProperty);
    }
  } catch (e) {
    console.error("Biens indisponibles", e);
    return [];
  }
});

/** La référence fait foi : une fiche dont le titre change garde son ancienne adresse. */
export async function getProperty(slug: string): Promise<Property | undefined> {
  const list = await getProperties();
  return list.find((p) => p.slug === slug || slug.endsWith(`-${slugify(p.ref)}`));
}

/** Réseaux sociaux saisis dans le logiciel. Indisponibles : le pied de page s'affiche simplement sans eux. */
export const getAgencySocials = cache(async (): Promise<SocialLinks> => {
  const base = process.env.ESTATE_API_URL;
  const key = process.env.ESTATE_API_KEY;
  if (!base || !key) return {};
  try {
    const res = await fetch(`${base}/agency`, {
      headers: { Authorization: `Bearer ${key}` },
      next: { tags: [CAPITAL_PROPERTIES_TAG], revalidate: FALLBACK_SECONDS },
    });
    if (!res.ok) throw new Error(`API de l'agence : HTTP ${res.status}`);
    const { data } = (await res.json()) as { data: { social_links?: SocialLinks } };
    return data.social_links ?? {};
  } catch (e) {
    console.error("Réseaux sociaux indisponibles", e);
    return {};
  }
});
