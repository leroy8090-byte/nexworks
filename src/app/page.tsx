import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { HomeView } from "@/views/HomeView";

export const metadata: Metadata = buildMetadata({
  title: "Création de site internet, SEO et GEO | NEXWORKS AGENCY",
  description:
    "Agence web : création de site internet sur mesure, refonte, référencement SEO et optimisation GEO pour être trouvé sur Google et compris par les IA. Devis personnalisé.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return <HomeView lang="fr" />;
}
