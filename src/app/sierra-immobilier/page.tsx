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
import { listPublished } from "@/lib/sierra-cms";

export const dynamic = "force-dynamic";

export default async function SierraHome() {
  const properties = await listPublished();
  return (
    <>
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
