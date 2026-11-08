import type { Metadata } from "next";
import Link from "next/link";
import { Featured } from "@/components/Featured";
import { IntroGate } from "@/components/IntroGate";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Motion";
import { Photo } from "@/components/Photo";
import { SearchBar } from "@/components/SearchBar";
import { Btn, Container, CtaBand, Icon, Picture, Title } from "@/components/ui";
import { agencyFor, destinationsFor, num, priceText, propertiesFor, propertyFor } from "@/data/localized";
import { asLang, localePath, type Lang } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const C = {
  fr: {
    title: "Immobilier de prestige à Saint-Tropez",
    description: "Villas avec vue mer, bastides et maisons de village à Saint-Tropez, Ramatuelle, Gassin, Sainte-Maxime et Saint-Raphaël. Vente, location saisonnière et estimation offerte, en toute discrétion.",
    skip: "Passer l'introduction",
    kicker: "Golfe de Saint-Tropez", h1: "Les plus belles maisons du golfe, en toute discrétion.",
    lead: "Villas face à la mer, bastides au milieu des vignes, maisons de village à Saint-Tropez, Sainte-Maxime et Saint-Raphaël. À vendre, ou pour l'été.",
    see: (n: number) => `Voir les ${n} propriétés`, value: "Estimer ma propriété",
    promises: [["Estimation offerte", "Après visite, sans engagement"], ["Visites privées", "Sur rendez-vous, à vos dates"], ["Vente confidentielle", "Votre bien n'est jamais publié"], ["Jusqu'à l'acte", "Un seul interlocuteur"]],
    propsKicker: "Propriétés", propsTitle: "Une sélection, choisie une à une.", allProps: "Toutes les propriétés",
    signature: "Propriété signature", ref: "Réf.", surface: "Surface", suites: "Suites", land: "Terrain", discover: "Découvrir la villa", visit: "Demander une visite",
    sellKicker: "Vous vendez ?", sellTitle: "Votre maison mérite d'être présentée comme elle se vit.",
    sellText: "Une estimation argumentée après visite, une présentation soignée, une diffusion choisie ou confidentielle, des visites réservées aux acquéreurs qualifiés.",
    sellSteps: ["Nous visitons votre propriété", "Vous recevez un avis de valeur argumenté", "Vous choisissez une vente publique ou confidentielle"],
    estimate: "Demander une estimation", estimateText: "Gratuite et sans engagement. Votre adresse reste confidentielle.", callMe: "Être rappelé", estimatePh: "Quelques mots sur votre propriété (facultatif)",
    type: "Type de bien", types: ["Villa", "Bastide", "Maison de village", "Appartement", "Domaine", "Terrain"], town: "Commune", other: "Autre commune du Var", detailed: "Estimation détaillée en cinq étapes",
    gulfKicker: "Le golfe", gulfTitle: "Trois rivages, trois façons de vivre la mer.", allDest: "Toutes les destinations", one: "propriété", many: "propriétés",
    privKicker: "Collection privée", privTitle: "Certaines maisons ne sont jamais publiées.", privText: "À la demande de leurs propriétaires, ces biens sont présentés uniquement en rendez-vous, aux acquéreurs que nous avons rencontrés.", access: "Demander un accès",
    privAlt: "Grande baie vitrée ouverte sur la mer au crépuscule",
    alertKicker: "Alerte nouveautés", alertTitle: "Soyez prévenu avant tout le monde.", alertText: "Indiquez ce que vous cherchez : vous recevez les nouvelles propriétés qui y correspondent, avant leur publication.", alertBtn: "Créer mon alerte",
    zone: "Destination", zones: ["Saint-Tropez et la presqu'île", "Sainte-Maxime", "Saint-Raphaël", "Tout le golfe"], budget: "Budget", budgets: ["De 2 à 5 M€", "De 5 à 10 M€", "Plus de 10 M€", "Location saisonnière"],
  },
  en: {
    title: "Luxury real estate in Saint-Tropez",
    description: "Sea-view villas, bastides and village houses in Saint-Tropez, Ramatuelle, Gassin, Sainte-Maxime and Saint-Raphaël. Sales, seasonal rentals and complimentary valuations, in complete discretion.",
    skip: "Skip intro",
    kicker: "Gulf of Saint-Tropez", h1: "The finest homes on the gulf, in complete discretion.",
    lead: "Villas facing the sea, bastides among the vineyards, village houses in Saint-Tropez, Sainte-Maxime and Saint-Raphaël. For sale, or for the summer.",
    see: (n: number) => `View all ${n} properties`, value: "Value my property",
    promises: [["Complimentary valuation", "After a visit, with no obligation"], ["Private viewings", "By appointment, on your dates"], ["Confidential sale", "Your property is never listed"], ["Through to completion", "A single point of contact"]],
    propsKicker: "Properties", propsTitle: "A selection, chosen one by one.", allProps: "All properties",
    signature: "Signature property", ref: "Ref.", surface: "Living area", suites: "Suites", land: "Plot", discover: "Discover the villa", visit: "Request a viewing",
    sellKicker: "Selling?", sellTitle: "Your home deserves to be presented the way it is lived in.",
    sellText: "A reasoned valuation after a visit, a careful presentation, selective or confidential marketing, viewings reserved for qualified buyers.",
    sellSteps: ["We visit your property", "You receive a reasoned valuation", "You choose a public or confidential sale"],
    estimate: "Request a valuation", estimateText: "Free and with no obligation. Your address remains confidential.", callMe: "Call me back", estimatePh: "A few words about your property (optional)",
    type: "Property type", types: ["Villa", "Bastide", "Village house", "Apartment", "Estate", "Land"], town: "Town", other: "Another town in the Var", detailed: "Detailed valuation in five steps",
    gulfKicker: "The gulf", gulfTitle: "Three shores, three ways of living by the sea.", allDest: "All destinations", one: "property", many: "properties",
    privKicker: "Private collection", privTitle: "Some homes are never listed.", privText: "At their owners' request, these properties are presented by appointment only, to buyers we have met.", access: "Request access",
    privAlt: "Large bay window opening onto the sea at dusk",
    alertKicker: "New listings alert", alertTitle: "Be the first to know.", alertText: "Tell us what you are looking for: you will receive matching new properties before they are published.", alertBtn: "Create my alert",
    zone: "Destination", zones: ["Saint-Tropez and the peninsula", "Sainte-Maxime", "Saint-Raphaël", "The whole gulf"], budget: "Budget", budgets: ["€2M to €5M", "€5M to €10M", "Over €10M", "Seasonal rental"],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return pageMeta({ lang, title: `${agencyFor(lang).name} | ${C[lang].title}`, absolute: true, path: "/", image: "/photos/villa-moderne.webp", description: C[lang].description });
}

export default async function Home({ params }: Props) {
  const lang: Lang = asLang((await params).lang);
  const c = C[lang];
  const L = (p: string) => localePath(lang, p);
  const properties = propertiesFor(lang);
  const signature = propertyFor("villa-horizon-saint-tropez", lang)!;
  const PLACES = ["Saint-Tropez", "Ramatuelle", "Gassin", "Grimaud", "Sainte-Maxime", "Saint-Raphaël"];
  const icons = ["pen", "key", "lock", "check"] as const;
  return (
    <>
      <IntroGate skipLabel={c.skip} />
      {/* Ouverture : le message, la recherche et une vraie propriété, dès le premier écran */}
      <section className="bg-white pt-36 sm:pt-44">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-6 lg:pb-10">
            <p className="rise kicker">{c.kicker}</p>
            <h1 className="rise mt-7 text-[3.1rem] text-ink sm:text-[5.2rem] xl:text-[6rem]" style={{ animationDelay: "100ms" }}>{c.h1}</h1>
            <p className="rise mt-7 max-w-lg text-[17px] leading-[1.8] text-muted" style={{ animationDelay: "200ms" }}>{c.lead}</p>
            <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "300ms" }}>
              <Btn lang={lang} href="/proprietes" arrow>{c.see(properties.length)}</Btn>
              <Btn lang={lang} href="/vendre#estimation" variant="outline">{c.value}</Btn>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Link href={L(`/proprietes/${signature.slug}`)} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-paper sm:aspect-[5/4] lg:aspect-[4/5]">
                <Photo src={signature.images[0].src} alt={signature.images[0].alt} fill preload sizes="(min-width:1024px) 45vw, 100vw" className="settle object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02]" />
              </div>
              <div className="rise mt-4 flex items-baseline justify-between gap-4 text-[13px]" style={{ animationDelay: "500ms" }}>
                <span className="caps text-[10px] text-pave-dark">{signature.name} · {signature.city}</span>
                <span className="tabular text-ink"><span className="line">{priceText(signature, lang)}</span></span>
              </div>
            </Link>
          </div>
        </Container>
        <Container className="rise mt-14 sm:mt-20"><SearchBar lang={lang} /></Container>
        {/* Ce que l'agence garantit, sans chiffre inventé */}
        <Container className="mt-14 sm:mt-16">
          <ul className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
            {c.promises.map(([title, text], i) => (
              <li key={title} className={`flex items-start gap-4 border-line py-7 pr-4 ${["", "border-l pl-5 sm:pl-8", "border-t lg:border-t-0 lg:border-l lg:pl-8", "border-t border-l pl-5 sm:pl-8 lg:border-t-0"][i]}`}>
                <Icon name={icons[i]} className="mt-0.5 size-5 shrink-0 text-gold" />
                <div><p className="text-[15px] text-ink">{title}</p><p className="mt-1 text-[13px] text-muted">{text}</p></div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Les propriétés */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Title kicker={c.propsKicker} title={c.propsTitle} />
            <Reveal><Link href={L("/proprietes")} className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] text-ink uppercase"><span className="line">{c.allProps}</span><Icon name="arrow" className="size-4" /></Link></Reveal>
          </div>
          <Featured lang={lang} />
        </Container>
      </section>

      {/* La propriété signature, présentée comme dans un magazine */}
      <section className="bg-paper py-24 sm:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Picture src={signature.images[2].src} alt={signature.images[2].alt} className="aspect-[4/3] lg:col-span-7" sizes="(min-width:1024px) 55vw, 100vw" />
          <Reveal className="lg:col-span-5">
            <p className="kicker">{c.signature}</p>
            <h2 className="mt-6 text-[2.8rem] text-ink sm:text-[4rem]">{signature.name}</h2>
            <p className="caps mt-3 text-[10px] text-pave-dark">{signature.city} · {signature.sector} · {c.ref} {signature.ref}</p>
            <p className="mt-6 text-[16.5px] leading-[1.8] text-muted">{signature.description[0]}</p>
            <dl className="mt-8 grid grid-cols-3 border-y border-line py-6">
              {[[c.surface, `${signature.surface} m²`], [c.suites, String(signature.bedrooms)], [c.land, `${num(signature.land ?? 0, lang)} m²`]].map(([k, v], i) => (
                <div key={k} className={i ? "border-l border-line pl-5" : ""}><dt className="caps text-[9.5px] text-pave-dark">{k}</dt><dd className="serif mt-2 text-[1.8rem] text-ink">{v}</dd></div>
              ))}
            </dl>
            <p className="tabular mt-6 text-[17px] text-ink">{priceText(signature, lang)}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Btn lang={lang} href={`/proprietes/${signature.slug}`} arrow>{c.discover}</Btn><Btn lang={lang} href={`/proprietes/${signature.slug}#visite`} variant="outline">{c.visit}</Btn></div>
          </Reveal>
        </Container>
      </section>

      {/* Vendre : la demande d'estimation, au cœur du métier de l'agence */}
      <section className="bg-white py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Title kicker={c.sellKicker} title={c.sellTitle} text={c.sellText} />
            <Reveal delay={0.1}>
              <ol className="mt-10 space-y-5">
                {c.sellSteps.map((s, i) => (
                  <li key={s} className="flex items-baseline gap-5 border-b border-line pb-5"><span className="serif text-[1.6rem] text-gold">0{i + 1}</span><span className="text-[15.5px] text-ink">{s}</span></li>
                ))}
              </ol>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="border border-line p-7 sm:p-12 lg:col-span-7">
            <p className="serif text-[2rem] leading-tight text-ink">{c.estimate}</p>
            <p className="mt-2 mb-9 text-[14.5px] text-muted">{c.estimateText}</p>
            <LeadForm lang={lang} kind="Demande d'estimation" submit={c.callMe} messagePlaceholder={c.estimatePh}
              choices={[{ name: "type", label: c.type, options: c.types }, { name: "commune", label: c.town, options: [...PLACES, c.other] }]} />
            <Link href={L("/vendre#estimation")} className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-ink uppercase"><span className="line">{c.detailed}</span><Icon name="arrow" className="size-4" /></Link>
          </Reveal>
        </Container>
      </section>

      {/* Destinations */}
      <section className="bg-white pb-24 sm:pb-32">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-24 sm:pt-32">
            <Title kicker={c.gulfKicker} title={c.gulfTitle} />
            <Reveal><Link href={L("/destinations")} className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] text-ink uppercase"><span className="line">{c.allDest}</span><Icon name="arrow" className="size-4" /></Link></Reveal>
          </div>
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {destinationsFor(lang).map((d, i) => {
              const n = properties.filter((p) => p.destination === d.slug).length;
              return (
                <li key={d.slug}>
                  <Reveal delay={i * 0.08}>
                    <Link href={L(`/destinations/${d.slug}`)} className="group block">
                      <div className="relative aspect-[4/5] overflow-hidden bg-paper"><Photo src={d.image} alt={d.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]" /></div>
                      <p className="caps mt-5 text-[10px] text-pave-dark">{d.kicker} · {n} {n > 1 ? c.many : c.one}</p>
                      <h3 className="mt-2 text-[2rem] text-ink"><span className="line">{d.name}</span></h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{d.communes.join(" · ")}</p>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Collection privée */}
      <section className="bg-paper py-24 sm:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="kicker">{c.privKicker}</p>
            <h2 className="mt-6 text-[2.6rem] text-ink sm:text-[3.8rem]">{c.privTitle}</h2>
            <p className="mt-6 text-[16.5px] leading-[1.8] text-muted">{c.privText}</p>
            <div className="mt-10"><Btn lang={lang} href="/collection-privee" arrow>{c.access}</Btn></div>
          </Reveal>
          <Picture src="/photos/fenetre-mer.webp" alt={c.privAlt} className="aspect-[4/3] lg:col-span-7" sizes="(min-width:1024px) 55vw, 100vw" />
        </Container>
      </section>

      {/* Alerte : être prévenu des nouveaux biens */}
      <section className="bg-white py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5"><Title kicker={c.alertKicker} title={c.alertTitle} text={c.alertText} /></div>
          <Reveal delay={0.1} className="lg:col-span-7 lg:pt-10">
            <LeadForm lang={lang} minimal kind="Alerte nouveautés" submit={c.alertBtn}
              choices={[{ name: "zone", label: c.zone, options: c.zones }, { name: "budget", label: c.budget, options: c.budgets }]} />
          </Reveal>
        </Container>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
