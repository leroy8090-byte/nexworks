import { Count } from "@/components/Count";
import { ListingStrip } from "@/components/ListingStrip";
import { ImageReveal, Reveal } from "@/components/Motion";
import { Photo as Image } from "@/components/Photo";
import { PropertyCard } from "@/components/PropertyCard";
import { GiantMarquee, PhotoColumns, ScrollText } from "@/components/ScrollFx";
import { ArticleCards } from "@/components/Sections";
import { Search } from "@/components/Search";
import { Sectors } from "@/components/Sectors";
import { ServiceRows } from "@/components/ServiceRows";
import { Btn, Container, eyebrowCls, HeroWords, JsonLd, Title } from "@/components/ui";
import { agency, proofs, sectors, services } from "@/data/agency";
import { articles } from "@/data/articles";
import { sectorMatches, TYPES } from "@/lib/filter";
import { pageMeta, webPageLd } from "@/lib/seo";
import { coverOf, getCards } from "@/lib/listings";

const DESC = "Achat, vente, location, gestion locative et syndic de copropriété : l’agence CAPITAL IMMOBILIER vous accompagne à Saint-Raphaël, à Fréjus et dans leurs environs.";
export const metadata = pageMeta({ title: `Agence immobilière à Saint-Raphaël | ${agency.name}`, absolute: true, description: DESC, path: "/", image: "/media/massif-esterel.webp" });

const SELECTION = ["832", "810", "697", "852"];

