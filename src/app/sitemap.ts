import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { sectors } from "@/data/content";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly") => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    entry("/", 1, "weekly"),
    entry("/services", 0.9, "monthly"),
    entry("/realisations", 0.8, "monthly"),
    entry("/secteurs", 0.7, "monthly"),
    entry("/notre-approche", 0.7, "monthly"),
    entry("/contact", 0.8, "yearly"),
    ...sectors.map((s) => entry(`/secteurs/${s.slug}`, 0.6, "monthly")),
    ...projects.map((p) => entry(`/realisations/${p.slug}`, 0.6, "monthly")),
    entry("/confidentialite", 0.2, "yearly"),
  ];
}
