import { faq } from "@/data/content";
import { Plus } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, JsonLd, SectionHeading } from "@/components/ui/Section";

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** FAQ : réponses toujours présentes dans le HTML (utile aux moteurs de réponse), repliables pour l'utilisateur. */
export function FaqSection() {
  return (
    <section id="faq" className="relative border-t border-white/[0.06] bg-ink-2 py-24 sm:py-32">
      <JsonLd data={faqJsonLd} />
      <Container className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          eyebrow="Questions fréquentes"
          title="Les réponses à vos questions *essentielles.*"
          text="Services, SEO, GEO, déroulement d'un projet : les points que l'on nous demande le plus souvent."
        />
        <div className="divide-y divide-white/[0.08] rounded-3xl border border-white/[0.08] bg-white/[0.02]">
          {faq.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 4) * 0.04} y={14}>
              <details className="group px-6 py-5 sm:px-8">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[17px] font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[17px] font-medium">{f.q}</h3>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-sky transition-all duration-300 group-open:rotate-45 group-open:border-sky/50 group-open:bg-sky/10">
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mist">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
