import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { servicePages } from "@/data/service-pages";
import { counterpartPath } from "@/i18n/lang";

/** Date de la dernière vraie mise à jour du contenu : à changer quand les pages évoluent. */
const CONTENT_UPDATED = new Date("2026-11-05");

export default function sitemap(): MetadataRoute.Sitemap {
  const frPaths = [
    "/",
    "/services",
    ...servicePages.map((p) => `/services/${p.slug}`),
    "/realisations",
    ...projects.map((p) => `/realisations/${p.slug}`),
    "/notre-approche",
    "/contact",
    "/mentions-legales",
    "/confidentialite",
  ];
  const abs = (path: string) => `${siteConfig.url}${path}`;
  // Chaque page française et sa jumelle anglaise se désignent mutuellement (hreflang)
  return frPaths.flatMap((fr) => {
    const en = counterpartPath(fr, "en");
    const alternates = { languages: { fr: abs(fr), en: abs(en), "x-default": abs(fr) } };
    return [
      { url: abs(fr), lastModified: CONTENT_UPDATED, alternates },
      { url: abs(en), lastModified: CONTENT_UPDATED, alternates },
    ];
  });
}
