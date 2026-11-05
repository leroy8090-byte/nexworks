import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { Container, JsonLd, PageHero } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site NEXWORKS AGENCY : éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  path: "/mentions-legales",
});

const h2 = "mt-12 font-display text-2xl font-bold text-white";
const p = "mt-3 text-[17px] leading-relaxed text-mist";

export default function MentionsLegalesPage() {
  const { legal, contactEmail, name } = siteConfig;
  // Seuls les champs renseignés apparaissent : rien n'est inventé.
  const publisher: [string, string][] = (
    [
      ["Dénomination", legal.company || name],
      ["Forme juridique", legal.form],
      ["Capital social", legal.capital],
      ["Siège social", [legal.address, legal.postalCode, legal.city].filter(Boolean).join(", ")],
      ["SIREN / SIRET", legal.siren],
      ["N° de TVA intracommunautaire", legal.vat],
      ["Directeur de la publication", legal.director],
      ["Téléphone", legal.phone],
      ["E-mail", contactEmail],
    ] as [string, string][]
  ).filter(([, v]) => v);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Mentions légales", path: "/mentions-legales" }])} />
      <PageHero eyebrow="Informations légales" title="Mentions légales" text="Les informations relatives à l'éditeur et à l'hébergeur de ce site." />
      <section className="pb-28 sm:pb-40">
        <Container>
          <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white">Éditeur du site</h2>
          <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {publisher.map(([label, value]) => (
              <div key={label} className="grid gap-1 py-3 sm:grid-cols-[240px_1fr]">
                <dt className="text-[15px] font-semibold text-white">{label}</dt>
                <dd className="text-[15px] text-mist">{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className={h2}>Hébergeur</h2>
          <p className={p}>Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis. Site : vercel.com.</p>

          <h2 className={h2}>Propriété intellectuelle</h2>
          <p className={p}>
            Les textes, visuels et éléments graphiques de ce site sont protégés. Toute reproduction sans autorisation préalable est interdite. Les projets présentés dans les réalisations sont des sites de démonstration pour des établissements fictifs, et non des clients réels.
          </p>

          <h2 className={h2}>Données personnelles</h2>
          <p className={p}>
            Le traitement des informations transmises par le formulaire de contact est décrit dans la{" "}
            <Link href="/confidentialite" className="font-bold text-white underline-offset-4 hover:underline">
              politique de confidentialité
            </Link>
            .
          </p>

          <h2 className={h2}>Référencement et intelligence artificielle</h2>
          <p className={p}>
            Les informations de ce site décrivent des services d&apos;optimisation. Aucune position sur un moteur de recherche ni aucune citation par une intelligence artificielle n&apos;est garantie.
          </p>
          </div>
        </Container>
      </section>
    </>
  );
}
