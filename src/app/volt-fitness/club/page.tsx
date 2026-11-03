import type { Metadata } from "next";
import { Manifesto, Spaces, FinalCta } from "@/components/volt/HomeSections";
import { PageIntro, Photo, Reveal, Wrap } from "@/components/volt/ui";

export const metadata: Metadata = {
  title: "Le club",
  description: "Découvrez l'esprit et les espaces de VOLT FITNESS CLUB — club fictif de démonstration.",
};

const values = [
  { n: "01", t: "Méthode", d: "Des séances structurées, une progression lisible, une technique d'abord." },
  { n: "02", t: "Intensité juste", d: "S'engager à fond, sans se blesser : l'effort est adapté à chacun." },
  { n: "03", t: "Collectif", d: "Une salle où l'on s'encourage, du débutant au pratiquant expérimenté." },
];

export default function ClubPage() {
  return (
    <>
      <PageIntro
        eyebrow="Le club"
        title="Un lieu pour s'entraîner sérieusement."
        text="VOLT FITNESS CLUB est un concept fictif imaginé à Saint-Raphaël : un club dense, lisible et exigeant, conçu par NEXWORKS AGENCY pour son portfolio."
      />
      <Wrap className="grid gap-14 py-20 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <Photo src="/volt/about.webp" alt="Coach et pratiquant dans la salle de VOLT FITNESS CLUB" className="aspect-[4/5] w-full" />
        </Reveal>
        <div className="space-y-10">
          {values.map((v, i) => (
            <Reveal key={v.n} delay={i * 0.1}>
              <div className="flex gap-6 border-t border-[#F5F5F0]/12 pt-6">
                <span className="font-[family-name:var(--font-volt-display)] text-[3rem] leading-none text-[#C6FF3D]">{v.n}</span>
                <div>
                  <h2 className="font-[family-name:var(--font-volt-display)] text-[2.4rem] uppercase leading-none">{v.t}</h2>
                  <p className="mt-2 text-[15.5px] leading-[1.8] text-[#F5F5F0]/65">{v.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
      <Manifesto />
      <Spaces />
      <FinalCta />
    </>
  );
}
