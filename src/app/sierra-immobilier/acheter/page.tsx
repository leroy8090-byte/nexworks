import type { Metadata } from "next";
import { PageIntro, SierraButton, Wrap } from "@/components/sierra/ui";
import { sierra } from "@/data/sierra";

export const metadata: Metadata = {
  title: "Acheter",
  description: "Accompagnement à l'achat immobilier à Saint-Raphaël, Fréjus et alentours — proposition de refonte Sierra Immobilier.",
};

export default function AcheterPage() {
  return (
    <>
      <PageIntro
        eyebrow="Acheter"
        title="Trouver le bien qui correspond à votre projet."
        text="Un accompagnement pour clarifier vos critères, visiter et sécuriser votre acquisition sur le littoral varois."
      />
      <Wrap className="grid gap-12 py-16 lg:grid-cols-2">
        <div className="space-y-5 text-[16px] leading-[1.85] text-[#77766F]">
          <p>
            Que vous recherchiez un appartement à Saint-Raphaël, une maison à Fréjus ou une villa sur les hauteurs, l&apos;équipe vous aide à
            croiser localisation, budget et mode de vie.
          </p>
          <p>
            Cette page fait partie d&apos;une proposition de refonte. Les biens présentés ailleurs sur le site sont des exemples de démonstration.
            Le catalogue commercial réel reste disponible sur le site officiel.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Définition du cahier des charges</li>
            <li>Sélection et organisation des visites</li>
            <li>Accompagnement jusqu&apos;à la signature</li>
          </ul>
        </div>
        <div className="border border-[#D8C9B5] bg-[#FCFBF8] p-8">
          <h2 className="font-[family-name:var(--font-sierra-display)] text-[2rem] font-light text-[#222421]">Passer à l&apos;action</h2>
          <div className="mt-6 flex flex-col gap-3">
            <SierraButton href={`${sierra.basePath}/biens?transaction=achat`}>Voir les biens (démo)</SierraButton>
            <SierraButton href={sierra.officialSite} variant="secondary">
              Catalogue officiel
            </SierraButton>
            <SierraButton href={`${sierra.basePath}/contact`} variant="secondary">
              Nous écrire
            </SierraButton>
          </div>
        </div>
      </Wrap>
    </>
  );
}
