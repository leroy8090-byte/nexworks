import { Reveal } from "@/components/Motion";
import { Container, PageHero, Title } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

const DESC = "Le barème des honoraires de CAPITAL IMMOBILIER pour la vente et la location, tel que publié par l’agence, à confirmer avec elle pour chaque bien.";
export const metadata = pageMeta({ title: "Barème des honoraires", description: DESC, path: "/honoraires", image: "/media/ile-or.webp" });

const row = "flex items-baseline justify-between gap-6 border-b border-night/20 py-4";
const SALE: [string, string][] = [["Jusqu’à 150 000 €", "6 %"], ["De 150 000 € à 1 000 000 €", "5 %"], ["Au-delà de 1 000 000 €", "4 %"]];
const RENT: [string, string][] = [["Zone très tendue", "12 € TTC du m²"], ["Zone tendue", "10 € TTC du m²"], ["Ailleurs", "8 € TTC du m²"], ["Réalisation de l’état des lieux", "3 € TTC du m²"]];

export default function Honoraires() {
  return (
    <>
      <PageHero crumbs={[{"name":"Barème des honoraires","path":"/honoraires"}]} eyebrow="Honoraires" title="Barème des honoraires." text="Le barème publié par l’agence, à confirmer avec elle pour votre situation." image="/media/ile-or.webp" alt="L’île d’Or et sa tour, au large du Dramont" />
      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Title eyebrow="Tous types de mandat" title="Vente" />
            <Reveal className="mt-8 border-t-2 border-night">{SALE.map(([k, v]) => <div key={k} className={row}><span className="text-[17px] text-muted">{k}</span><span className="text-[1.9rem] font-bold tracking-[-0.03em] text-sea [font-family:var(--font-display)]">{v}</span></div>)}</Reveal>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">Les honoraires ne dépasseront pas les valeurs de ce barème, ni la valeur indiquée sur le mandat de vente ou de recherche consenti par le mandant.</p>
          </div>
          <div>
            <Title eyebrow="À la charge du locataire" title="Location" />
            <Reveal className="mt-8 border-t-2 border-night">{RENT.map(([k, v]) => <div key={k} className={row}><span className="text-[17px] text-muted">{k}</span><span className="whitespace-nowrap text-[1.4rem] font-bold tracking-[-0.02em] text-sea [font-family:var(--font-display)]">{v}</span></div>)}</Reveal>
            <p className="mt-5 text-[15.5px] leading-relaxed text-muted">Les trois premières lignes concernent les honoraires de visite du preneur, de constitution de son dossier et de rédaction du bail.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
