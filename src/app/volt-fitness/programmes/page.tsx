import type { Metadata } from "next";
import { ProgrammeList } from "@/components/volt/Programmes";
import { PageIntro, Wrap } from "@/components/volt/ui";
import { FinalCta } from "@/components/volt/HomeSections";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Programmes d'entraînement de VOLT FITNESS CLUB — concept fictif de démonstration.",
};

export default function ProgrammesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Programmes"
        title="Un cap pour chaque objectif."
        text="Force, condition physique, énergie : six parcours imaginaires, avec un rythme et une durée clairs."
      />
      <Wrap className="py-16 sm:py-24">
        <ProgrammeList />
      </Wrap>
      <FinalCta />
    </>
  );
}
