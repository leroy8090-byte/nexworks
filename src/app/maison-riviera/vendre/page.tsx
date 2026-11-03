import type { Metadata } from "next";
import { sellSteps } from "@/data/riviera";
import { EstimateForm } from "@/components/riviera/Forms";
import { PageIntro, Reveal, SectionHead, Wrap } from "@/components/riviera/ui";

export const metadata: Metadata = {
  title: "Vendre",
  description: "Confier la vente de votre bien : estimation, mise en valeur et accompagnement (agence fictive de démonstration).",
};

export default function VendrePage() {
  return (
    <>
      <PageIntro
        eyebrow="Vendre"
        title="Confiez votre bien à une adresse de confiance."
        text="Une vente réussie tient à la justesse : du prix, du récit et des rencontres. Voici la façon dont nous imaginons cet accompagnement."
      />
      <section className="py-20 sm:py-28">
        <Wrap>
          <SectionHead eyebrow="Notre méthode" title="Cinq étapes, sans surprise" />
          <ol className="mt-14 border-t border-[#D9CBB7]">
            {sellSteps.map((s, i) => (
              <Reveal key={s.title}>
                <li className="grid gap-3 border-b border-[#D9CBB7] py-8 md:grid-cols-[100px_1fr_1.4fr] md:gap-10">
                  <span className="font-[family-name:var(--font-riviera-display)] text-[2.4rem] font-light text-[#68715B]">0{i + 1}</span>
                  <h3 className="font-[family-name:var(--font-riviera-display)] text-[1.8rem] font-normal">{s.title}</h3>
                  <p className="text-[15.5px] leading-[1.8] text-[#858178]">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Wrap>
      </section>
      <section id="estimation" className="border-t border-[#D9CBB7] bg-[#FFFEFA] py-20 sm:py-28">
        <Wrap className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div>
            <SectionHead eyebrow="Estimation" title="Demandez une estimation" text="Renseignez quelques informations sur votre bien. Ce formulaire est une démonstration : rien n'est envoyé." />
          </div>
          <Reveal>
            <EstimateForm />
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
