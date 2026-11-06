import { Reveal } from "@/components/Motion";
import { RequestForm } from "@/components/RequestForm";
import { GiantMarquee, ScrollText } from "@/components/ScrollFx";
import { Checks, faqLd, FormBlock, Questions, RedBand, Split, Further } from "@/components/Sections";
import { Btn, Container, JsonLd, PageHero, Title } from "@/components/ui";
import { pageMeta, serviceLd } from "@/lib/seo";

const DESC = "Syndic de petites et moyennes copropriétés à Saint-Raphaël : suivi personnalisé, numéro d’urgence, espace client et démarrage de copropriétés neuves.";
export const metadata = pageMeta({ title: "Syndic de copropriété à Saint-Raphaël", description: DESC, path: "/syndic", image: "/media/frejus-residences.webp" });

/** Engagements publiés par l'agence sur sa page syndic. */
const PROMISES = [
  "Une offre simple et des prestations de qualité",
  "Un intervenant fiable et compétent",
  "Un suivi de proximité et personnalisé",
  "Un interlocuteur à votre écoute",
  "La mise en œuvre rapide des décisions votées par la copropriété",
  "L’accompagnement et la mise en œuvre de la réglementation",
  "Une forfaitisation des honoraires de gestion adaptée au juste coût",
  "Un numéro de téléphone dédié aux urgences",
];
const ROLE = [
  { t: "Suivi administratif", d: "Exécuter les décisions de l’assemblée générale, administrer l’immeuble, tenir et conserver les documents de la copropriété." },
  { t: "Gestion financière", d: "Établir le budget prévisionnel, tenir la comptabilité du syndicat et recouvrer les charges." },
  { t: "Suivi des prestataires", d: "Veiller à l’entretien de l’immeuble et suivre les intervenants." },
  { t: "Assemblées générales", d: "Convoquer et organiser les assemblées, puis mettre en œuvre ce qui y est voté." },
];
const FAQ = [
  { q: "Quel est le rôle d’un syndic de copropriété ?", a: "Le syndic exécute les décisions de l’assemblée générale, administre l’immeuble, assure son entretien, tient la comptabilité du syndicat et représente la copropriété." },
  { q: "Comment choisir un syndic pour une petite copropriété ?", a: "Regardez la proximité, la clarté du contrat et des honoraires, la disponibilité d’un interlocuteur identifié et l’organisation en cas d’urgence. Le changement de syndic se vote en assemblée générale." },
  { q: "Quelle agence peut accompagner une nouvelle copropriété ?", a: "CAPITAL IMMOBILIER s’est spécialisée dans la gestion des petites et moyennes copropriétés et dans le démarrage des copropriétés neuves, à Saint-Raphaël et dans sa région." },
  { q: "Comment suivre sa copropriété au quotidien ?", a: "Chaque client dispose d’un accès direct à son compte copropriétaire, de l’archivage de ses données et de l’information de la copropriété, sur un espace internet personnalisé et sécurisé, consultable 24 h/24." },
];

export default function Syndic() {
  return (
    <>
      <JsonLd data={serviceLd({ name: "Syndic de copropriété", description: DESC, path: "/syndic" })} />
      <JsonLd data={faqLd(FAQ)} />
      <PageHero crumbs={[{"name":"Syndic de copropriété","path":"/syndic"}]} eyebrow="Syndic de copropriété" title="Le syndic des copropriétés à taille humaine." text="La spécialité de l’agence : les petites et moyennes copropriétés, et le démarrage des copropriétés neuves." image="/media/frejus-residences.webp" alt="Des résidences de Port-Fréjus, avec leurs bateaux au pied des immeubles"><Btn href="#demande" arrow>Demander une proposition</Btn></PageHero>
      <section className="bg-white py-20 sm:py-32">
        <Container>
          <p className="max-w-6xl text-[2rem] font-semibold leading-[1.14] tracking-[-0.02em] [font-family:var(--font-display)] sm:text-[3.4rem]"><ScrollText text="Prenant le contre-pied de la gestion à grande échelle, l’agence fait le choix d’un suivi personnalisé de chaque copropriété, avec une relation de confiance durable." /></p>
        </Container>
      </section>
      <section className="bg-night py-20 text-white sm:py-32"><Container><Title light eyebrow="Les engagements de l’agence" title="Ce qui change au quotidien." /><div className="mt-12"><Checks dark items={PROMISES} /></div></Container></section>
      <GiantMarquee />
      <section className="bg-white pb-20 sm:pb-32">
        <Container>
          <Title eyebrow="Le rôle du syndic" title="Ce que fait un syndic." text="Les missions générales d’un syndic de copropriété, précisées dans le contrat signé avec le syndicat." />
          <ul className="mt-12 grid border-t-2 border-night md:grid-cols-2 md:gap-x-10">
            {ROLE.map((r, i) => <li key={r.t} className="border-b border-night/20"><Reveal delay={(i % 2) * 0.07} className="py-6"><h3 className="text-[1.7rem] leading-tight text-night">{r.t}</h3><p className="mt-2 text-[17px] leading-[1.6] text-muted">{r.d}</p></Reveal></li>)}
          </ul>
        </Container>
      </section>
      <Split dark eyebrow="Assemblées générales" title="Une information complète, une salle à l’agence." image="/media/basilique.webp" alt="Le dôme de la basilique Notre-Dame-de-la-Victoire, à Saint-Raphaël">
        <p>Les convocations sont envoyées avec un rapport financier et comptable, pour que chaque copropriétaire dispose d’une information complète.</p>
        <p>L’agence dispose d’une salle de réunion pouvant accueillir les assemblées générales ou les réunions des conseils syndicaux.</p>
      </Split>
      <RedBand eyebrow="Copropriétés neuves" title="Vous démarrez une copropriété neuve ?" text="C’est l’une des spécialités de l’agence." primary={{ label: "En parler avec l’agence", href: "#demande" }} secondary={{ label: "ASL et ASA", href: "/asl-asa" }} image="/media/cap-esterel.webp" alt="Cap Estérel et ses résidences, au pied du massif" />
      <Questions items={FAQ} title="Tout sur le syndic." />
      <FormBlock eyebrow="Demande de proposition" title="Votre copropriété cherche un syndic ?" text="Présentez votre immeuble : l’agence vous répond.">
        <RequestForm id="syn" kind="Demande de proposition de syndic" message="Votre situation" fields={[
          { name: "commune", label: "Commune de l’immeuble", required: true },
          { name: "lots", label: "Nombre de lots", type: "number", required: true },
          { name: "role", label: "Vous êtes", type: "select", options: ["Membre du conseil syndical", "Copropriétaire", "Promoteur ou constructeur", "Autre"], required: true },
        ]} />
      </FormBlock>
      <Further items={[{ label: "Le rôle du syndic de copropriété", href: "/conseils/role-du-syndic-de-copropriete" }, { label: "Choisir un syndic pour une petite copropriété", href: "/questions#choisir-syndic-petite-copropriete" }, { label: "Accompagner une nouvelle copropriété", href: "/questions#nouvelle-copropriete" }, { label: "ASL et ASA", href: "/asl-asa" }]} />
    </>
  );
}
