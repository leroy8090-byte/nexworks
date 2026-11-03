import type { Metadata } from "next";
import { PageIntro, Wrap } from "@/components/sierra/ui";
import { sierra } from "@/data/sierra";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsPage() {
  return (
    <>
      <PageIntro eyebrow="Légal" title="Mentions légales" text="À compléter et valider par l'entreprise en cas d'exploitation officielle." />
      <Wrap className="prose-like max-w-3xl space-y-5 py-14 text-[15px] leading-[1.85] text-[#77766F]">
        <p>
          Ce site est une <strong className="font-semibold text-[#222421]">proposition de refonte non officielle</strong> réalisée par
          NEXWORKS AGENCY dans le cadre de son portfolio. Il n&apos;est pas hébergé sur le domaine {sierra.officialSite.replace("https://", "")} et
          ne remplace pas le site exploité par Sierra Immobilier.
        </p>
        <p>
          Marque et dénomination : Sierra Immobilier. Adresse connue : {sierra.address}, {sierra.postalCode} {sierra.city}. Téléphone :{" "}
          {sierra.phone}.
        </p>
        <p>Les annonces immobilières présentées ici sont des exemples de démonstration. Elles ne constituent pas une offre commerciale.</p>
        <p>Éditeur technique de la démonstration : NEXWORKS AGENCY (portfolio). Contenu à valider juridiquement avant toute mise en production officielle.</p>
      </Wrap>
    </>
  );
}
