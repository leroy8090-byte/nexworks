import Link from "next/link";
import { CtaBand, Split, Steps, ToComplete } from "@/components/capital/Blocks";
import { capitalMeta } from "@/components/capital/seo";
import { PageIntro } from "@/components/capital/ui";
import { capital } from "@/data/capital";

export const metadata = capitalMeta("Gestion immobilière et locative à Saint-Raphaël", "Confier la gestion locative de votre bien à CAPITAL IMMOBILIER, agence de Saint-Raphaël : principes, accompagnement et contact.", "/gestion-immobiliere");

export default function Gestion() {
  const b = capital.basePath;
  return (
    <>
      <PageIntro eyebrow="Gestion immobilière" title="Louer votre bien sans en porter le quotidien." text="La gestion locative fait partie des services de CAPITAL IMMOBILIER. Cette page présente les grandes lignes ; le détail du mandat se précise avec l'agence." />
      <Steps
        eyebrow="Gestion locative"
        title="Ce que recouvre une gestion déléguée."
        items={[
          { t: "Mise en location", d: "Annonce, visites et sélection des candidats, pour trouver le bon locataire." },
          { t: "Suivi du bail", d: "Rédaction du bail, état des lieux, suivi des échéances." },
          { t: "Vie du logement", d: "Interlocuteur du locataire en cas de question ou de besoin d'intervention." },
          { t: "Votre suivi", d: "Un point clair sur la situation de votre bien, avec un interlocuteur identifié." },
        ]}
      />
      <Split id="location-gerance" tone="sand" eyebrow="Location-gérance" title="Un service complémentaire.">
        <p>
          L&apos;agence cite la location-gérance parmi ses services. Les conditions et le périmètre de ce service ne sont pas détaillés sur son site public : <ToComplete>à compléter avec l&apos;agence</ToComplete>.
        </p>
        <p>
          La gestion des immeubles passe aussi par le{" "}
          <Link href={`${b}/gestion-copropriete`} className="font-semibold text-[#183B50] underline underline-offset-4">
            syndic de copropriété
          </Link>
          , autre expertise de l&apos;agence.
        </p>
      </Split>
      <Split eyebrow="Propriétaires bailleurs" title="Vous cherchez à louer ou à faire gérer ?">
        <p>
          Parcourez nos <Link href={`${b}/louer`} className="font-semibold text-[#183B50] underline underline-offset-4">annonces de location</Link>, ou contactez l&apos;agence pour étudier la gestion de votre bien à Saint-Raphaël ou dans les communes voisines.
        </p>
        <p className="text-[14.5px] text-[#252A2D]/60">Honoraires de gestion : à consulter auprès de l&apos;agence.</p>
      </Split>
      <CtaBand title="Confiez-nous la gestion de votre bien." primary={{ label: "Contacter l'agence", href: `${b}/contact` }} secondary={{ label: "Voir les locations", href: `${b}/louer` }} />
    </>
  );
}
