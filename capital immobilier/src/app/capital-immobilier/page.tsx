import { AgencyTeaser, CommuneBand, ContactBlock, Expertise, FaqSection, Hero, Latest, Moods, Owners, Territory } from "@/components/capital/HomeSections";
import { toCard } from "@/components/capital/Listing";
import { capitalMeta } from "@/components/capital/seo";
import { getProperties } from "@/lib/capital-properties";

export const metadata = capitalMeta(
  "Agence immobilière à Saint-Raphaël : achat, vente, location, gestion",
  "CAPITAL IMMOBILIER, agence à Saint-Raphaël : vente, location, gestion locative, syndic de copropriété, ASL et ASA. Concept de refonte.",
);

export default async function CapitalHome() {
  const properties = (await getProperties()).map(toCard);
  return (
    <>
      <Hero properties={properties} />
      <Latest properties={properties} />
      <Moods properties={properties} />
      <CommuneBand />
      <Territory properties={properties} />
      <Owners />
      <Expertise />
      <AgencyTeaser />
      <FaqSection />
      <ContactBlock />
    </>
  );
}
