import type { Metadata } from "next";
import Image from "next/image";
import { azur, azurSteps, azurValuesLong, azurWhy } from "@/data/azur";
import { AzurCtaBand } from "@/components/azur/PageBlocks";
import { PageHero } from "@/components/azur/Shell";
import { AzurButton, Reveal, SectionHead, Wrap } from "@/components/azur/ui";

export const metadata: Metadata = {
  title: "À propos",
  description: `${azur.name} : concept fictif d'artisan plombier à Saint-Raphaël, réalisé pour le portfolio NEXWORKS AGENCY.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title={azur.promise}
        text="Une entreprise de plomberie moderne, professionnelle et réactive — présentée ici comme un concept de démonstration complet."
        image="/azur/about.webp"
        alt="Maison contemporaine illustrant le cadre d'intervention"
      />

      <section className="bg-white py-16 sm:py-20">
        <Wrap className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHead
              eyebrow="Notre approche"
              title="Un accompagnement clair, du premier message à l'intervention."
              text="Ce site illustre la façon dont NEXWORKS AGENCY conçoit un site vitrine pour un artisan : message immédiat, pages de services riches, zone locale indicative et formulaire honnête."
            />
            <p className="mt-5 text-[15px] leading-relaxed text-[#536273]">
              Aucune ancienneté, certification, assurance ou taille d&apos;équipe n&apos;est inventée. Les valeurs mises en avant restent des intentions de positionnement.
            </p>
            <div className="mt-8">
              <AzurButton href="/azur-plomberie/contact">Demander un devis</AzurButton>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
              <Image src="/azur/hero.webp" alt="Intérieur contemporain évoquant le confort du logement" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </Wrap>
      </section>

      <section className="bg-[#F3F6F8] py-16 sm:py-20">
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="Positionnement" title="Ce que ce concept veut transmettre" />
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {azurValuesLong.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <article className="h-full rounded-2xl border border-[#E4EBF1] bg-white p-7">
                  <h3 className="font-[family-name:var(--font-azur-display)] text-xl font-bold text-[#002D72]">{v.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#536273]">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="Valeurs" title="Un service pensé pour votre tranquillité." />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {azurWhy.map((w) => (
              <Reveal key={w.n}>
                <article className="h-full rounded-2xl border border-[#E4EBF1] bg-[#F3F6F8] p-6">
                  <p className="font-[family-name:var(--font-azur-display)] text-3xl font-bold text-[#4FC3F7]">{w.n}</p>
                  <h2 className="mt-3 text-lg font-bold text-[#002D72]">{w.title}</h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#536273]">{w.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="bg-[#002D72] py-16 sm:py-20">
        <Wrap>
          <Reveal>
            <SectionHead light eyebrow="Parcours" title="Votre projet, en quatre étapes." />
          </Reveal>
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {azurSteps.map((s) => (
              <Reveal key={s.n}>
                <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <span className="font-[family-name:var(--font-azur-display)] text-2xl font-bold text-[#4FC3F7]">{s.n}</span>
                  <h3 className="mt-3 font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-[14px] text-white/70">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Wrap>
      </section>

      <AzurCtaBand />
    </>
  );
}
