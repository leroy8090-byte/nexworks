import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ProcessStory } from "@/components/home/ProcessStory";
import { ServicesExplorer } from "@/components/home/ServicesExplorer";
import { Statement } from "@/components/home/Statement";
import { WorkGallery } from "@/components/home/WorkGallery";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Création de site internet, SEO et GEO | NEXWORKS AGENCY",
  description:
    "Agence web : création de site internet sur mesure, refonte, référencement SEO et optimisation GEO pour être trouvé sur Google et compris par les IA. Devis personnalisé.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <ServicesExplorer />
      <ProcessStory />
      <WorkGallery />
      <FaqSection />
      <CtaSection />
    </>
  );
}
