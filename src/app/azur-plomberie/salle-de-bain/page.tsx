import type { Metadata } from "next";
import Image from "next/image";
import { azurGallery, azurSdbItems, azurSteps } from "@/data/azur";
import { AzurCtaBand, RelatedServices } from "@/components/azur/PageBlocks";
import { PageHero } from "@/components/azur/Shell";
import { AzurIcons } from "@/components/azur/Icons";
import { AzurButton, Reveal, SectionHead, Wrap } from "@/components/azur/ui";

export const metadata: Metadata = {
  title: "Rénovation de salle de bain",
  description:
    "Modernisez votre salle de bain à Saint-Raphaël : douche, robinetterie, réorganisation et réseaux. Concept fictif AZUR PLOMBERIE.",
};

export default function SalleDeBainPage() {
  return (
    <>
      <PageHero
        eyebrow="Rénovation"
        title="Donnez une nouvelle dimension à votre salle de bain."
        text="Une rénovation pensée pour allier confort, esthétique et fonctionnalité — présentée ici comme un parcours complet de site vitrine."
        image="/azur/sdb-hero.webp"
        alt="Salle de bain contemporaine"
      />

      <section className="bg-white py-16 sm:py-20">
        <Wrap className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHead
              eyebrow="Le projet"
              title="Plus qu'un simple remplacement d'équipement."
              text="Changer une baignoire, créer une douche ou reprendre les arrivées d'eau demande une lecture claire de l'existant. Cette page détaille le périmètre présenté par le concept."
            />
            <div className="mt-8">
              <AzurButton href="/azur-plomberie/contact">Parler de mon projet</AzurButton>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
              <Image src="/azur/service-sdb.webp" alt="Salle de bain lumineuse après rénovation" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </Wrap>
      </section>

      <section className="bg-[#F3F6F8] py-16 sm:py-20">
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="Prestations" title="Ce que peut couvrir une rénovation" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {azurSdbItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <article className="h-full rounded-2xl border border-[#E4EBF1] bg-white p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#E3F6FD] text-[#0077C2]">
                    <AzurIcons.bath className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-[#002D72]">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#536273]">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="Ambiances" title="Inspirations visuelles" text="Photographies illustratives — elles ne représentent pas un chantier réel d'AZUR PLOMBERIE." />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {azurGallery.map((g, i) => (
              <Reveal key={g.src} delay={i * 0.03}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={g.src} alt={g.alt} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="bg-[#002D72] py-16 sm:py-20">
        <Wrap>
          <Reveal>
            <SectionHead light eyebrow="Méthode" title="Du premier message à l'intervention" />
          </Reveal>
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {azurSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <span className="font-[family-name:var(--font-azur-display)] text-2xl font-bold text-[#4FC3F7]">{s.n}</span>
                  <h3 className="mt-3 font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/70">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Wrap>
      </section>

      <RelatedServices exclude="renovation-salle-de-bain" />
      <AzurCtaBand title="Envie de moderniser votre salle de bain ?" text="Décrivez l'existant et vos priorités : espace, douche, budget indicatif si vous le souhaitez." />
    </>
  );
}
