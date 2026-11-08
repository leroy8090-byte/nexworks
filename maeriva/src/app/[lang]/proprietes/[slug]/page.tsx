import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Motion";
import { PropertyActions } from "@/components/PropertyActions";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyGallery } from "@/components/PropertyGallery";
import { SaveButton } from "@/components/Selection";
import { StickyVisit } from "@/components/StickyVisit";
import { Container, Crumbs, CtaBand, Icon, JsonLd, Title } from "@/components/ui";
import { destinationFor, num, priceText, propertiesFor, propertyFor, typeLabel } from "@/data/localized";
import { properties } from "@/data/properties";
import { asLang, localePath, type Lang } from "@/i18n/config";
import { listingLd, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => properties.map((p) => ({ slug: p.slug }));

const C = {
  fr: {
    props: "Propriétés", rent: "Location saisonnière", visit: "Visiter", render: "Perspective d'architecte non contractuelle : le programme est en cours de conception.",
    facts: { surface: "Surface", land: "Terrain", beds: "Chambres", baths: "Salles de bains", sea: "Vue mer", seaL: "Panorama", pool: "Piscine", poolL: "Extérieur" },
    ref: "Réf.", features: "Prestations", info: "Informations",
    rows: { ref: "Référence", type: "Type", town: "Commune", surface: "Surface habitable", land: "Terrain", beds: "Chambres", baths: "Salles de bains", sea: "Vue mer", pool: "Piscine", yes: "Oui", no: "Non" },
    dpe: "Diagnostic énergétique (DPE)", ges: "Émissions de gaz à effet de serre", energyClass: "classe", none: "Non communiqué",
    where: "Situation", discretion: "Par discrétion, l'adresse exacte est communiquée lors de la prise de rendez-vous.", discover: "Découvrir",
    fiction: "Bien fictif présenté pour la démonstration. Les photographies, libres de droits, illustrent le type de propriété décrit.",
    more: "À découvrir aussi", moreTitle: "D'autres maisons du golfe.", ctaTitle: "Visiter en toute discrétion.", ctaText: "Chaque visite est organisée sur rendez-vous, à vos dates, avec toutes les informations préparées à l'avance.",
    askVisit: "Demander une visite", forRent: "en location saisonnière", forSale: "à vendre", in: "à", bedrooms: "chambres", seaview: "vue mer", withPool: "piscine",
  },
  en: {
    props: "Properties", rent: "Seasonal rental", visit: "View", render: "Non-contractual architect's rendering: the development is currently being designed.",
    facts: { surface: "Living area", land: "Plot", beds: "Bedrooms", baths: "Bathrooms", sea: "Sea view", seaL: "Panorama", pool: "Pool", poolL: "Outdoors" },
    ref: "Ref.", features: "Features", info: "Details",
    rows: { ref: "Reference", type: "Type", town: "Town", surface: "Living area", land: "Plot", beds: "Bedrooms", baths: "Bathrooms", sea: "Sea view", pool: "Pool", yes: "Yes", no: "No" },
    dpe: "Energy performance (DPE)", ges: "Greenhouse gas emissions", energyClass: "class", none: "Not provided",
    where: "Location", discretion: "For discretion, the exact address is shared when you book a viewing.", discover: "Discover",
    fiction: "Fictional property presented for demonstration purposes. The royalty-free photographs illustrate the type of property described.",
    more: "You may also like", moreTitle: "Other homes on the gulf.", ctaTitle: "View in complete discretion.", ctaText: "Every viewing is arranged by appointment, on your dates, with all the information prepared in advance.",
    askVisit: "Request a viewing", forRent: "for seasonal rental", forSale: "for sale", in: "in", bedrooms: "bedrooms", seaview: "sea view", withPool: "pool",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const lang = asLang(l);
  const p = propertyFor(slug, lang);
  if (!p) return {};
  const c = C[lang];
  return pageMeta({ lang, title: `${p.name}, ${typeLabel(p.type, lang).toLowerCase()} ${p.transaction === "location" ? c.forRent : c.forSale} ${c.in} ${p.city}`, path: `/proprietes/${p.slug}`, image: p.images[0].src, description: `${p.headline} ${p.surface} m², ${p.bedrooms} ${c.bedrooms}${p.seaView ? `, ${c.seaview}` : ""}${p.pool ? `, ${c.withPool}` : ""}. ${priceText(p, lang)}.` });
}

const DPE = ["A", "B", "C", "D", "E", "F", "G"];
const DPE_COLORS = ["#2f8f5b", "#58a65c", "#9cc35b", "#e8d24f", "#f0b43c", "#e8823a", "#d6453a"];

function Energy({ label, value, lang }: { label: string; value?: string; lang: Lang }) {
  return (
    <div>
      <p className="caps text-[9.5px] text-pave-dark">{label}</p>
      {value ? (
        <div className="mt-3 flex gap-1" role="img" aria-label={`${label} : ${C[lang].energyClass} ${value}`}>
          {DPE.map((l, i) => <span key={l} className={`grid h-7 place-items-center text-[11.5px] font-medium text-white ${l === value ? "w-11 outline outline-1 outline-offset-2 outline-ink" : "w-6 opacity-30"}`} style={{ background: DPE_COLORS[i] }}>{l}</span>)}
        </div>
      ) : <p className="mt-2 text-[14.5px] text-muted">{C[lang].none}</p>}
    </div>
  );
}

export default async function PropertyPage({ params }: Props) {
  const { lang: l, slug } = await params;
  const lang = asLang(l);
  const c = C[lang];
  const p = propertyFor(slug, lang);
  if (!p) notFound();
  const all = propertiesFor(lang);
  const dest = destinationFor(p.destination, lang)!;
  const similar = [...all.filter((x) => x.slug !== p.slug && x.destination === p.destination), ...all.filter((x) => x.slug !== p.slug && x.destination !== p.destination)].slice(0, 3);
  const price = priceText(p, lang);
  const facts = [
    { icon: "area" as const, v: `${p.surface} m²`, l: c.facts.surface },
    ...(p.land ? [{ icon: "land" as const, v: `${num(p.land, lang)} m²`, l: c.facts.land }] : []),
    { icon: "bed" as const, v: String(p.bedrooms), l: c.facts.beds },
    { icon: "bath" as const, v: String(p.bathrooms), l: c.facts.baths },
    ...(p.seaView ? [{ icon: "sea" as const, v: c.facts.sea, l: c.facts.seaL }] : []),
    ...(p.pool ? [{ icon: "pool" as const, v: c.facts.pool, l: c.facts.poolL }] : []),
  ];
  const r = c.rows;
  const rows: [string, string][] = [
    [r.ref, p.ref], [r.type, typeLabel(p.type, lang)], [r.town, `${p.city}, ${p.sector}`], [r.surface, `${p.surface} m²`],
    ...(p.land ? [[r.land, `${num(p.land, lang)} m²`] as [string, string]] : []),
    [r.beds, String(p.bedrooms)], [r.baths, String(p.bathrooms)], [r.sea, p.seaView ? r.yes : r.no], [r.pool, p.pool ? r.yes : r.no],
  ];
  return (
    <>
      <JsonLd data={listingLd(p, lang)} />
      {/* En-tête : le nom, le lieu, le prix, puis directement les photos */}
      <section className="bg-white pt-36 sm:pt-44">
        <Container>
          <div className="rise"><Crumbs lang={lang} items={[{ name: c.props, path: "/proprietes" }, { name: p.name, path: `/proprietes/${p.slug}` }]} /></div>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="rise kicker" style={{ animationDelay: "80ms" }}>{p.transaction === "location" ? c.rent : typeLabel(p.type, lang)} · {p.city} · {p.sector}</p>
              <h1 className="rise mt-5 text-[3rem] text-ink sm:text-[5rem]" style={{ animationDelay: "160ms" }}>{p.name}</h1>
              <p className="rise mt-3 max-w-xl text-[17px] leading-[1.7] text-muted" style={{ animationDelay: "240ms" }}>{p.headline}</p>
            </div>
            <div className="rise flex flex-col items-start gap-4 sm:items-end" style={{ animationDelay: "300ms" }}>
              <p className="serif tabular text-[2.2rem] leading-none text-ink sm:text-[2.8rem]">{price}</p>
              <div className="flex items-center gap-6 text-ink">
                <SaveButton slug={p.slug} name={p.name} label lang={lang} />
                <a href="#visite" className="inline-flex min-h-11 items-center bg-ink px-6 text-[11px] font-medium tracking-[0.22em] text-white uppercase transition-colors hover:bg-sea">{c.visit}</a>
              </div>
            </div>
          </div>
          <div className="rise mt-10" style={{ animationDelay: "380ms" }}><PropertyGallery images={p.images} name={p.name} lang={lang} /></div>
          {p.render && <p className="mt-4 text-[13px] text-pave-dark">{c.render}</p>}
          <ul className="mt-10 grid grid-cols-2 gap-x-6 border-t border-line sm:grid-cols-3 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
            {facts.map((f) => (
              <li key={f.l} className="flex items-center gap-3 border-b border-line py-5"><Icon name={f.icon} className="size-5 shrink-0 text-gold" /><div><p className="text-[15.5px] text-ink">{f.v}</p><p className="text-[10.5px] tracking-[0.18em] text-muted uppercase">{f.l}</p></div></li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Title kicker={`${c.ref} ${p.ref}`} title={p.headline} />
            <Reveal delay={0.1} className="mt-9 space-y-6 text-[16.5px] leading-[1.85] text-ink/85">{p.description.map((d) => <p key={d.slice(0, 20)}>{d}</p>)}</Reveal>

            <Reveal className="mt-16">
              <p className="kicker">{c.features}</p>
              <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {p.features.map((f) => <li key={f} className="flex items-center gap-4 border-b border-line py-4 text-[15.5px] text-ink"><Icon name="check" className="size-4 shrink-0 text-gold" />{f}</li>)}
              </ul>
            </Reveal>

            <Reveal className="mt-16">
              <p className="kicker">{c.info}</p>
              <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {rows.map(([k, v]) => <div key={k} className="flex justify-between gap-6 border-b border-line py-4 text-[15px]"><dt className="text-muted">{k}</dt><dd className="text-right text-ink">{v}</dd></div>)}
              </dl>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <Energy lang={lang} label={c.dpe} value={p.dpe} />
                <Energy lang={lang} label={c.ges} value={p.ges} />
              </div>
            </Reveal>

            <Reveal className="mt-16 border-t border-line pt-10">
              <p className="kicker">{c.where}</p>
              <p className="serif mt-5 text-[1.9rem] text-ink">{p.city}, {p.sector}</p>
              <p className="mt-3 max-w-xl text-[15.5px] leading-[1.8] text-muted">{c.discretion} {dest.living}</p>
              <Link href={localePath(lang, `/destinations/${dest.slug}`)} className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-ink uppercase"><span className="line">{c.discover} {dest.name}</span><Icon name="arrow" className="size-4" /></Link>
            </Reveal>
            <p className="mt-12 text-[12.5px] leading-relaxed text-muted">{c.fiction}</p>
          </div>
          <aside id="visite" className="scroll-mt-28 lg:col-span-5">
            <div className="under-header lg:sticky lg:top-28"><PropertyActions p={p} lang={lang} /></div>
          </aside>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-24 sm:py-32">
        <Container>
          <Title kicker={c.more} title={c.moreTitle} />
          <ul className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">{similar.map((s) => <li key={s.slug}><Reveal><PropertyCard p={s} lang={lang} /></Reveal></li>)}</ul>
        </Container>
      </section>
      <CtaBand lang={lang} title={c.ctaTitle} text={c.ctaText} />
      <StickyVisit name={p.name} price={price} cta={c.askVisit} />
    </>
  );
}
