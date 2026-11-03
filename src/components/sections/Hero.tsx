import { quoteHref } from "@/config/site";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Glow } from "@/components/ui/Section";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-36 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-20 lg:pt-28">
      {/* Atmosphère */}
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <Glow className="-left-48 top-10 -z-10 h-[620px] w-[620px]" tone="deep" />
      <Glow className="-right-40 top-1/4 -z-10 h-[760px] w-[760px]" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink to-transparent"
      />

      <Container className="relative w-full">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-4 xl:gap-8">
          <div>
            <Reveal immediate delay={0.1} y={14}>
              <p className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] py-2 pl-3 pr-3.5 text-[9.5px] font-semibold uppercase tracking-[0.13em] sm:gap-3 sm:pr-4 sm:tracking-[0.2em] text-mist backdrop-blur sm:text-[11px]">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-sky" />
                  <span className="relative size-2 rounded-full bg-sky" />
                </span>
                Agence digitale <span className="text-sky">•</span> Design <span className="text-sky">•</span> Performance
              </p>
            </Reveal>

            <AnimatedHeading
              as="h1"
              immediate
              delay={0.25}
              text="Votre présence *digitale* mérite une *nouvelle dimension.*"
              className="mt-8 font-display text-[clamp(2.4rem,4.5vw,4.15rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white"
            />

            <Reveal immediate delay={0.85}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
                Nous concevons des expériences web modernes et optimisons votre visibilité pour aider votre entreprise à
                se développer durablement.
              </p>
            </Reveal>

            <Reveal immediate delay={1}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/services" size="lg" arrow>
                  Découvrir nos services
                </Button>
                <Button href={quoteHref} size="lg" variant="secondary">
                  Parlons de votre projet
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal immediate delay={0.2} y={0} className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
            <HeroVisual />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
