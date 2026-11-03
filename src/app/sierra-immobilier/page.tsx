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

export default function SierraHome() {
  return (
    <>
      <Hero />
      <SearchSection />
      <History />
      <Featured />
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
