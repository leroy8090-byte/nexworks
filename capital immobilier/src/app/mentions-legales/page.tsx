import { Container, PageHero } from "@/components/ui";
import { agency, LIVE } from "@/data/agency";
import { pageMeta } from "@/lib/seo";

const DESC = "Mentions légales du site de CAPITAL IMMOBILIER, agence immobilière à Saint-Raphaël : éditeur, coordonnées, carte professionnelle et hébergement.";
export const metadata = pageMeta({ title: "Mentions légales", description: DESC, path: "/mentions-legales", image: "/media/ile-or.webp" });

const TODO = "À compléter par l’agence";

export default function Mentions() {
  const rows: [string, string][] = [
    ...(LIVE ? [] : [["Nature de ce site", "Concept de refonte réalisé par NEXWORKS AGENCY, non officiel. Le site officiel de l’agence reste capitalimmobilier.fr."] as [string, string]]),
    ["Dénomination", agency.name],
    ["Adresse", `${agency.street}, ${agency.postalCode} ${agency.city}`],
    ["Téléphone et e-mail", `${agency.phone}, ${agency.email}`],
    ["Forme sociale et capital", TODO],
    ["RCS et numéro de TVA", TODO],
    ["Carte professionnelle et préfecture de délivrance", TODO],
    ["Garantie financière et montant", TODO],
    ["Assurance de responsabilité civile professionnelle", TODO],
    ["Médiateur de la consommation", TODO],
    ["Directeur de la publication", TODO],
    ["Hébergeur", "À compléter lors de la mise en ligne"],
    ["Photographies", "Annonces : photos de l’agence. Paysages : voir la page Crédits photos."],
  ];
  return (
    <>
      <PageHero crumbs={[{"name":"Mentions légales","path":"/mentions-legales"}]} eyebrow="Informations" title="Mentions légales." image="/media/ile-or.webp" alt="L’île d’Or et sa tour, au large du Dramont" />
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <dl className="max-w-4xl border-t-2 border-night">
            {rows.map(([k, v]) => <div key={k} className="grid gap-1 border-b border-night/20 py-5 sm:grid-cols-[20rem_1fr] sm:gap-8"><dt className="text-[15.5px] text-muted">{k}</dt><dd className={`text-[16.5px] leading-relaxed ${v.startsWith("À compléter") ? "font-semibold text-sea" : "text-night"}`}>{v}</dd></div>)}
          </dl>
        </Container>
      </section>
    </>
  );
}
