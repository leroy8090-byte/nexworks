import type { Metadata } from "next";
import Link from "next/link";
import { sectors } from "@/data/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { SectorArt } from "@/components/sections/SectorsSection";
import { ArrowRight } from "@/components/ui/Icons";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Container, JsonLd, PageHero } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "Secteurs : sites web pour hôtels, restaurants et entreprises",
  description:
    "Hôtellerie, restauration, entreprises et indépendants : découvrez comment NEXWORKS AGENCY adapte votre site web et votre visibilité à votre métier.",
  path: "/secteurs",
});

export default function SecteursPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Secteurs", path: "/secteurs" }])} />
      <PageHero
        eyebrow="Secteurs"
        title="Votre métier a ses codes. *Votre site aussi.*"
        text="Un restaurant, un hôtel et un artisan n'ont pas les mêmes clients ni les mêmes besoins. Choisissez votre activité pour voir ce que nous mettons en place."
      />
      <section className="pb-28 sm:pb-40">
        <Container>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {sectors.map((s) => (
              <StaggerItem key={s.slug} className="h-full">
                <Link href={`/secteurs/${s.slug}`} className="group flex h-full flex-col rounded-3xl border border-white/10 bg-ink-2 p-3 transition-colors hover:border-sky/60">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-3">
                    <SectorArt type={s.icon} className="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h2 className="font-display text-3xl font-bold leading-tight text-white">{s.title}</h2>
                    <p className="mt-3 text-[17px] leading-relaxed text-mist">{s.short}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-bold text-sky">
                      Voir ce que nous proposons
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-mist">
            Votre activité n&apos;est pas dans la liste ? Nos services s&apos;adaptent aussi à votre métier :{" "}
            <Link href="/contact#formulaire" className="whitespace-nowrap font-bold text-white underline-offset-4 hover:underline">
              parlons-en
            </Link>
            .
          </p>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
