import type { Metadata } from "next";
import { PageIntro, Wrap } from "@/components/sierra/ui";

export const metadata: Metadata = { title: "Confidentialité" };

export default function ConfidentialitePage() {
  return (
    <>
      <PageIntro eyebrow="RGPD" title="Politique de confidentialité" text="Version démonstration — à compléter avant collecte réelle de données." />
      <Wrap className="max-w-3xl space-y-5 py-14 text-[15px] leading-[1.85] text-[#77766F]">
        <p>
          Les formulaires de cette proposition de refonte fonctionnent en <strong className="font-semibold text-[#222421]">mode démonstration</strong> :
          aucune donnée personnelle n&apos;est transmise à un serveur ni conservée.
        </p>
        <p>
          En cas de mise en production officielle, Sierra Immobilier devra publier une politique complète (finalités, bases légales, durées,
          droits, sous-traitants) et configurer un traitement conforme.
        </p>
        <p>Pour exercer vos droits auprès de l&apos;agence réelle, contactez-la via ses canaux officiels (téléphone ou site sierra-immo.fr).</p>
      </Wrap>
    </>
  );
}
