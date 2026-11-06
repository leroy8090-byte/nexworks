import { RequestForm } from "@/components/RequestForm";
import { ScrollText } from "@/components/ScrollFx";
import { Checks, faqLd, FormBlock, Questions, Split, WidePhoto, Further } from "@/components/Sections";
import { Btn, Container, JsonLd, PageHero, Title } from "@/components/ui";
import { pageMeta, serviceLd } from "@/lib/seo";

const DESC = "Confiez votre bien à CAPITAL IMMOBILIER à Saint-Raphaël : garantie des loyers, compte rendu mensuel, gestion comptable et juridique de la location.";
export const metadata = pageMeta({ title: "Gestion locative à Saint-Raphaël", description: DESC, path: "/gestion-locative", image: "/media/cap-esterel-allee.webp" });

/** Engagements publiés par l'agence sur son site. */
const PROMISES = [
  "Une offre simple et sécurisée",
  "La garantie des loyers pour le propriétaire bailleur",
  "Un compte rendu de gestion mensuel, avec le versement du loyer dans les meilleurs délais",
  "La gestion complète de la relation comptable et juridique de la location",
  "La mise en œuvre rapide de la location de votre bien",
  "L’accompagnement et la mise en œuvre de la réglementation",
];
const FAQ = [
  { q: "Comment fonctionne la gestion locative ?", a: "Le propriétaire signe un mandat de gestion qui confie la location de son bien à un professionnel. Le mandat précise les missions confiées, leur durée et les honoraires." },
  { q: "Le DPE a-t-il un effet sur la location ?", a: "Oui. Depuis 2025, un logement classé G ne peut plus être proposé à la location comme logement décent, et les logements classés F sont concernés à partir de 2028." },
  { q: "Pourquoi l’état des lieux compte-t-il ?", a: "Il décrit le logement à l’entrée et à la sortie du locataire. C’est la référence pour apprécier d’éventuelles dégradations et restituer le dépôt de garantie." },
  { q: "Quels sont les honoraires de gestion ?", a: "Ils sont à demander à l’agence, au 04 94 40 86 44, selon le bien et les prestations retenues." },
];

export default function GestionLocative() {
  return (
    <>
      <JsonLd data={serviceLd({ name: "Gestion locative", description: DESC, path: "/gestion-locative" })} />
      <JsonLd data={faqLd(FAQ)} />
      <PageHero crumbs={[{"name":"Gestion locative","path":"/gestion-locative"}]} eyebrow="Gestion immobilière" title="Votre bien loué, sans en porter le quotidien." text="La satisfaction et la proximité avec le client sont l’objectif principal des services de gérance de l’agence." image="/media/cap-esterel-allee.webp" alt="L’allée des Fleurs à Cap Estérel, entre palmiers et résidences"><Btn href="#demande" arrow>Confier mon bien</Btn></PageHero>
      <section className="bg-white py-20 sm:py-32">
        <Container>
          <p className="max-w-6xl text-[2rem] font-semibold leading-[1.14] tracking-[-0.02em] [font-family:var(--font-display)] sm:text-[3.4rem]"><ScrollText text="Une mise en location qui assure rentabilité et sécurité au propriétaire : c’est la démarche de l’agence, du premier locataire au suivi mensuel." /></p>
        </Container>
      </section>
      <section className="bg-night py-20 text-white sm:py-32"><Container><Title light eyebrow="Les engagements de l’agence" title="Ce que vous confiez." /><div className="mt-12"><Checks dark items={PROMISES} /></div></Container></section>
      <WidePhoto image="/media/corniche.webp" alt="La corniche d’Or et les roches rouges de l’Estérel" />
      <Split eyebrow="Location-gérance" title="Un service complémentaire." image="/media/santa-lucia.webp" alt="Les roches rouges de la pointe de Santa Lucia, à Saint-Raphaël">
        <p>L’agence met aussi son expertise au service de la location-gérance. Les conditions et le périmètre de ce service sont à préciser directement avec elle.</p>
      </Split>
      <Questions items={FAQ} title="Avant de confier votre bien." />
      <FormBlock eyebrow="Demande de gestion" title="Confiez-nous votre bien." text="Présentez votre bien et votre situation : l’agence vous répond.">
        <RequestForm id="ges" kind="Demande de gestion locative" message="Votre situation" fields={[
          { name: "type", label: "Type de bien", type: "select", options: ["Appartement", "Maison ou villa", "Studio", "Local commercial", "Immeuble"], required: true },
          { name: "commune", label: "Commune", required: true },
          { name: "etat", label: "Situation actuelle", type: "select", options: ["Bien vide", "Bien déjà loué", "Autre gestionnaire en place"] },
        ]} />
      </FormBlock>
      <Further items={[{ label: "Comprendre la gestion locative", href: "/conseils/comprendre-gestion-locative" }, { label: "Comment fonctionne la gestion locative ?", href: "/questions#gestion-locative" }, { label: "Investir à Saint-Raphaël", href: "/conseils/investir-immobilier-saint-raphael" }, { label: "Barème des honoraires", href: "/honoraires" }]} />
    </>
  );
}
