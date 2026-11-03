import type { Metadata } from "next";
import { azur } from "@/data/azur";
import {
  BathroomSection,
  ContactCta,
  FaqSection,
  Hero,
  ReassuranceBand,
  ReviewsPlaceholder,
  ServicesSection,
  StepsSection,
  WhySection,
  ZonePreview,
} from "@/components/azur/HomeSections";

export const metadata: Metadata = {
  title: { absolute: `${azur.name} — Votre plombier de confiance à Saint-Raphaël` },
  description:
    "Site de démonstration : dépannage, recherche de fuite, installation sanitaire et rénovation de salle de bain à Saint-Raphaël. Concept fictif NEXWORKS AGENCY.",
};

export default function AzurHomePage() {
  return (
    <>
      <Hero />
      <ReassuranceBand />
      <ServicesSection />
      <BathroomSection />
      <WhySection />
      <StepsSection />
      <ZonePreview />
      <ReviewsPlaceholder />
      <FaqSection />
      <ContactCta />
    </>
  );
}
