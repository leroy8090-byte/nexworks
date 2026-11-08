import type { MetadataRoute } from "next";
import { LIVE } from "@/data/site";
import { abs } from "@/lib/seo";

/** Démonstration : fermée aux moteurs tant que le site n'est pas mis en service. */
export default function robots(): MetadataRoute.Robots {
  return LIVE ? { rules: [{ userAgent: "*", allow: "/" }], sitemap: abs("/sitemap.xml") } : { rules: [{ userAgent: "*", disallow: "/" }] };
}
