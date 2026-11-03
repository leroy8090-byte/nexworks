import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro, Wrap } from "@/components/sierra/ui";
import { sierra, sierraTeam } from "@/data/sierra";

export const metadata: Metadata = {
  title: "L'agence",
  description: "Histoire de Sierra Immobilier depuis 1973 à Saint-Raphaël — proposition de refonte NEXWORKS AGENCY.",
};

export default function AgencePage() {
  return (
    <>
      <PageIntro
        eyebrow="L'agence"
        title="Une histoire familiale face au vieux port."
        text={`Fondée par ${sierra.founder} en ${sierra.founded}, Sierra Immobilier accompagne ses clients depuis plus de cinquante ans.`}
      />
      <Wrap className="grid gap-14 py-16 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#D8C9B5]">
          <Image src={sierra.aboutImage} alt="Ambiance Côte d'Azur — illustration" fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
        </div>
        <div className="space-y-5 text-[16px] leading-[1.85] text-[#77766F]">
          <p>
            Implantée au {sierra.address} à {sierra.city}, l&apos;agence conjugue ancrage local et accompagnement sur l&apos;achat, la vente,
            la location et la gestion locative.
          </p>
          <p>
            Elle indique être membre de la {sierra.memberships.join(" et du groupement ")}. Aucun résultat commercial, chiffre d&apos;affaires
            ou certification supplémentaire n&apos;est inventé ici.
          </p>
          <p className="text-[13.5px]">Horaires d&apos;ouverture : à confirmer auprès de l&apos;agence.</p>
        </div>
      </Wrap>
      <Wrap className="pb-20">
        <h2 className="font-[family-name:var(--font-sierra-display)] text-[2.4rem] font-light text-[#222421]">L&apos;équipe</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sierraTeam.map((m) => (
            <div key={m.name} className="border border-[#D8C9B5] bg-[#FCFBF8] p-7">
              <div className="flex size-14 items-center justify-center bg-[#263B48] font-[family-name:var(--font-sierra-display)] text-[1.35rem] text-[#FCFBF8]">
                {m.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-sierra-display)] text-[1.5rem] font-light">{m.name}</h3>
              <p className="mt-2 text-[13.5px] text-[#77766F]">{m.role}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </>
  );
}
