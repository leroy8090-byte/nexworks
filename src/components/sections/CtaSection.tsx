import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";

export function CtaSection({
  title = "Votre prochain projet commence ici.",
  text = "Parlons de vos objectifs et construisons ensemble une présence digitale à la hauteur de votre ambition.",
  cta = "Démarrer mon projet",
}: {
  title?: string;
  text?: string;
  cta?: string;
}) {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] px-6 py-16 text-center text-ink sm:px-12 sm:py-24">
            {/* Fond bleu ciel légèrement dégradé */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(120% 140% at 15% 0%, #9bdcfb 0%, #55bdf2 45%, #36a9e8 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-40 mix-blend-overlay"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.5) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
                maskImage: "radial-gradient(ellipse at center, #000 20%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, #000 20%, transparent 75%)",
              }}
            />
            {/* Filigrane : symbole N (masque sur le fichier logo) */}
            <div
              aria-hidden
              className="absolute -right-10 -top-10 -z-10 h-[420px] w-[380px] bg-ink opacity-[0.07]"
              style={{
                WebkitMaskImage: "url(/brand/nexworks-symbol.png)",
                maskImage: "url(/brand/nexworks-symbol.png)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
            <AnimatedHeading
              as="h2"
              text={title}
              className="mx-auto max-w-3xl font-display text-[clamp(2.1rem,5vw,3.8rem)] font-semibold leading-[1.06] tracking-tight"
            />
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">{text}</p>
            <div className="mt-10 flex justify-center">
              <Button href="/contact#formulaire" variant="dark" size="lg" arrow>
                {cta}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
