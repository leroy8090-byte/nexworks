import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { servicePages } from "@/data/service-pages";

/** Date de la dernière vraie mise à jour du contenu : à changer quand les pages évoluent. */
const CONTENT_UPDATED = new Date("2026-11-05");

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
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
  return paths.map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: CONTENT_UPDATED }));
}
