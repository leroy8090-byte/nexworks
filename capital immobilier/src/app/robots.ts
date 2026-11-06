import type { MetadataRoute } from "next";
import { LIVE } from "@/data/agency";
import { abs } from "@/lib/seo";

/** Fermé aux moteurs tant que le site est un concept : le site officiel reste la référence. */
export default function robots(): MetadataRoute.Robots {
  return LIVE ? { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/favoris"] }], sitemap: abs("/sitemap.xml") } : { rules: [{ userAgent: "*", disallow: "/" }] };
}
