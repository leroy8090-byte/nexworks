import type { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { destinations, LIVE } from "@/data/site";
import { localePath } from "@/i18n/config";
import { abs } from "@/lib/seo";

/** Chaque page en français et en anglais, avec le lien vers sa version dans l'autre langue. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!LIVE) return [];
  const pages = ["/", "/proprietes", "/destinations", "/vendre", "/collection-privee", "/agence", "/contact", "/mentions-legales", "/confidentialite", "/credits-photos",
    ...destinations.map((d) => `/destinations/${d.slug}`), ...properties.map((p) => `/proprietes/${p.slug}`)];
  return pages.flatMap((p) => (["fr", "en"] as const).map((lang) => ({
    url: abs(localePath(lang, p)),
    alternates: { languages: { fr: abs(localePath("fr", p)), en: abs(localePath("en", p)) } },
  })));
}
