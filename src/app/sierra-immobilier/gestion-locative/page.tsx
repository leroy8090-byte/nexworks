import type { Metadata } from "next";
import { PageIntro, SierraButton, Wrap } from "@/components/sierra/ui";
import { sierra } from "@/data/sierra";

export const metadata: Metadata = {
  title: "Gestion locative",
  description: "Gestion locative à Saint-Raphaël — service présenté dans la proposition de refonte Sierra Immobilier.",
};

export default function GestionPage() {
  return (
    <>
      <PageIntro
        eyebrow="Gestion"
        title="Confier la gestion de votre patrimoine."
        text="Une équipe dédiée pour accompagner les propriétaires dans la gestion locative au quotidien."
      />
      <Wrap className="grid gap-10 py-16 lg:grid-cols-2">
        <div className="space-y-4 text-[16px] leading-[1.85] text-[#77766F]">
          <p>
            La gestion locative regroupe la relation locataire, le suivi administratif et l&apos;entretien courant — au service des
            propriétaires qui souhaitent déléguer.
          </p>
          <p>
            Responsable service gestion identifiée dans les informations publiques : Frédérique Guiol. Pour un mandat réel, contactez
            directement l&apos;agence.
          </p>
        </div>
        <div className="border border-[#D8C9B5] bg-[#FCFBF8] p-8">
          <SierraButton href={`${sierra.basePath}/contact`}>Demander un échange (démo)</SierraButton>
          <SierraButton href={sierra.phoneHref} variant="secondary" className="mt-3">
            {sierra.phone}
          </SierraButton>
        </div>
      </Wrap>
    </>
  );
}
