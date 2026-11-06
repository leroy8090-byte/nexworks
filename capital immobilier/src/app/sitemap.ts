import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { LIVE, sectors } from "@/data/agency";
import { landings } from "@/data/landings";
import { capturedAt, getCards } from "@/lib/listings";
import { abs } from "@/lib/seo";

const STATIC = ["/", "/biens", "/acheter", "/louer", "/vendre", "/estimation", "/gestion-locative", "/syndic", "/asl-asa", "/location-vacances", "/agence", "/contact", "/secteurs", "/conseils", "/questions", "/honoraires", "/plan-du-site", "/mentions-legales", "/confidentialite", "/credits-photos"];

/** Vide tant que le site est un concept. Les recherches filtrées n'y figurent pas : elles pointent vers /biens. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!LIVE) return [];
  return [
    ...STATIC.map((p) => ({ url: abs(p) })),
    ...landings.map((l) => ({ url: abs(`/annonces/${l.slug}`), images: [abs(l.image)] })),
    ...sectors.map((s) => ({ url: abs(`/secteurs/${s.slug}`), images: [abs(s.image)] })),
    ...articles.map((a) => ({ url: abs(`/conseils/${a.slug}`), lastModified: a.updated, images: [abs(a.image)] })),
    ...getCards().map((c) => ({ url: abs(`/biens/${c.slug}`), lastModified: capturedAt, images: c.photos.slice(0, 5).map(abs) })),
  ];
}
