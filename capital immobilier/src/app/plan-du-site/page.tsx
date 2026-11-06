import Link from "next/link";
import { Reveal } from "@/components/Motion";
import { Container, Crumbs, JsonLd } from "@/components/ui";
import { articles } from "@/data/articles";
import { sectors } from "@/data/agency";
import { landings } from "@/data/landings";
import { getCards } from "@/lib/listings";
import { pageMeta, webPageLd } from "@/lib/seo";

const DESC = "Le plan du site de CAPITAL IMMOBILIER : services, annonces de vente et de location, secteurs, conseils, questions fréquentes et informations légales.";
export const metadata = pageMeta({ title: "Plan du site", description: DESC, path: "/plan-du-site" });

export default function Plan() {
  const cards = getCards();
  const label = (c: (typeof cards)[number]) => `${c.title}, ${c.commune}${c.ref ? ` (réf. ${c.ref})` : ""}`;
  const groups: { title: string; links: [string, string][] }[] = [
    { title: "Services", links: [["Acheter", "/acheter"], ["Louer", "/louer"], ["Location de vacances", "/location-vacances"], ["Vendre", "/vendre"], ["Estimer mon bien", "/estimation"], ["Gestion locative", "/gestion-locative"], ["Syndic de copropriété", "/syndic"], ["ASL et ASA", "/asl-asa"]] },
    { title: "L’agence", links: [["Découvrir l’agence", "/agence"], ["Contact", "/contact"], ["Barème des honoraires", "/honoraires"], ["Questions fréquentes", "/questions"], ["Mes favoris", "/favoris"]] },
    { title: "Recherches", links: [["Toutes les annonces", "/biens"], ...landings.map((l): [string, string] => [l.h1, `/annonces/${l.slug}`])] },
    { title: "Secteurs", links: [["Nos secteurs", "/secteurs"], ...sectors.map((s): [string, string] => [s.h1, `/secteurs/${s.slug}`])] },
    { title: "Conseils", links: [["Tous les conseils", "/conseils"], ...articles.map((a): [string, string] => [a.title, `/conseils/${a.slug}`])] },
    { title: "Informations", links: [["Mentions légales", "/mentions-legales"], ["Politique de confidentialité", "/confidentialite"], ["Crédits photos", "/credits-photos"]] },
    { title: "Biens à vendre", links: cards.filter((c) => c.transaction === "vente").map((c): [string, string] => [label(c), `/biens/${c.slug}`]) },
    { title: "Biens à louer", links: cards.filter((c) => c.transaction === "location").map((c): [string, string] => [label(c), `/biens/${c.slug}`]) },
  ];
  return (
    <section className="bg-white pb-24 pt-44 sm:pt-52">
      <JsonLd data={webPageLd({ name: "Plan du site", path: "/plan-du-site", description: DESC })} />
      <Container>
        <Crumbs items={[{ name: "Plan du site", path: "/plan-du-site" }]} className="mb-6" />
        <h1 className="text-[3rem] leading-[0.96] text-night sm:text-[5.4rem]">Plan du site</h1>
        <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2">
          {groups.map((g) => (
            <Reveal key={g.title}>
              <h2 className="border-b-2 border-night pb-3 text-[1.7rem] leading-tight text-night sm:text-[2.2rem]">{g.title}</h2>
              <ul className="mt-3">{g.links.map(([l, h]) => <li key={h}><Link href={h} className="block py-1.5 text-[16.5px] leading-snug text-muted transition-[color,padding] duration-300 hover:pl-1.5 hover:text-sea">{l}</Link></li>)}</ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
