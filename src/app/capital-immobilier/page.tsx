import { AgencyTeaser, ContactBlock, EstimationBand, Expertise, FaqSection, Featured, Hero, Territory } from "@/components/capital/HomeSections";
import { capitalMeta } from "@/components/capital/seo";

export const metadata = capitalMeta(
  "Agence immobilière à Saint-Raphaël — achat, vente, location, gestion",
  "CAPITAL IMMOBILIER, agence à Saint-Raphaël : vente, location, gestion locative, syndic de copropriété, ASL et ASA. Concept de refonte, biens de démonstration.",
);

export default function CapitalHome() {
  return (
    <>
      <Hero />
      <Featured />
      <Expertise />
      <AgencyTeaser />
      <EstimationBand />
      <Territory />
      <FaqSection />
      <ContactBlock />
    </>
  );
}
