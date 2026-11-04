import { AgencyTeaser, ContactBlock, EstimationBand, Expertise, FaqSection, Featured, Hero, Territory } from "@/components/capital/HomeSections";
import { capitalMeta } from "@/components/capital/seo";
import { getProperties } from "@/lib/capital-properties";

export const metadata = capitalMeta(
  "Agence immobilière à Saint-Raphaël — achat, vente, location, gestion",
  "CAPITAL IMMOBILIER, agence à Saint-Raphaël : vente, location, gestion locative, syndic de copropriété, ASL et ASA. Concept de refonte.",
);

export default async function CapitalHome() {
  const properties = await getProperties();
  return (
    <>
      <Hero />
      <Featured properties={properties} />
      <Expertise />
      <AgencyTeaser />
      <EstimationBand />
      <Territory />
      <FaqSection />
      <ContactBlock />
    </>
  );
}
