import { AgencyTeaser, CtaContact, DestinationsTeaser, FaqSection, Featured, Hero, SearchSection } from "@/components/riviera/HomeSections";

export default function RivieraHome() {
  return (
    <>
      <Hero />
      <SearchSection />
      <Featured />
      <DestinationsTeaser />
      <AgencyTeaser />
      <FaqSection />
      <CtaContact />
    </>
  );
}
