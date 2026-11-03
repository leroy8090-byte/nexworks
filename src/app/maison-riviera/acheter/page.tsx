import type { Metadata } from "next";
import Link from "next/link";
import { buyPoints, destinations, properties, riviera } from "@/data/riviera";
import { CtaContact } from "@/components/riviera/HomeSections";
import { PropertyCard } from "@/components/riviera/PropertyCard";
import { PageIntro, Reveal, RivieraButton, SectionHead, Wrap } from "@/components/riviera/ui";

export const metadata: Metadata = {
  title: "Acheter",
  description: "Acheter sur la Côte d'Azur : une approche attentive et transparente (agence fictive de démonstration).",
};

export default function AcheterPage() {
  return (
    <>
      <PageIntro
        eyebrow="Acheter"
        title="Trouvez le lieu qui vous ressemble."
        text="Un achat immobilier est avant tout une décision de vie. Nous partons de votre quotidien pour vous présenter des adresses qui ont du sens."
      />
      <section className="py-20 sm:py-28">
        <Wrap>
          <SectionHead eyebrow="Notre approche" title="Quatre engagements" />
          <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {buyPoints.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 0.1}>
                <div className="border-t border-[#D9CBB7] pt-6">
                  <p className="font-[family-name:var(--font-riviera-display)] text-[1.2rem] text-[#68715B]">0{i + 1}</p>
                  <h3 className="mt-2 font-[family-name:var(--font-riviera-display)] text-[1.8rem] font-normal">{b.title}</h3>
                  <p className="mt-3 max-w-md text-[15.5px] leading-[1.8] text-[#858178]">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>
      <section className="border-y border-[#D9CBB7] bg-[#FFFEFA] py-20 sm:py-28">
        <Wrap>
          <SectionHead eyebrow="Où chercher" title="Les communes de notre sélection" />
          <ul className="mt-10 flex flex-wrap gap-3">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`${riviera.basePath}/proprietes?location=${encodeURIComponent(d.name)}`}
                  className="inline-block border border-[#D9CBB7] px-5 py-2.5 text-[13px] uppercase tracking-[0.14em] transition-colors hover:border-[#68715B] hover:text-[#68715B]"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>
      <section className="py-20 sm:py-28">
        <Wrap>
          <SectionHead eyebrow="À la une" title="Quelques propriétés" />
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {properties.slice(0, 3).map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
          <div className="mt-12">
            <RivieraButton href={`${riviera.basePath}/proprietes`} variant="secondary">
              Toutes les propriétés
            </RivieraButton>
          </div>
        </Wrap>
      </section>
      <CtaContact title="Décrivez-nous votre recherche" />
    </>
  );
}