export default function Home() {
  const cards = getCards();
  const picks = SELECTION.map((id) => cards.find((c) => c.id === id)).filter((c) => c !== undefined);
  const [first, ...others] = picks;
  const communes = [...new Set(cards.map((c) => c.commune))].sort((a, b) => a.localeCompare(b, "fr"));
  const sectorItems = sectors.map((s) => ({ slug: s.slug, name: s.name, image: s.image, alt: s.alt, text: s.text, count: cards.filter((c) => sectorMatches(c, s.match)).length }));
  const serviceItems = services.filter((s) => s.href !== "/location-vacances").map((s) => ({ ...s, image: s.image.startsWith("listing:") ? coverOf(s.image.slice(8)) ?? "/media/massif-esterel.webp" : s.image }));
  return (
    <>
      <JsonLd data={webPageLd({ name: `Agence immobilière à Saint-Raphaël | ${agency.name}`, path: "/", description: DESC })} />

      {/* Ouverture : la photo reste en place, le site glisse par-dessus. La page défile normalement. */}
      <section className="sticky top-0 isolate flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-night pb-32 pt-36 text-white sm:[padding-bottom:clamp(4rem,17svh,13rem)] sm:[padding-top:clamp(6.5rem,16svh,9rem)]">
        <div className="hero-away absolute inset-0 -z-20"><div className="settle absolute inset-0"><Image src="/media/massif-esterel.webp" alt="Le massif de l’Estérel, ses sommets rouges et les villas de Saint-Raphaël face à la mer" fill preload quality={85} sizes="(max-width: 640px) 120vw, 100vw" className="object-cover" /></div></div>
        <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-night/65 via-night/40 to-night/85" />
        <Container className="hero-fade">
          <p className={`rise ${eyebrowCls} text-white`}>CAPITAL IMMOBILIER — AGENCE IMMOBILIÈRE À SAINT-RAPHAËL</p>
          <h1 className="mt-4 max-w-6xl text-[3.1rem] leading-[0.95] sm:[font-size:min(5.6rem,11.5svh)] xl:[font-size:min(7.2rem,13svh)]"><HeroWords text="Votre prochain chapitre commence ici." start={120} /></h1>
          <p className="rise mt-5 max-w-2xl text-[17.5px] leading-[1.5] text-white/90 sm:text-[19px]" style={{ animationDelay: "260ms" }}>Achat, vente, location et gestion immobilière : une expertise locale pour concrétiser tous vos projets immobiliers sur la Côte d’Azur.</p>
          <div className="rise mt-7 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "360ms" }}>
            <Btn href="/biens" arrow>Découvrir nos biens</Btn>
            <Btn href="/contact" variant="ghost">Confier mon projet</Btn>
          </div>
        </Container>
      </section>

      <div className="relative z-10">
        <Container className="-mt-24 sm:[margin-top:calc(3rem-clamp(4rem,17svh,13rem))]"><div className="rise pb-10 sm:pb-16" style={{ animationDelay: "440ms" }}><Search cards={cards} communes={communes} types={TYPES} /></div></Container>

        <div className="bg-white">
          <GiantMarquee />

          {/* Sélection */}
          <section className="pb-24 pt-8 sm:pb-36">
            <Container>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <Title eyebrow="Sélection" title="Des biens qui méritent votre attention." text="Passez la souris sur une photo pour parcourir le bien, sans quitter la page." />
                <Reveal><Btn href="/biens" variant="line" arrow>{`Voir les ${cards.length} annonces`}</Btn></Reveal>
              </div>
              {first && (
                <div className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-12">
                  <div className="scale-in lg:col-span-8"><ImageReveal><PropertyCard property={first} priority large frame="aspect-[4/3] lg:aspect-[16/10]" sizes="(min-width:1024px) 62vw, 85vw" /></ImageReveal></div>
                  <div className="scale-in lg:col-span-4 lg:mt-32"><ImageReveal delay={0.12}><PropertyCard property={others[0]} priority /></ImageReveal></div>
                  <div className="scale-in lg:col-span-5 lg:col-start-2"><ImageReveal delay={0.05}><PropertyCard property={others[1]} /></ImageReveal></div>
                  <div className="scale-in lg:col-span-5 lg:mt-24"><ImageReveal delay={0.15}><PropertyCard property={others[2]} /></ImageReveal></div>
                </div>
              )}
            </Container>
          </section>

          <div className="bg-night"><ListingStrip cards={cards} /></div>

          {/* L'agence */}
          <section className="py-24 sm:py-36">
            <Container>
              <Title eyebrow="L’agence" title="Bien plus qu’une agence immobilière." />
              <p className="mt-10 max-w-6xl text-[2rem] font-semibold leading-[1.14] tracking-[-0.02em] [font-family:var(--font-display)] sm:text-[3.5rem]"><ScrollText text="Au cœur de Saint-Raphaël, l’agence vend et loue appartements, studios et maisons. Elle a choisi de se spécialiser dans les petites et moyennes copropriétés, les ASL et ASA, et le démarrage des copropriétés neuves." /></p>
              <div className="mt-16 grid items-end gap-12 lg:grid-cols-12">
                <div className="relative pb-14 pr-14 sm:pb-20 sm:pr-24 lg:col-span-7">
                  <ImageReveal className="relative aspect-[5/4] overflow-hidden bg-sand"><div className="depth"><Image src="/media/basilique.webp" alt="Le dôme de la basilique Notre-Dame-de-la-Victoire, à Saint-Raphaël" fill sizes="(min-width:1024px) 50vw, 90vw" className="object-cover" /></div></ImageReveal>
                  <div className="float absolute bottom-0 right-0 w-[52%]"><ImageReveal delay={0.2} className="relative aspect-[4/3] overflow-hidden border-[6px] border-white bg-sand sm:border-[10px]"><Image src="/media/vieux-port.webp" alt="Le Vieux-Port de Saint-Raphaël, ses bateaux et ses façades" fill sizes="(min-width:1024px) 26vw, 50vw" className="object-cover" /></ImageReveal></div>
                </div>
                <div className="lg:col-span-5">
                  <dl className="grid grid-cols-3 gap-4 border-t-2 border-night pt-5">
                    {[["À vendre", cards.filter((c) => c.transaction === "vente").length], ["À louer", cards.filter((c) => c.transaction === "location").length], ["Secteurs", sectors.length]].map(([k, v]) => (
                      <div key={k as string}><dd className="text-[3.4rem] font-bold leading-none tracking-[-0.04em] text-sea [font-family:var(--font-display)] sm:text-[5rem]"><Count value={v as number} /></dd><dt className="mt-1.5 text-[15px] text-muted">{k}</dt></div>
                    ))}
                  </dl>
                  <Reveal className="mt-8 space-y-4 text-[17.5px] leading-[1.65] text-muted"><p>L’agence met aussi son expertise au service de la location-gérance et de la transaction, avec un même objectif : la proximité, et un interlocuteur à votre écoute.</p></Reveal>
                  <Reveal delay={0.1} className="mt-7"><Btn href="/agence" variant="line" arrow>Découvrir l’agence</Btn></Reveal>
                </div>
              </div>
            </Container>
          </section>

          <PhotoColumns title="Entre roches rouges et Méditerranée." />

          {/* Services */}
          <section className="bg-night py-24 text-white sm:py-36">
            <Container>
              <Title light eyebrow="Nos services" title="Cinq métiers, un seul interlocuteur local." />
              <div className="mt-12"><ServiceRows items={serviceItems} /></div>
            </Container>
          </section>

          {/* Estimation : la grande bande rouge */}
          <section className="relative overflow-hidden bg-sea py-20 text-white sm:py-32">
            <Container className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className={`${eyebrowCls} eb-white`}>Vendre</p>
                <h2 className="mt-4 text-[2.8rem] leading-[0.96] sm:text-[5.2rem]">Vous envisagez de vendre votre bien ?</h2>
                <p className="mt-5 max-w-xl text-[19px] leading-[1.5]">Chaque projet immobilier commence par une bonne estimation.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Btn href="/estimation" variant="black" arrow>Estimer mon bien</Btn>
                  <Btn href="/vendre" variant="ghost">Vendre avec l’agence</Btn>
                </div>
              </div>
              <div className="open-up relative aspect-[4/3] overflow-hidden lg:col-span-5"><div className="depth"><Image src="/media/port-soir.webp" alt="Le port de Saint-Raphaël et sa basilique, le soir" fill quality={85} sizes="(min-width:1024px) 42vw, 100vw" className="object-cover" /></div></div>
            </Container>
          </section>

          {/* Ancrage local */}
          <section className="py-24 sm:py-36">
            <Container>
              <Title eyebrow="Nos secteurs" title="Vivre et investir sur la Côte d’Azur." text="Du centre de Saint-Raphaël aux roches rouges de l’Estérel, chaque secteur a son caractère." />
              <div className="mt-12"><Sectors items={sectorItems} /></div>
            </Container>
          </section>

          {/* Conseils */}
          <section className="border-t border-rule py-24 sm:py-36">
            <Container>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <Title eyebrow="Conseils" title="Des réponses claires avant de vous lancer." />
                <Reveal className="flex flex-wrap gap-3"><Btn href="/conseils" variant="line" arrow>Tous les conseils</Btn><Btn href="/questions" variant="line">Questions fréquentes</Btn></Reveal>
              </div>
              <div className="mt-14"><ArticleCards items={articles.slice(0, 3)} /></div>
            </Container>
          </section>

          {/* Réassurance */}
          <section className="bg-night py-24 text-white sm:py-36">
            <Container>
              <Title light eyebrow="Les engagements de l’agence" title="Parlons de votre projet." text="Une agence de proximité, des engagements concrets et un seul numéro à appeler." />
              <ul className="mt-12 grid gap-x-10 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
                {proofs.map((p, i) => (
                  <li key={p.t}><Reveal delay={(i % 3) * 0.08} className="border-t border-white/25 py-6 transition-colors duration-500 hover:border-sea"><p className="text-[1.5rem] leading-tight [font-family:var(--font-display)]">{p.t}</p><p className="mt-2 text-[16px] leading-relaxed text-white/70">{p.d}</p></Reveal></li>
                ))}
              </ul>
              <Reveal className="mt-10 flex flex-col flex-wrap gap-3 sm:flex-row">
                <Btn href="/contact" arrow>Parlons de votre projet</Btn>
                <Btn href="/biens" variant="ghost">Découvrir nos annonces</Btn>
                <Btn href={`tel:${agency.phoneHref}`} variant="ghost">Contacter l’agence</Btn>
              </Reveal>
            </Container>
          </section>
        </div>
      </div>
    </>
  );
}
