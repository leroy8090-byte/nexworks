import type { Metadata } from "next";
import { CompareTable, PlanCards } from "@/components/volt/Plans";
import { Faq, FinalCta } from "@/components/volt/HomeSections";
import { PageIntro, Reveal, Wrap } from "@/components/volt/ui";

export const metadata: Metadata = {
  title: "Abonnements",
  description: "Formules START, PERFORMANCE et ELITE de VOLT FITNESS CLUB — tarifs fictifs de démonstration.",
};

export default function AbonnementsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Abonnements"
        title="Trois formules. Zéro détour."
        text="Tarifs et avantages fictifs, à titre d'illustration du site. Aucun paiement ni inscription n'est possible."
      />
      <Wrap className="py-16 sm:py-24">
        <PlanCards />
        <Reveal className="mt-20">
          <h2 className="mb-8 font-[family-name:var(--font-volt-display)] text-[3rem] uppercase leading-none">Comparatif</h2>
          <CompareTable />
        </Reveal>
      </Wrap>
      <Faq />
      <FinalCta />
    </>
  );
}
