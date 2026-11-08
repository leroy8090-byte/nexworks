import { faqFor } from "@/data/localized";
import type { Lang } from "@/i18n/lang";
import { Plus } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, JsonLd, SectionHeading } from "@/components/ui/Section";

const faqJsonLd = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: lang,
  mainEntity: faqFor(lang).map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** FAQ : réponses toujours présentes dans le HTML (utile aux moteurs de réponse), repliables pour l'utilisateur. */
export function FaqSection({ lang = "fr" }: { lang?: Lang }) {
  const faq = faqFor(lang);
  return (
    <section id="faq" className="paper relative z-10 rounded-t-[2rem] pb-28 pt-20 sm:rounded-t-[3rem] sm:pb-40 sm:pt-28">
      <JsonLd data={faqJsonLd(lang)} />
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
        <SectionHeading tone="light" eyebrow={lang === "en" ? "Frequently asked questions" : "Questions fréquentes"} title={lang === "en" ? "What people *ask us most.*" : "Ce qu'on nous demande *le plus souvent.*"} />
        <div className="border-t border-graphite/15">
          {faq.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 4) * 0.04} y={14}>
              <details className="group border-b border-graphite/15 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 marker:content-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-xl font-bold leading-snug">{f.q}</h3>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-graphite/25 transition-all duration-300 group-open:rotate-45 group-open:border-graphite group-open:bg-graphite group-open:text-white">
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl pr-12 text-[17px] leading-relaxed text-fog">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
