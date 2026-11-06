import { Count } from "@/components/Count";
import { Reveal } from "@/components/Motion";
import { GiantMarquee, ScrollText } from "@/components/ScrollFx";
import { RedBand, Split, Further } from "@/components/Sections";
import { ServiceRows } from "@/components/ServiceRows";
import { Btn, Container, PageHero, Title } from "@/components/ui";
import { agency, proofs, sectors, services } from "@/data/agency";
import { coverOf, getCards } from "@/lib/listings";
import { pageMeta } from "@/lib/seo";

const DESC = "CAPITAL IMMOBILIER, agence immobilière au cœur de Saint-Raphaël : transaction, location, gestion locative, syndic de copropriété, ASL et ASA.";
export const metadata = pageMeta({ title: "L’agence immobilière à Saint-Raphaël", description: DESC, path: "/agence", image: "/media/agay.webp" });

export default function Agence() {
  const cards = getCards();
  const items = services.map((s) => ({ ...s, image: s.image.startsWith("listing:") ? coverOf(s.image.slice(8)) ?? "/media/massif-esterel.webp" : s.image }));
  return (
    <>
      <PageHero crumbs={[{"name":"L’agence","path":"/agence"}]} eyebrow="L’agence" title="Une agence locale, tous les métiers de l’immobilier." text="Située au cœur de Saint-Raphaël, CAPITAL IMMOBILIER accompagne particuliers, propriétaires et copropriétaires." image="/media/agay.webp" alt="La rade d’Agay vue du Dramont"><Btn href="/contact" arrow>Nous rencontrer</Btn></PageHero>
      <section className="bg-white py-20 sm:py-32">
        <Container>
          <p className="max-w-6xl text-[2rem] font-semibold leading-[1.14] tracking-[-0.02em] [font-family:var(--font-display)] sm:text-[3.4rem]"><ScrollText text="L’agence a fait un choix clair : se spécialiser dans les petites et moyennes copropriétés, les ASL et ASA et le démarrage des copropriétés neuves, tout en vous accompagnant dans la vente, la location et la gestion de vos biens." /></p>
          <dl className="mt-14 grid grid-cols-3 gap-5 border-t-2 border-night pt-6">
            {[["Biens à vendre", cards.filter((c) => c.transaction === "vente").length], ["Biens à louer", cards.filter((c) => c.transaction === "location").length], ["Secteurs présentés", sectors.length]].map(([k, v]) => (
              <div key={k as string}><dd className="text-[3.4rem] font-bold leading-none tracking-[-0.04em] text-sea [font-family:var(--font-display)] sm:text-[6rem]"><Count value={v as number} /></dd><dt className="mt-2 text-[15px] text-muted">{k}</dt></div>
            ))}
          </dl>
        </Container>
      </section>
      <GiantMarquee />
      <section className="bg-night py-20 text-white sm:py-32"><Container><Title light eyebrow="Nos services" title="Six métiers, un seul interlocuteur local." /><div className="mt-12"><ServiceRows items={items} /></div></Container></section>
      <Split eyebrow="Nous trouver" title="Où et comment nous joindre." image="/media/vieux-port.webp" alt="Le Vieux-Port de Saint-Raphaël, ses bateaux et ses façades">
        <p>{agency.street}, {agency.postalCode} {agency.city}.</p>
        <p><a href={`tel:${agency.phoneHref}`} className="line-on font-semibold text-night">{agency.phone}</a><br /><a href={`mailto:${agency.email}`} className="line-on mt-2 inline-block break-all font-semibold text-night">{agency.email}</a></p>
        <p className="border-l-4 border-sea pl-4 text-[16px]">Histoire, équipe et horaires d’ouverture : à compléter avec l’agence.</p>
      </Split>
      <section className="bg-night py-20 text-white sm:py-32">
        <Container>
          <Title light eyebrow="Les engagements de l’agence" title="Ce sur quoi vous pouvez compter." />
          <ul className="mt-12 grid gap-x-10 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
            {proofs.map((p, i) => <li key={p.t}><Reveal delay={(i % 3) * 0.08} className="border-t border-white/25 py-6 transition-colors duration-500 hover:border-sea"><p className="text-[1.5rem] leading-tight [font-family:var(--font-display)]">{p.t}</p><p className="mt-2 text-[16px] leading-relaxed text-white/70">{p.d}</p></Reveal></li>)}
          </ul>
        </Container>
      </section>
      <RedBand title="Parlons de votre projet." primary={{ label: "Contacter l’agence", href: "/contact" }} secondary={{ label: "Découvrir nos annonces", href: "/biens" }} image="/media/ile-or.webp" alt="L’île d’Or et sa tour, au large du Dramont" />
      <Further items={[{ label: "Nos secteurs", href: "/secteurs" }, { label: "Questions fréquentes", href: "/questions" }, { label: "Conseils immobiliers", href: "/conseils" }, { label: "Quelle agence contacter à Saint-Raphaël ?", href: "/questions#quelle-agence-saint-raphael" }]} />
    </>
  );
}
