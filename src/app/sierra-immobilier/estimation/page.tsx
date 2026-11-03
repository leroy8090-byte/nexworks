import type { Metadata } from "next";
import { EstimationWizard } from "@/components/sierra/Forms";
import { PageIntro, Wrap } from "@/components/sierra/ui";

export const metadata: Metadata = {
  title: "Estimation immobilière",
  description: "Demande d'estimation immobilière à Saint-Raphaël — parcours démonstration, sans estimation automatique.",
};

export default function EstimationPage() {
  return (
    <>
      <PageIntro
        eyebrow="Estimation"
        title="Combien vaut votre bien ?"
        text="Parcours en plusieurs étapes. Aucune estimation automatique de prix : votre demande est destinée à être étudiée par l'agence."
      />
      <Wrap className="max-w-3xl py-14 sm:py-20">
        <EstimationWizard />
      </Wrap>
    </>
  );
}
