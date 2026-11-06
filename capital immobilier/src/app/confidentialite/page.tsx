import { Container, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

const DESC = "Comment le site de CAPITAL IMMOBILIER traite les données de ses formulaires, les favoris et les contenus de services tiers : finalités, durées et droits.";
export const metadata = pageMeta({ title: "Politique de confidentialité", description: DESC, path: "/confidentialite", image: "/media/ile-or.webp" });

const BLOCKS: [string, string][] = [
  ["Formulaires", "Les formulaires recueillent votre nom, vos coordonnées, votre message et, pour une estimation, l’adresse du bien, uniquement pour répondre à votre demande. Ils ne fonctionnent que si une adresse de destination est configurée : dans le cas contraire, ils vous l’indiquent et n’envoient rien."],
  ["Cookies et contenus tiers", "Le site ne dépose aucun cookie de suivi. Avec votre accord, il affiche des cartes Google Maps, qui peuvent déposer leurs propres cookies. Tant que vous n’avez pas accepté, la carte n’est pas chargée. Votre choix est gardé six mois dans votre navigateur, et vous pouvez le modifier à tout moment avec le lien « Gestion des cookies » en bas de chaque page."],
  ["Favoris", "Les biens que vous ajoutez à vos favoris restent dans votre navigateur. Ils ne sont envoyés à personne."],
];

export default function Confidentialite() {
  return (
    <>
      <PageHero crumbs={[{"name":"Politique de confidentialité","path":"/confidentialite"}]} eyebrow="Informations" title="Politique de confidentialité." image="/media/ile-or.webp" alt="L’île d’Or et sa tour, au large du Dramont" />
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl space-y-10">
            {BLOCKS.map(([t, d]) => <div key={t}><h2 className="text-[1.9rem] leading-tight text-night">{t}</h2><p className="mt-3 text-[17px] leading-[1.7] text-muted">{d}</p></div>)}
            <div className="border-l-4 border-sea pl-5"><h2 className="text-[1.9rem] leading-tight text-night">À compléter avant la mise en ligne</h2><p className="mt-3 text-[17px] leading-[1.7] text-muted">Responsable de traitement, durées de conservation et modalités d’exercice de vos droits : à rédiger avec l’agence.</p></div>
          </div>
        </Container>
      </section>
    </>
  );
}
