import { Faq, FinalCta, Hero, Manifesto, Philosophy, PlanningPreview, PricingPreview, Spaces, Stats, Univers } from "@/components/volt/HomeSections";

export default function VoltHome() {
  return (
    <>
      <Hero />
      <Stats />
      <Univers />
      <Manifesto />
      <Spaces />
      <PlanningPreview />
      <PricingPreview />
      <Philosophy />
      <Faq />
      <FinalCta />
    </>
  );
}
