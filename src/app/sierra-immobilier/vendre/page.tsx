import type { Metadata } from "next";
import { PageIntro, SierraButton, Wrap } from "@/components/sierra/ui";
import { sierra } from "@/data/sierra";

export const metadata: Metadata = {
  title: "Vendre",
  description: "Vendre son bien avec Sierra Immobilier à Saint-Raphaël — estimation et accompagnement (proposition de refonte).",
};

export default function VendrePage() {
  return (
    <>
      <PageIntro
        eyebrow="Vendre"
        title="Un accompagnement personnalisé pour vendre votre bien."
        text="Estimation, stratégie de commercialisation et suivi : une présence locale depuis 1973."
      />
      <Wrap className="grid gap-12 py-16 lg:grid-cols-2">
        <div className="space-y-5 text-[16px] leading-[1.85] text-[#77766F]">
          <p>
            Vendre commence par une lecture juste du marché local. L&apos;agence s&apos;appuie sur sa connaissance de Saint-Raphaël, Fréjus et
            Puget-sur-Argens pour positionner votre bien.
          </p>
          <p>Sur cette démonstration, le parcours d&apos;estimation ne calcule aucun prix automatique : il prépare une demande à étudier par l&apos;agence.</p>
        </div>
        <div className="border border-[#D8C9B5] bg-[#FCFBF8] p-8">
          <h2 className="font-[family-name:var(--font-sierra-display)] text-[2rem] font-light">Estimer pour mieux vendre</h2>
          <div className="mt-6 flex flex-col gap-3">
            <SierraButton href={`${sierra.basePath}/estimation`}>Estimer mon bien</SierraButton>
            <SierraButton href={sierra.phoneHref} variant="secondary">
              Appeler {sierra.phone}
            </SierraButton>
          </div>
        </div>
      </Wrap>
    </>
  );
}
