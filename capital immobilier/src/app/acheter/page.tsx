import { Reveal } from "@/components/Motion";
import { PropertyCard } from "@/components/PropertyCard";
import { RequestForm } from "@/components/RequestForm";
import { GiantMarquee, ScrollText } from "@/components/ScrollFx";
import { faqLd, FormBlock, Questions, RedBand, Steps, Further } from "@/components/Sections";
import { Btn, Container, JsonLd, PageHero, Title } from "@/components/ui";
import { getCards } from "@/lib/listings";
import { pageMeta, serviceLd } from "@/lib/seo";

const DESC = "Appartements, maisons et villas à vendre à Saint-Raphaël, à Fréjus et alentour : les annonces de CAPITAL IMMOBILIER et un accompagnement jusqu’à la signature.";
export const metadata = pageMeta({ title: "Appartements et maisons à vendre à Saint-Raphaël", description: DESC, path: "/acheter", image: "/media/agay-roches.webp" });

const STEPS = [
  { t: "Définir le projet", d: "Secteur, surface, budget : on part de votre apport et de ce que votre banque peut vous prêter." },
  { t: "Visiter", d: "L’agence vous présente les biens qui correspondent à votre recherche, et répond à vos questions." },
  { t: "Faire une offre", d: "Une fois l’offre acceptée, vous signez un avant-contrat : un compromis ou une promesse de vente." },
  { t: "Signer", d: "Après le délai de rétractation et l’obtention du prêt, l’acte définitif se signe chez le notaire." },
];
const FAQ = [
  { q: "Quels frais prévoir en plus du prix ?", a: "Des frais d’acquisition, souvent appelés frais de notaire. Dans l’ancien, ils représentent généralement 7 à 8 % du prix." },
  { q: "Peut-on se rétracter après le compromis ?", a: "Oui. L’acheteur non professionnel dispose d’un délai de rétractation de 10 jours à partir du lendemain de la remise de l’acte, sans avoir à se justifier." },
  { q: "À quoi sert la condition suspensive de prêt ?", a: "Si le prêt est refusé dans le délai prévu, au moins un mois, la vente est annulée et votre dépôt de garantie vous est rendu." },
  { q: "Combien de temps dure un achat ?", a: "Il faut souvent compter environ trois mois entre le compromis et la signature de l’acte définitif chez le notaire." },
];

export default function Acheter() {
  const cards = getCards().filter((c) => c.transaction === "vente").sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  return (
    <>
      <JsonLd data={serviceLd({ name: "Transaction immobilière", description: DESC, path: "/acheter" })} />
      <JsonLd data={faqLd(FAQ)} />
      <PageHero crumbs={[{"name":"Acheter","path":"/acheter"}]} eyebrow="Acheter" title="Trouvez le bien qui vous ressemble." text="Des appartements et des maisons à Saint-Raphaël, à Fréjus et dans leurs environs, avec une agence qui connaît chaque secteur." image="/media/agay-roches.webp" alt="Les roches rouges d’Agay plongeant dans une eau claire"><Btn href="/biens?transaction=vente" arrow>{`Voir les ${cards.length} biens à vendre`}</Btn></PageHero>
      <section className="bg-white py-20 sm:py-32">
        <Container>
          <p className="max-w-6xl text-[2rem] font-semibold leading-[1.14] tracking-[-0.02em] [font-family:var(--font-display)] sm:text-[3.4rem]"><ScrollText text="Acheter, c’est d’abord choisir un lieu de vie. L’agence vous aide à situer chaque bien dans son quartier, puis vous accompagne de la première visite à la signature." /></p>
        </Container>
      </section>
      <section className="bg-white pb-20 sm:pb-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Title eyebrow="À vendre" title="Nos biens du moment." />
            <Reveal><Btn href="/biens?transaction=vente" variant="line" arrow>Filtrer les annonces</Btn></Reveal>
          </div>
          <ul className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {cards.slice(0, 6).map((p, i) => <li key={p.id} className="scale-in"><PropertyCard property={p} priority={i < 3} /></li>)}
          </ul>
        </Container>
      </section>
      <GiantMarquee />
      <section className="bg-white pb-20 sm:pb-32"><Container><Title eyebrow="Le parcours" title="Les étapes d’un achat." /><div className="mt-12"><Steps items={STEPS} /></div></Container></section>
      <Questions items={FAQ} title="Avant d’acheter." />
      <FormBlock eyebrow="Recherche personnalisée" title="Décrivez le bien que vous cherchez." text="Vous ne trouvez pas dans nos annonces ? Dites-nous ce que vous cherchez, l’agence vous répond.">
        <RequestForm id="ach" kind="Recherche personnalisée (achat)" message="Précisions sur votre recherche" messageRequired={false} fields={[
          { name: "type", label: "Type de bien", type: "select", options: ["Appartement", "Maison ou villa", "Studio", "Terrain", "Local commercial"], required: true },
          { name: "secteur", label: "Secteur recherché", required: true, placeholder: "Saint-Raphaël, Fréjus, Agay…" },
          { name: "budget", label: "Budget maximum (€)", type: "number", required: true },
        ]} />
      </FormBlock>
      <RedBand title="Vous avez aussi un bien à vendre ?" text="Commencez par une estimation." primary={{ label: "Estimer mon bien", href: "/estimation" }} secondary={{ label: "Vendre avec l’agence", href: "/vendre" }} />
      <Further items={[{ label: "Appartements à vendre à Saint-Raphaël", href: "/annonces/appartements-a-vendre-saint-raphael" }, { label: "Acheter un appartement : les étapes", href: "/conseils/acheter-appartement-saint-raphael" }, { label: "Les quartiers de Saint-Raphaël", href: "/conseils/quartiers-saint-raphael" }, { label: "Investir dans l’immobilier à Saint-Raphaël", href: "/conseils/investir-immobilier-saint-raphael" }]} />
    </>
  );
}
