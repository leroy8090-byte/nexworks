import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { quotePath, type Lang } from "@/i18n/lang";

const T = {
  fr: {
    title: "Parlons de votre projet.",
    text: "Vous n'avez pas besoin de tout savoir à l'avance. Dites-nous où vous en êtes, on vous dira ce qui est vraiment utile.",
    cta: "Démarrer mon projet",
    steps: ["Vous décrivez votre besoin", "On en parle ensemble", "Vous recevez un devis clair"],
  },
  en: {
    title: "Let's talk about your project.",
    text: "You don't need to know everything in advance. Tell us where you are, and we'll tell you what is genuinely useful.",
    cta: "Start my project",
    steps: ["You describe what you need", "We talk it through together", "You receive a clear quote"],
  },
};

export function CtaSection({ lang = "fr", title, text, cta }: { lang?: Lang; title?: string; text?: string; cta?: string }) {
  const t = T[lang];
  title ??= t.title;
  text ??= t.text;
  cta ??= t.cta;
  return (
    <section className="relative isolate z-10 -mt-10 overflow-hidden rounded-t-[2rem] bg-sky py-20 text-ink sm:-mt-14 sm:rounded-t-[3rem] sm:py-28">
      {/* Filigrane : symbole N (masque sur le fichier logo) */}
      <div
        aria-hidden
        className="absolute -right-16 -top-12 -z-10 h-[520px] w-[470px] animate-float-slow bg-ink opacity-[0.08] sm:right-8"
        style={{
          WebkitMaskImage: "url(/brand/nexworks-symbol.webp)",
          maskImage: "url(/brand/nexworks-symbol.webp)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
      <Container>
        <AnimatedHeading as="h2" text={title} className="max-w-4xl font-display text-[clamp(2.8rem,7.4vw,6.6rem)] font-bold leading-[0.98]" />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed sm:text-xl">{text}</p>
        </Reveal>
        <Reveal delay={0.25}>
          <Button href={quotePath(lang)} variant="dark" size="lg" arrow className="mt-9">
            {cta}
          </Button>
        </Reveal>
        <Reveal delay={0.35}>
          <ol className="mt-12 flex flex-col gap-4 border-t border-ink/20 pt-6 sm:flex-row sm:gap-10">
            {t.steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-base font-bold">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm text-white">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
