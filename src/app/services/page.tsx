import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ServicesView } from "@/views/ServicesView";

export const metadata: Metadata = buildMetadata({
  title: "Services web : création de site, refonte, SEO, GEO | NEXWORKS",
  description:
    "Création de site internet, refonte et design UX/UI, référencement SEO et optimisation GEO : les services de NEXWORKS AGENCY, expliqués simplement. Sur devis.",
  path: "/services",
  absoluteTitle: true,
});

export default function ServicesPage() {
  return <ServicesView lang="fr" />;
}
