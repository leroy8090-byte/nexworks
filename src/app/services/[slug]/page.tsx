import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServicePage, servicePagePath, servicePages } from "@/data/service-pages";
import { getService, services } from "@/data/services";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { AnimationShowcase } from "@/components/animations/AnimationShowcase";
import { CtaSection } from "@/components/sections/CtaSection";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { Check, Plus } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Eyebrow, Glow, JsonLd, SectionHeading } from "@/components/ui/Section";
import { LiveService } from "@/components/visuals/LiveVisuals";

type Params = { slug: string };

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = getServicePage((await params).slug);
  if (!page) return {};
  return buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/services/${page.slug}`, absoluteTitle: true });
}

export default async function ServicePageView({ params }: { params: Promise<Params> }) {
  const page = getServicePage((await params).slug);
  if (!page) notFound();
  const service = getService(page.id);
  const path = `/services/${page.slug}`;
  const others = services.filter((s) => s.id !== page.id);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: service.plainTitle, serviceType: service.projectType, description: page.answer, path, items: service.items }),
          faqJsonLd(page.faq),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/services" },
            { name: page.eyebrow, path },
          ]),
        ]}
      />

      <section className="relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
        <Glow className="hero-drift -top-52 left-[12%] h-[620px] w-[920px]" />
        <Container className="relative">
          <nav aria-label="Fil d'Ariane" className="mb-6 text-[15px] text-mist">
            <Link href="/services" className="transition-colors hover:text-white">
              ← Tous les services
            </Link>
          </nav>
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <AnimatedHeading as="h1" immediate text={page.h1} className="mt-4 max-w-5xl font-display text-[clamp(2.5rem,5.8vw,5rem)] font-bold leading-[1.02] text-white" />
          <Reveal immediate visible y={16} delay={0.1}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/85 sm:text-xl">{page.answer}</p>
          </Reveal>
          <Reveal immediate delay={0.45}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={`/contact?objet=devis&projet=${encodeURIComponent(service.projectType)}#formulaire`} size="lg" arrow>
                Demander un devis
              </Button>
              <Button href="/realisations" size="lg" variant="secondary">
                Voir des exemples
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-4xl rounded-3xl bg-ink-2 p-4 sm:p-6">
            <LiveService id={page.id} />
          </div>
        </Container>
      </section>

      {/* Design & UX/UI : les types d'animation d'entrée, à lancer en plein écran */}
      {page.id === "design-ux" && <AnimationShowcase />}

      <section className="paper relative z-10 rounded-t-[2rem] pb-20 pt-20 sm:rounded-t-[3rem] sm:pb-28 sm:pt-28">
        <Container className="space-y-16 sm:space-y-24">
          {page.sections.map((s) => (
            <div key={s.title} className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
              <h2 className="font-display text-[clamp(2rem,3.4vw,3rem)] font-bold leading-[1.05]">{s.title}</h2>
              <div>
                {s.text && <p className="text-lg leading-relaxed text-fog">{s.text}</p>}
                {s.points && (
                  <ul className="space-y-5 border-t border-graphite/15 pt-5 first:mt-0 [p+&]:mt-6">
                    {s.points.map((p) => (
                      <li key={p.title} className="border-b border-graphite/15 pb-5">
                        <h3 className="font-display text-xl font-bold">{p.title}</h3>
                        <p className="mt-1.5 text-[17px] leading-relaxed text-fog">{p.text}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}

          <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            <h2 className="font-display text-[clamp(2rem,3.4vw,3rem)] font-bold leading-[1.05]">Ce qui est inclus</h2>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {service.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[17px] leading-snug">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-graphite text-white">
                    <Check className="size-3.5" strokeWidth={2.6} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            <h2 className="font-display text-[clamp(2rem,3.4vw,3rem)] font-bold leading-[1.05]">C&apos;est pour vous si…</h2>
            <ul className="space-y-3">
              {page.forWho.map((w) => (
                <li key={w} className="flex items-start gap-3 text-lg leading-snug">
                  <span className="mt-2.5 size-2 shrink-0 rounded-full bg-sky-deep" aria-hidden />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Comment ça se passe" title="Quatre étapes, *sans surprise.*" />
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {page.steps.map((s, i) => (
              <li key={s.title}>
                <span className="flex size-10 items-center justify-center rounded-full bg-sky font-display text-lg font-bold text-ink">{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-mist">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="paper relative z-10 rounded-t-[2rem] pb-28 pt-20 sm:rounded-t-[3rem] sm:pb-40 sm:pt-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
          <SectionHeading tone="light" eyebrow="Questions fréquentes" title="Vos questions, *nos réponses.*" />
          <div className="border-t border-graphite/15">
            {page.faq.map((f, i) => (
              <details key={f.q} open={i === 0} className="group border-b border-graphite/15 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 marker:content-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-xl font-bold leading-snug">{f.q}</h3>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-graphite/25 transition-all duration-300 group-open:rotate-45 group-open:border-graphite group-open:bg-graphite group-open:text-white">
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl pr-12 text-[17px] leading-relaxed text-fog">{f.a}</p>
              </details>
            ))}
            <nav aria-label="Autres services" className="mt-10">
              <h2 className="text-base font-bold">Nos autres services</h2>
              <ul className="mt-3 flex flex-wrap gap-3">
                {others.map((o) => (
                  <li key={o.id}>
                    <Link href={servicePagePath(o.id)} className="inline-flex rounded-full border border-graphite/20 px-5 py-3 text-[15px] font-semibold transition-colors hover:border-graphite hover:bg-graphite hover:text-white">
                      {o.plainTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
