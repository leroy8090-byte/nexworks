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
  title: "NEXWORKS AGENCY — Agence digitale : sites web, design, SEO et GEO",
  description:
    "Agence digitale : création de sites web, design UX/UI, référencement SEO et optimisation GEO pour être mieux compris par les moteurs de réponse IA. Parlons de votre projet.",
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
