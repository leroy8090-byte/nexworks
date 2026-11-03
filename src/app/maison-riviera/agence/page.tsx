import type { Metadata } from "next";
import Image from "next/image";
import { riviera } from "@/data/riviera";
import { CtaContact } from "@/components/riviera/HomeSections";
import { PageIntro, Reveal, SectionHead, Wrap } from "@/components/riviera/ui";

export const metadata: Metadata = {
  title: "L'agence",
  description: "MAISON RIVIERA : un concept d'agence immobilière de prestige imaginé pour une démonstration.",
};

const values = [
  { t: "Justesse", d: "Dire les choses telles qu'elles sont : un bien, un prix, un quartier, sans emphase." },
  { t: "Discrétion", d: "Un accompagnement feutré, respectueux de la vie privée de chacun." },
  { t: "Exigence", d: "Une sélection resserrée, pour ne présenter que ce qui mérite de l'être." },
];

export default function AgencePage() {
  return (
    <>
      <PageIntro
        eyebrow="L'agence"
        title="Un regard d'éditeur sur l'immobilier."
        text="MAISON RIVIERA est une agence imaginaire, pensée pour illustrer ce que NEXWORKS AGENCY peut créer pour un acteur de l'immobilier de prestige."
      />
      <section className="py-20 sm:py-28">
        <Wrap className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#D9CBB7]">
              <Image src={riviera.aboutImage} alt="Intérieur lumineux d'une maison de la Côte d'Azur" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.3em] text-[#68715B]">Notre idée</p>
            <h2 className="mt-4 font-[family-name:var(--font-riviera-display)] text-[2.6rem] font-light leading-[1.1]">
              Un bien se choisit pour la vie qu&apos;il permet.
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-[1.9] text-[#858178]">
              <p>
                Entre Saint-Raphaël, Cannes et Saint-Tropez, chaque adresse raconte un rapport différent à la lumière, à la mer et au temps. L&apos;agence imaginée ici s&apos;attache à comprendre ce rapport avant de proposer quoi que ce soit.
              </p>
              <p>
                Pas de catalogue interminable : une sélection resserrée, des présentations soignées et des échanges humains, de la première visite jusqu&apos;à la signature.
              </p>
              <p className="text-[14px]">
                Précision : MAISON RIVIERA n&apos;existe pas. Il s&apos;agit d&apos;un site de démonstration, sans équipe, chiffres ni références réels.
              </p>
            </div>
          </Reveal>
        </Wrap>
      </section>
      <section className="border-y border-[#D9CBB7] bg-[#FFFEFA] py-20 sm:py-28">
        <Wrap>
          <SectionHead eyebrow="Nos principes" title="Trois valeurs de travail" />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.1}>
                <div className="border-t border-[#24251F] pt-6">
                  <h3 className="font-[family-name:var(--font-riviera-display)] text-[1.9rem] font-normal">{v.t}</h3>
                  <p className="mt-3 text-[15.5px] leading-[1.8] text-[#858178]">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>
      <CtaContact />
    </>
  );
}
