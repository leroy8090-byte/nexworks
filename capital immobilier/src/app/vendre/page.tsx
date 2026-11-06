import Link from "next/link";
import { RequestForm } from "@/components/RequestForm";
import { GiantMarquee, ScrollText } from "@/components/ScrollFx";
import { Checks, faqLd, FormBlock, Questions, RedBand, Split, Steps, Further } from "@/components/Sections";
import { Btn, Container, JsonLd, PageHero, Title } from "@/components/ui";
import { pageMeta, serviceLd } from "@/lib/seo";

const DESC = "Vendre un appartement ou une maison à Saint-Raphaël et alentour : estimation, mise en valeur et suivi jusqu’à la signature avec CAPITAL IMMOBILIER.";
export const metadata = pageMeta({ title: "Vendre son bien à Saint-Raphaël", description: DESC, path: "/vendre", image: "/media/saint-raphael-port.webp" });

const STEPS = [
  { t: "Estimation", d: "Le bien est étudié et replacé dans son marché local, pour fixer ensemble un prix cohérent." },
  { t: "Mise en valeur", d: "Photographies, description et préparation de l’annonce : le bien est présenté sous son meilleur jour." },
  { t: "Commercialisation", d: "L’annonce est diffusée, les visites organisées et les offres étudiées avec vous." },
  { t: "Jusqu’à la vente", d: "L’agence vous accompagne du compromis à la signature de l’acte chez le notaire." },
];
const DOCS = ["Le titre de propriété", "Le dossier de diagnostics techniques", "La taxe foncière", "En copropriété : règlement, procès-verbaux d’assemblée et montant des charges"];
const FAQ = [
  { q: "L’estimation engage-t-elle à vendre ?", a: "Non. Une demande d’estimation permet d’en parler avec l’agence, sans obligation de vendre." },
  { q: "Quels diagnostics faut-il prévoir ?", a: "Le diagnostic de performance énergétique doit être disponible dès la mise en vente. Selon le bien s’ajoutent l’état des risques, l’amiante, le plomb, l’électricité, le gaz, les termites et, en copropriété, le mesurage loi Carrez." },
  { q: "Mandat simple ou exclusif ?", a: "Le mandat simple permet de confier la vente à plusieurs intermédiaires. Avec le mandat exclusif, un seul professionnel s’en occupe pendant la durée prévue. Dans les deux cas, lisez sa durée et ses conditions de résiliation." },
  { q: "Quels sont les honoraires ?", a: "Le barème de l’agence est public : 6 % jusqu’à 150 000 €, 5 % de 150 000 € à 1 000 000 €, 4 % au-delà. La valeur indiquée sur le mandat s’applique." },
];

export default function Vendre() {
  return (
    <>
      <JsonLd data={serviceLd({ name: "Vente immobilière", description: DESC, path: "/vendre" })} />
      <JsonLd data={faqLd(FAQ)} />
      <PageHero crumbs={[{"name":"Vendre","path":"/vendre"}]} eyebrow="Vendre" title="Vendez avec une agence qui connaît le terrain." text="De l’estimation à la signature, un accompagnement à Saint-Raphaël et dans les communes voisines." image="/media/saint-raphael-port.webp" alt="Le port de plaisance de Saint-Raphaël et sa grande roue"><Btn href="/estimation" arrow>Estimer mon bien</Btn></PageHero>
      <section className="bg-white py-20 sm:py-32">
        <Container>
          <p className="max-w-6xl text-[2rem] font-semibold leading-[1.14] tracking-[-0.02em] [font-family:var(--font-display)] sm:text-[3.4rem]"><ScrollText text="Un bon prix dépend de l’emplacement, de l’état du bien et du marché du moment. Une agence installée à Saint-Raphaël sait lire ces critères, quartier par quartier." /></p>
        </Container>
      </section>
      <section className="bg-night py-20 text-white sm:py-32"><Container><Title light eyebrow="La méthode" title="Quatre temps pour vendre sereinement." /><div className="mt-12"><Steps dark items={STEPS} /></div></Container></section>
      <GiantMarquee />
      <Split eyebrow="Pour préparer votre vente" title="Les documents à réunir." image="/media/vieux-port.webp" alt="Le Vieux-Port de Saint-Raphaël, ses bateaux et ses façades" reverse>
        <p>Les réunir tôt évite de retarder la vente. <Link href="/honoraires" className="line-on font-medium text-night">Consulter le barème des honoraires</Link></p>
        <div className="pt-2"><Checks items={DOCS} /></div>
      </Split>
      <Questions items={FAQ} title="Avant de vendre." />
      <FormBlock eyebrow="Votre projet" title="Parlons de votre vente." text="Présentez votre bien et votre calendrier. Pour une estimation guidée, utilisez le parcours dédié.">
        <RequestForm id="ven" kind="Projet de vente" message="Votre projet et votre calendrier" fields={[
          { name: "type", label: "Type de bien", type: "select", options: ["Appartement", "Maison ou villa", "Studio", "Terrain", "Local commercial", "Immeuble"], required: true },
          { name: "commune", label: "Commune ou quartier", required: true },
          { name: "surface", label: "Surface (m²)", type: "number" },
        ]} />
      </FormBlock>
      <RedBand eyebrow="Estimation" title="Combien vaut votre bien ?" text="Quatre questions, et l’agence étudie votre demande." primary={{ label: "Estimer mon bien", href: "/estimation" }} image="/media/port-soir.webp" alt="Le port de Saint-Raphaël et sa basilique, le soir" />
      <Further items={[{ label: "Demander une estimation", href: "/estimation" }, { label: "Vendre : comment se préparer ?", href: "/conseils/vendre-son-bien-se-preparer" }, { label: "Comment faire estimer une maison ?", href: "/questions#faire-estimer-maison" }, { label: "Barème des honoraires", href: "/honoraires" }]} />
    </>
  );
}
