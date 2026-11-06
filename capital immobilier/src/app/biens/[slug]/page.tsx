import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { ActionBar, ContactActions, ListingForm } from "@/components/ListingContact";
import { MapFrame } from "@/components/MapFrame";
import { Reveal } from "@/components/Motion";
import { Heart, PropertyCard } from "@/components/PropertyCard";
import { Container, Crumbs, HeroWords, JsonLd, Title } from "@/components/ui";
import { agency, sectors } from "@/data/agency";
import { euro, priceLabel, sectorMatches, surfaceLabel } from "@/lib/filter";
import { allSlugs, factGroups, getListing, similarTo } from "@/lib/listings";
import { abs, AGENCY_ID, clip, ogImage, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => allSlugs().map((slug) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = getListing((await params).slug);
  if (!l) return {};
  const kind = `${l.type} ${l.transaction === "vente" ? "à vendre" : "à louer"} à ${l.commune}`;
  return pageMeta({
    title: `${kind}${l.ref ? `, réf. ${l.ref}` : ""}`,
    description: clip(`${kind} : ${priceLabel({ price: l.price, transaction: l.transaction as "vente", ht: "Loyer HT" in l.facts })}${l.surface ? `, ${surfaceLabel(l.surface)}` : ""}. ${l.description}`),
    path: `/biens/${l.slug}`, image: l.photos[0], alt: `${l.title}, ${l.commune}`,
  });
}

function Facts({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid border-t border-rule sm:grid-cols-2 sm:gap-x-10">
      {rows.map(([k, v]) => <div key={k} className="flex items-baseline justify-between gap-6 border-b border-rule py-3"><dt className="text-[15.5px] text-muted">{k}</dt><dd className="text-right text-[16.5px] text-night">{v}</dd></div>)}
    </dl>
  );
}

export default async function ListingPage({ params }: Props) {
  const l = getListing((await params).slug);
  if (!l) notFound();
  const similar = similarTo(l);
  const groups = factGroups(l);
  const ht = "Loyer HT" in l.facts;
  const label = priceLabel({ price: l.price, transaction: l.transaction as "vente", ht });
  const isSale = l.transaction === "vente";
  const parent = isSale ? { name: "Acheter", path: "/acheter" } : { name: "Louer", path: "/louer" };
  const unit = l.type === "Terrain" ? "Terrain" : l.type === "Local commercial" ? "Surface" : "Surface habitable";
  const big = ([
    l.surface != null && [unit, String(Math.round(l.surface)), "m²"],
    l.rooms != null && ["Pièces", String(l.rooms), ""],
    l.bedrooms != null && l.bedrooms > 0 && ["Chambres", String(l.bedrooms), ""],
  ].filter(Boolean)) as [string, string, string][];
  const perM2 = isSale && l.price != null && l.surface ? Math.round(l.price / l.surface) : null;
  const h2 = "text-[2rem] leading-tight text-night sm:text-[2.6rem]";
  const haystack = `${l.title} ${l.description} ${l.facts["Quartier"] ?? ""}`.toLowerCase();
  const inSector = sectors.filter((s) => sectorMatches({ commune: l.commune, haystack }, s.match));
  /** Le quartier le plus précis d’abord : Agay plutôt que Saint-Raphaël. */
  const sector = inSector.find((s) => !s.match.startsWith("^")) ?? inSector[0];
  const place = l.type === "Appartement" || l.type === "Studio" ? "Apartment" : l.type === "Villa" || l.type === "Maison" ? "SingleFamilyResidence" : "Place";
  const further = [
    ...(sector ? [{ label: sector.h1, href: `/secteurs/${sector.slug}` }] : []),
    isSale ? { label: "Acheter : les étapes", href: "/conseils/acheter-appartement-saint-raphael" } : { label: "Louer avec l’agence", href: "/louer" },
    isSale ? { label: "Investir à Saint-Raphaël", href: "/conseils/investir-immobilier-saint-raphael" } : { label: "Confier un bien en gestion", href: "/gestion-locative" },
  ];
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "RealEstateListing", "@id": `${abs(`/biens/${l.slug}`)}#annonce`, url: abs(`/biens/${l.slug}`), name: l.title, description: clip(l.description, 500), image: [abs(ogImage(l.photos[0])), ...l.photos.slice(0, 5).map(abs)], ...(l.ref ? { identifier: l.ref } : {}), inLanguage: "fr-FR",
        provider: { "@id": AGENCY_ID },
        about: { "@type": place, name: l.title, address: { "@type": "PostalAddress", addressLocality: l.commune, ...(l.postalCode ? { postalCode: l.postalCode } : {}), addressRegion: "Var", addressCountry: "FR" }, ...(place !== "Place" && l.surface ? { floorSize: { "@type": "QuantitativeValue", value: l.surface, unitCode: "MTK" } } : {}), ...(place !== "Place" && l.rooms ? { numberOfRooms: l.rooms } : {}) },
        ...(l.price != null ? { offers: { "@type": "Offer", url: abs(`/biens/${l.slug}`), price: l.price, priceCurrency: "EUR", offeredBy: { "@id": AGENCY_ID }, ...(isSale ? {} : { priceSpecification: { "@type": "UnitPriceSpecification", price: l.price, priceCurrency: "EUR", unitCode: "MON", valueAddedTaxIncluded: !ht } }) } } : {}),
      }} />
      <div className="pt-[122px] sm:pt-[104px]"><Gallery images={l.photos} title={`${l.title}, ${l.commune}`} /></div>

      <Container className="grid gap-12 pb-20 pt-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-20 lg:pb-28">
        <div className="min-w-0">
          <Crumbs items={[parent, { name: `${l.type} à ${l.commune}`, path: `/biens/${l.slug}` }]} />
          <p className="rise mt-7 text-[15px] text-muted">{l.type} {isSale ? "à vendre" : "à louer"} · {l.commune}{l.postalCode ? ` (${l.postalCode})` : ""}{l.ref ? ` · Réf. ${l.ref}` : ""}</p>
          <h1 className="mt-3 text-[2.2rem] leading-[1] text-night sm:text-[3.6rem]"><HeroWords text={l.title} /></h1>
          {big.length > 0 && (
            <dl className="rise mt-9 flex flex-wrap gap-x-12 gap-y-5 border-y border-night/20 py-6" style={{ animationDelay: "200ms" }}>
              {big.map(([k, v, u]) => <div key={k}><dd className="text-[3rem] leading-none text-night [font-family:var(--font-display)] sm:text-[3.6rem]">{v}{u && <span className="text-[1.4rem]"> {u}</span>}</dd><dt className="mt-1.5 text-[14.5px] text-muted">{k}</dt></div>)}
            </dl>
          )}
          <Reveal className="mt-12">
            <h2 className={h2}>Le bien</h2>
            <div className="mt-5 max-w-3xl whitespace-pre-line text-[18px] leading-[1.7] text-muted">{l.description}</div>
            {l.features.length > 0 && <ul className="mt-7 flex flex-wrap gap-2">{l.features.map((f) => <li key={f} className="rounded-full border border-night/20 px-4 py-2 text-[14.5px] text-night">{f}</li>)}</ul>}
          </Reveal>
          {groups.home.length > 0 && <Reveal className="mt-14"><h2 className={h2}>Caractéristiques</h2><div className="mt-5"><Facts rows={groups.home} /></div></Reveal>}
          {groups.money.length > 0 && <Reveal className="mt-14"><h2 className={h2}>{isSale ? "Prix et charges" : "Loyer et frais"}</h2><div className="mt-5"><Facts rows={groups.money} /></div><p className="mt-4 text-[15px] leading-relaxed text-muted"><Link href="/honoraires" className="line-on">Consulter le barème des honoraires</Link></p></Reveal>}
          {groups.building.length > 0 && <Reveal className="mt-14"><h2 className={h2}>Copropriété</h2><div className="mt-5"><Facts rows={groups.building} /></div></Reveal>}
          {(l.dpe || l.ges) && (
            <Reveal className="mt-14">
              <h2 className={h2}>Performance énergétique</h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                {l.dpe && <div className=" bg-white p-3"><Image src={l.dpe} alt={`Diagnostic de performance énergétique (DPE) du bien, réf. ${l.ref ?? l.id}`} width={500} height={420} className="mx-auto h-auto w-full max-w-sm" unoptimized /></div>}
                {l.ges && <div className=" bg-white p-3"><Image src={l.ges} alt={`Émissions de gaz à effet de serre (GES) du bien, réf. ${l.ref ?? l.id}`} width={500} height={420} className="mx-auto h-auto w-full max-w-sm" unoptimized /></div>}
              </div>
              {l.energy && <p className="mt-4 text-[15px] leading-relaxed text-muted">{l.energy}</p>}
            </Reveal>
          )}
          <Reveal className="mt-14">
            <h2 className={h2}>Localisation</h2>
            <p className="mb-5 mt-3 text-[17px] leading-relaxed text-muted">{l.commune}{l.postalCode ? ` (${l.postalCode})` : ""}{l.facts["Quartier"] ? `, ${l.facts["Quartier"].toLowerCase()}` : ""}. L’adresse exacte est communiquée par l’agence.</p>
            <MapFrame query={`${l.commune}, ${l.postalCode ?? ""}, France`} title={`Carte : ${l.commune}`} image={sector?.image ?? "/media/massif-esterel.webp"} />
          </Reveal>
          <Reveal className="mt-14">
            <h2 className={h2}>Pour aller plus loin</h2>
            <ul className="mt-5 border-t border-night/20">{further.map((f) => <li key={f.href} className="border-b border-night/20"><Link href={f.href} className="group flex items-center justify-between gap-5 py-4 text-[17.5px] text-night transition-colors duration-300 hover:text-sea">{f.label}<span aria-hidden className="text-sea transition-transform duration-500 group-hover:translate-x-1">→</span></Link></li>)}</ul>
          </Reveal>
        </div>
        <aside aria-label="Prix et contact" className="lg:sticky lg:top-28 lg:self-start">
          <div className=" bg-white p-6 shadow-[0_30px_70px_-50px_rgba(0,0,0,.5)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <p className="text-[2.4rem] leading-none tracking-[-0.03em] text-sea [font-family:var(--font-display)]">{label}</p>
              <Heart id={l.id} title={l.title} className="-mt-1 shrink-0 border border-rule" />
            </div>
            {perM2 != null && <p className="mt-2 text-[15px] text-muted">{`${euro(perM2)} / m²`}{l.surface ? ` · ${surfaceLabel(l.surface)}` : ""}</p>}
            <ContactActions />
          </div>
        </aside>
      </Container>

      <section id="demande" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
          <Title eyebrow="Votre demande" title="Ce bien vous intéresse ?" />
          <Reveal delay={0.1}><ListingForm title={l.title} reference={l.ref} commune={l.commune} /></Reveal>
        </Container>
      </section>

      {similar.length > 0 && (
        <section className="py-20 sm:py-28">
          <Container>
            <Title eyebrow="À voir aussi" title="Biens similaires" />
            <ul className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s, i) => <li key={s.id} className="scale-in"><Reveal delay={i * 0.1}><PropertyCard property={s} /></Reveal></li>)}
            </ul>
          </Container>
        </section>
      )}
      <ActionBar price={label} />
    </>
  );
}
