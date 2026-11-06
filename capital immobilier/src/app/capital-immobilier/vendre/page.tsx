import Link from "next/link";
import { CtaBand, Split, Steps } from "@/components/capital/Blocks";
import { capitalMeta } from "@/components/capital/seo";
import { PageIntro } from "@/components/capital/ui";
import { capital } from "@/data/capital";

export const metadata = capitalMeta("Vendre son bien à Saint-Raphaël", "Vendre un appartement, une maison ou une villa autour de Saint-Raphaël avec CAPITAL IMMOBILIER : étapes, accompagnement et demande d'estimation.", "/vendre");

export default function Vendre() {
  const b = capital.basePath;
  return (
    <>
      <PageIntro
        eyebrow="Vendre"
        title="Vendre avec un interlocuteur qui connaît le terrain."
        text="CAPITAL IMMOBILIER réalise des transactions immobilières à Saint-Raphaël et dans les communes voisines. Voici comment nous imaginons votre accompagnement."
      />
      <Steps
        eyebrow="Le parcours"
        title="Quatre temps pour une vente sereine."
        items={[
          { t: "Premier échange", d: "Vous nous présentez votre bien et votre projet : calendrier, attentes, contraintes éventuelles." },
          { t: "Estimation", d: "Le bien est étudié et replacé dans son marché local, pour fixer ensemble un prix cohérent." },
          { t: "Mise en valeur", d: "Photographies, description et diffusion de l'annonce : le bien est présenté avec soin." },
          { t: "Visites et signature", d: "Nous organisons les visites, suivons les offres et vous accompagnons jusqu'à la signature." },
        ]}
      />
      <Split
        tone="sand"
        eyebrow="Pourquoi une agence locale"
        title="La connaissance des quartiers, avant tout."
        image="/capital-immobilier/t-port.webp"
        alt="Port de Saint-Raphaël, bateaux et façades colorées sous un ciel bleu"
      >
        <p>Un prix juste dépend de l&apos;emplacement, de l&apos;état du bien et du marché du moment. Une agence installée à Saint-Raphaël sait lire ces paramètres secteur par secteur.</p>
        <p>
          Votre bien est dans un autre secteur ? Consultez nos pages{" "}
          <Link href={`${b}/secteurs/frejus`} className="font-semibold text-[#0E4F68] underline underline-offset-4">
            Fréjus
          </Link>
          ,{" "}
          <Link href={`${b}/secteurs/antheor`} className="font-semibold text-[#0E4F68] underline underline-offset-4">
            Anthéor
          </Link>{" "}
          ou{" "}
          <Link href={`${b}/secteurs/saint-raphael`} className="font-semibold text-[#0E4F68] underline underline-offset-4">
            Saint-Raphaël
          </Link>
          .
        </p>
        <p className="text-[14.5px] text-[#1F2D33]/60">Les honoraires de l&apos;agence ne sont pas détaillés ici : ils sont à consulter auprès de l&apos;agence.</p>
      </Split>
      <CtaBand
        title="Prêt à en parler ?"
        text="Une demande d'estimation ne vous engage à rien."
        primary={{ label: "Demander une estimation", href: `${b}/estimation` }}
        secondary={{ label: "Contacter l'agence", href: `${b}/contact` }}
      />
    </>
  );
}
