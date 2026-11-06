import { PropertyCard } from "@/components/PropertyCard";
import { RequestForm } from "@/components/RequestForm";
import { GiantMarquee, PhotoColumns, ScrollText } from "@/components/ScrollFx";
import { FormBlock, Steps, Further } from "@/components/Sections";
import { Btn, Container, PageHero, Title, JsonLd } from "@/components/ui";
import { agency } from "@/data/agency";
import { getCards } from "@/lib/listings";
import { pageMeta, serviceLd } from "@/lib/seo";

const DESC = "Location de vacances à Saint-Raphaël et sur la Côte d’Azur : renseignez-vous auprès de CAPITAL IMMOBILIER et envoyez une demande pour votre séjour.";
export const metadata = pageMeta({ title: "Location de vacances à Saint-Raphaël", description: DESC, path: "/location-vacances", image: "/media/calanque.webp" });

const STEPS = [
  { t: "Votre séjour", d: "Indiquez vos dates, le nombre de voyageurs et le secteur souhaité." },
  { t: "La réponse", d: "L’agence vous dit ce qui est disponible : aucun calendrier automatique ici, un échange direct." },
  { t: "La réservation", d: "Les conditions, le prix et le contrat vous sont transmis par l’agence." },
];

export default function Vacances() {
  const cards = getCards().filter((c) => c.transaction === "vacances");
  return (
    <>
      <JsonLd data={serviceLd({ name: "Location de vacances", description: DESC, path: "/location-vacances" })} />
      <PageHero crumbs={[{"name":"Louer","path":"/louer"},{"name":"Location de vacances","path":"/location-vacances"}]} eyebrow="Location de vacances" title="Vos vacances entre Estérel et Méditerranée." text="Des séjours à Saint-Raphaël et sur la Côte d’Azur, à demander directement à l’agence." image="/media/calanque.webp" alt="Une calanque de la corniche d’Or, entre roches rouges et eau turquoise"><Btn href="#demande" arrow>Demander un séjour</Btn></PageHero>
      <section className="bg-white py-20 sm:py-32">
        <Container>
          <p className="max-w-6xl text-[2rem] font-semibold leading-[1.14] tracking-[-0.02em] [font-family:var(--font-display)] sm:text-[3.4rem]"><ScrollText text="Roches rouges, calanques et petits ports : le littoral de l’Estérel se découvre à pied, en bateau ou depuis une terrasse." /></p>
        </Container>
      </section>
      <PhotoColumns title="La Côte d’Azur, côté Estérel." />
      <section className="bg-white py-20 sm:py-32">
        <Container>
          <Title eyebrow="Logements" title="Les logements disponibles." />
          {cards.length > 0
            ? <ul className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{cards.map((p) => <li key={p.id} className="scale-in"><PropertyCard property={p} /></li>)}</ul>
            : (
              <div className="mt-10 border-l-4 border-sea bg-sand/40 p-7 sm:p-10">
                <p className="text-[1.9rem] leading-tight text-night [font-family:var(--font-display)]">Aucun logement de vacances n’est en ligne pour le moment.</p>
                <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">Envoyez votre demande ou appelez le {agency.phone} : l’agence vous dira ce qu’elle peut vous proposer.</p>
              </div>
            )}
        </Container>
      </section>
      <GiantMarquee />
      <section className="bg-white pb-20 sm:pb-32"><Container><Title eyebrow="Comment ça marche" title="Trois étapes, un échange direct." /><div className="mt-12"><Steps items={STEPS} /></div></Container></section>
      <FormBlock eyebrow="Votre séjour" title="Demandez votre séjour." text="Cette demande n’est pas une réservation : l’agence vous répond avec ce qui est disponible.">
        <RequestForm id="vac" kind="Demande de location de vacances" message="Précisions" messageRequired={false} submit="Envoyer ma demande de séjour" fields={[
          { name: "arrivee", label: "Arrivée souhaitée", required: true, placeholder: "Par exemple : 12 juillet" },
          { name: "depart", label: "Départ souhaité", required: true, placeholder: "Par exemple : 26 juillet" },
          { name: "voyageurs", label: "Nombre de voyageurs", type: "number", required: true },
          { name: "secteur", label: "Secteur souhaité", placeholder: "Saint-Raphaël, Agay, Fréjus…" },
        ]} />
      </FormBlock>
      <Further items={[{ label: "Les quartiers de Saint-Raphaël", href: "/conseils/quartiers-saint-raphael" }, { label: "Agay et sa rade", href: "/secteurs/agay" }, { label: "Santa Lucia et son port", href: "/secteurs/santa-lucia" }]} />
    </>
  );
}
