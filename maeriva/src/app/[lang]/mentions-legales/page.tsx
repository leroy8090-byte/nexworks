import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { asLang, localePath } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return lang === "fr"
    ? pageMeta({ lang, title: "Mentions légales", path: "/mentions-legales", description: "Mentions légales du site de démonstration MAÉRIVA." })
    : pageMeta({ lang, title: "Legal notice", path: "/mentions-legales", description: "Legal notice of the MAÉRIVA demonstration website." });
}

export default async function LegalPage({ params }: Props) {
  const lang = asLang((await params).lang);
  const credits = localePath(lang, "/credits-photos");
  if (lang === "en") {
    return (
      <Legal lang="en" title="Legal notice">
        <div><h2>Demonstration website</h2><p>This website is a demonstration project by NEXWORKS AGENCY. The MAÉRIVA agency, its properties, its prices and its phone number are fictional: no property is actually for sale or for rent. The phone number shown belongs to a range reserved for works of fiction.</p></div>
        <div><h2>Publisher</h2><p>NEXWORKS AGENCY, website design and development. Full contact details to be completed when the website goes live.</p></div>
        <div><h2>For a real agency</h2><p>A French real estate agency must state here its company name, its registration number, the number of its professional licence (carte professionnelle) and the authority that issued it, its financial guarantee, its professional liability insurance and its fee schedule. This information will be added with the agency&apos;s details.</p></div>
        <div><h2>Photographs</h2><p>The photographs are royalty-free and come from Wikimedia Commons; they illustrate types of properties and do not show the properties described. See the <a href={credits}>photo credits</a> page.</p></div>
      </Legal>
    );
  }
  return (
    <Legal title="Mentions légales">
      <div><h2>Site de démonstration</h2><p>Ce site est une réalisation de démonstration de NEXWORKS AGENCY. L&apos;agence MAÉRIVA, ses biens, ses prix et son numéro de téléphone sont fictifs : aucun bien n&apos;est réellement à vendre ou à louer. Le numéro affiché appartient à une tranche réservée aux œuvres de fiction.</p></div>
      <div><h2>Éditeur</h2><p>NEXWORKS AGENCY, conception et développement du site. Coordonnées complètes à compléter lors d&apos;une mise en service.</p></div>
      <div><h2>Pour une agence réelle</h2><p>Une agence immobilière doit indiquer ici sa raison sociale, son numéro d&apos;immatriculation, le numéro de sa carte professionnelle et la préfecture ou la CCI qui l&apos;a délivrée, sa garantie financière, son assurance de responsabilité civile professionnelle et son barème d&apos;honoraires. Ces informations seront ajoutées avec celles de l&apos;agence.</p></div>
      <div><h2>Photographies</h2><p>Les photographies sont libres de droits et proviennent de Wikimedia Commons ; elles illustrent des types de biens et ne montrent pas les propriétés décrites. Voir la page <a href={credits}>crédits photos</a>.</p></div>
    </Legal>
  );
}
