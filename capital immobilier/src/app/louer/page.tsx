import { Reveal } from "@/components/Motion";
import { PropertyCard } from "@/components/PropertyCard";
import { RequestForm } from "@/components/RequestForm";
import { Checks, faqLd, FormBlock, Questions, Split, Steps, Further } from "@/components/Sections";
import { Btn, Container, JsonLd, PageHero, Title } from "@/components/ui";
import { getCards } from "@/lib/listings";
import { pageMeta, serviceLd } from "@/lib/seo";

const DESC = "Appartements et maisons à louer à Fréjus, à Fayence et dans les communes voisines : les annonces de CAPITAL IMMOBILIER et le dossier à préparer.";
export const metadata = pageMeta({ title: "Location à l’année autour de Saint-Raphaël", description: DESC, path: "/louer", image: "/media/cap-esterel-allee.webp" });

const STEPS = [
  { t: "Repérer", d: "Consultez les annonces et gardez vos favoris pour les retrouver facilement." },
  { t: "Visiter", d: "Demandez une visite depuis la fiche du bien : l’agence revient vers vous." },
  { t: "Déposer le dossier", d: "Vous transmettez les justificatifs demandés, étudiés avec le propriétaire." },
  { t: "Signer le bail", d: "Bail, état des lieux et remise des clés : vous emménagez." },
];
const FILE = ["Une pièce d’identité", "Un justificatif de domicile", "Un justificatif de situation professionnelle", "Des justificatifs de ressources", "Le dossier de votre garant, le cas échéant"];
const FAQ = [
  { q: "Quels honoraires paie le locataire ?", a: "Les honoraires de visite, de constitution du dossier et de rédaction du bail, ainsi que l’état des lieux, sont plafonnés par la loi. Le détail figure sur le barème de l’agence et sur chaque annonce." },
  { q: "Quelle est la durée d’un bail ?", a: "Lorsque le bailleur est un particulier, le bail d’un logement vide dure au moins 3 ans, et celui d’un logement meublé au moins 1 an, ou 9 mois pour un étudiant." },
  { q: "Qu’est-ce que le dépôt de garantie ?", a: "Une somme versée à la signature et restituée après le départ, déduction faite des sommes justifiées. Son montant figure sur l’annonce." },
];

export default function Louer() {
  const cards = getCards().filter((c) => c.transaction === "location").sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  return (
    <>
      <JsonLd data={serviceLd({ name: "Location immobilière", description: DESC, path: "/louer" })} />
      <JsonLd data={faqLd(FAQ)} />
      <PageHero crumbs={[{"name":"Louer","path":"/louer"}]} eyebrow="Louer" title="Votre prochain logement est peut-être ici." text="Des appartements et des maisons à l’année, de Fréjus au pays de Fayence." image="/media/cap-esterel-allee.webp" alt="L’allée des Fleurs à Cap Estérel, entre palmiers et résidences"><Btn href="/biens?transaction=location" arrow>{`Voir les ${cards.length} locations`}</Btn></PageHero>
      <section className="bg-white py-20 sm:py-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Title eyebrow="À louer" title="Nos locations du moment." />
            <Reveal><Btn href="/location-vacances" variant="line" arrow>Location de vacances</Btn></Reveal>
          </div>
          <ul className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((p, i) => <li key={p.id} className="scale-in"><PropertyCard property={p} priority={i < 3} /></li>)}
          </ul>
        </Container>
      </section>
      <section className="bg-night py-20 text-white sm:py-32"><Container><Title light eyebrow="Le parcours" title="Louer, étape par étape." /><div className="mt-12"><Steps dark items={STEPS} /></div></Container></section>
      <Split eyebrow="Votre dossier" title="Ce qu’il faut préparer." image="/media/frejus-residences.webp" alt="Des résidences de Port-Fréjus, avec leurs bateaux au pied des immeubles">
        <p>Préparer ces documents à l’avance permet de répondre vite quand un logement vous plaît.</p>
        <div className="pt-2"><Checks items={FILE} /></div>
      </Split>
      <Questions items={FAQ} title="Avant de louer." />
      <FormBlock eyebrow="Recherche personnalisée" title="Dites-nous ce que vous cherchez." text="Aucune annonce ne correspond ? L’agence peut vous répondre directement.">
        <RequestForm id="loc" kind="Recherche personnalisée (location)" message="Précisions sur votre recherche" messageRequired={false} fields={[
          { name: "type", label: "Type de bien", type: "select", options: ["Appartement", "Maison ou villa", "Studio"], required: true },
          { name: "secteur", label: "Secteur recherché", required: true, placeholder: "Fréjus, Fayence, Saint-Raphaël…" },
          { name: "loyer", label: "Loyer maximum (€ par mois)", type: "number", required: true },
        ]} />
      </FormBlock>
      <Further items={[{ label: "Appartements à louer autour de Saint-Raphaël", href: "/annonces/location-appartement-saint-raphael" }, { label: "Locaux commerciaux à louer", href: "/annonces/locaux-commerciaux-a-louer" }, { label: "Le pays de Fayence", href: "/secteurs/pays-de-fayence" }, { label: "Location de vacances", href: "/location-vacances" }]} />
    </>
  );
}
