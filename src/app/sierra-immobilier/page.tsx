import {
  ContactCta,
  EstimationTeaser,
  Expertise,
  FaqSection,
  Featured,
  Hero,
  History,
  Reviews,
  SearchSection,
  TeamTeaser,
  Territory,
} from "@/components/sierra/HomeSections";
import { JsonLd, faqLd } from "@/components/sierra/JsonLd";
import { sierraFaq } from "@/data/sierra";
import { listPublished } from "@/lib/sierra-cms";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Agence immobilière Saint-Raphaël depuis 1973",
  description:
    "Sierra Immobilier — achat, vente, location, gestion locative et estimation à Saint-Raphaël, Fréjus et Puget-sur-Argens. Proposition de refonte NEXWORKS.",
  alternates: { canonical: "/sierra-immobilier" },
};

export default async function SierraHome() {
  const properties = await listPublished();
  return (
    <>
      <JsonLd data={faqLd(sierraFaq)} />
      <Hero />
      <SearchSection />
      <History />
      <Featured properties={properties} />
      <Expertise />
      <EstimationTeaser />
      <Territory />
      <TeamTeaser />
      <Reviews />
      <FaqSection />
      <ContactCta />
    </>
  );
}
