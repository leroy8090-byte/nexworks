import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ServicesView } from "@/views/ServicesView";

export const metadata: Metadata = buildMetadata({
  title: "Web services: website creation, redesign, SEO, GEO | NEXWORKS",
  description:
    "Website creation, redesign and UX/UI design, SEO and GEO optimisation: the services of NEXWORKS AGENCY, explained simply. Quoted individually.",
  path: "/en/services",
  absoluteTitle: true,
  lang: "en",
});

export default function ServicesPage() {
  return <ServicesView lang="en" />;
}
