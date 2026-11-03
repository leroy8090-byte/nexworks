import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { MethodSection } from "@/components/sections/MethodSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SectorsSection } from "@/components/sections/SectorsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustBand } from "@/components/sections/TrustBand";
import { WhySection } from "@/components/sections/WhySection";
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
      <TrustBand />
      <ServicesSection />
      <MethodSection />
      <ProjectsSection />
      <WhySection />
      <SectorsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
