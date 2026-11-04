import { CtaBand, Split } from "@/components/capital/Blocks";
import { capitalMeta } from "@/components/capital/seo";
import { PageIntro } from "@/components/capital/ui";
import { capital } from "@/data/capital";

export const metadata = capitalMeta("Syndic de copropriété, ASL et ASA à Saint-Raphaël", "CAPITAL IMMOBILIER gère de petites et moyennes copropriétés, des ASL et ASA et accompagne le démarrage de copropriétés neuves à Saint-Raphaël.", "/gestion-copropriete");

export default function Copropriete() {
  const b = capital.basePath;
  return (
    <>
      <PageIntro eyebrow="Gestion de copropriété" title="Un syndic de proximité pour les copropriétés à taille humaine." text="CAPITAL IMMOBILIER indique sur son site public se spécialiser dans la gestion de petites et moyennes copropriétés." />
      <Split eyebrow="Syndic" title="Petites et moyennes copropriétés." image="/capital-immobilier/roof-house.webp" alt="Maison à toit de tuiles rouges et mer à l'horizon (photographie d'illustration)">
        <p>Dans une copropriété de taille raisonnable, la proximité compte : un interlocuteur identifié, des décisions expliquées et une vie d&apos;immeuble suivie de près.</p>
        <p>Les modalités du mandat de syndic (prestations incluses, honoraires) sont à préciser directement avec l&apos;agence.</p>
      </Split>
      <Split id="asl-asa" tone="sand" eyebrow="ASL et ASA" title="Associations syndicales libres et autorisées.">
        <p>L&apos;agence gère également des ASL et des ASA, structures qui regroupent des propriétaires autour d&apos;équipements ou d&apos;espaces communs, par exemple dans un lotissement ou une résidence.</p>
      </Split>
      <Split eyebrow="Copropriétés neuves" title="Le démarrage d'une copropriété neuve.">
        <p>L&apos;agence mentionne aussi l&apos;accompagnement au démarrage de copropriétés neuves : mise en place de la gestion et des premiers échanges entre copropriétaires.</p>
      </Split>
      <CtaBand title="Votre copropriété cherche un syndic ?" text="Présentez-nous votre situation : l'agence vous répondra directement." primary={{ label: "Contacter l'agence", href: `${b}/contact` }} secondary={{ label: "Gestion immobilière", href: `${b}/gestion-immobiliere` }} />
    </>
  );
}
