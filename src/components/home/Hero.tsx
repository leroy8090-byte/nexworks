import { quoteHref } from "@/config/site";
import { projects } from "@/data/projects";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Glow } from "@/components/ui/Section";
import { HeroDeck, type DeckItem } from "./HeroDeck";

const DECK = ["maison-riviera", "calyra-hotel", "solea-restaurant", "azur-plomberie", "volt-fitness-club"];

export function Hero() {
  const items: DeckItem[] = DECK.flatMap((slug) => {
    const p = projects.find((x) => x.slug === slug);
    return p ? [{ slug, name: p.name, cover: p.images.cover, desktop: p.images.desktop }] : [];
  });

  return (
    <section className="relative isolate overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <Glow className="hero-drift -top-40 left-[8%] -z-10 h-[760px] w-[1100px]" />
      <Glow className="hero-drift -right-52 top-[28%] -z-10 h-[720px] w-[720px] [animation-delay:-7s]" tone="deep" />

      <Container>
        <Reveal immediate y={14}>
          <p className="mb-5 text-base font-semibold text-sky sm:text-lg">Agence web · Création de sites internet, SEO et GEO</p>
        </Reveal>
        <AnimatedHeading
          as="h1"
          immediate
          delay={0.1}
          text="Votre site doit vous amener des clients. *On s'en occupe.*"
          className="max-w-[1100px] font-display text-[clamp(2.9rem,7.1vw,6.9rem)] font-bold leading-[0.98] text-white"
        />
        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <Reveal immediate delay={0.6}>
            <p className="max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              NEXWORKS crée votre site, le rend plus facile à trouver sur Google et dans les IA, puis vous accompagne dans la durée. Vous recevez un devis clair avant de vous engager.
            </p>
          </Reveal>
          <Reveal immediate delay={0.75}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={quoteHref} size="lg" arrow>
                Demander un devis
              </Button>
              <Button href="/realisations" size="lg" variant="secondary">
                Voir des exemples
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      <div className="mt-14 sm:mt-20">
        <Container>
          <HeroDeck items={items} />
        </Container>
        <Reveal immediate delay={1.2}>
          <p className="relative z-10 mx-auto mt-6 max-w-xl px-5 text-center text-sm text-mist">
            Exemples : sites de démonstration créés par NEXWORKS pour des établissements fictifs.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
