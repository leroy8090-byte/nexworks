import type { Metadata } from "next";
import { azur, azurZones } from "@/data/azur";
import { AzurCtaBand } from "@/components/azur/PageBlocks";
import { PageHero } from "@/components/azur/Shell";
import { AzurIcons } from "@/components/azur/Icons";
import { Reveal, SectionHead, Wrap } from "@/components/azur/ui";

export const metadata: Metadata = {
  title: "Zone d'intervention",
  description:
    "Zone indicative autour de Saint-Raphaël : Fréjus, Puget-sur-Argens, Sainte-Maxime… Concept fictif AZUR PLOMBERIE.",
};

export default function ZonePage() {
  return (
    <>
      <PageHero
        eyebrow="Côte d'Azur"
        title="À votre service sur la Côte d'Azur."
        text={`${azur.name} est présenté comme un artisan intervenant dans le secteur de Saint-Raphaël et ses environs.`}
        image="/azur/about.webp"
        alt="Cadre résidentiel en bord de mer"
      />

      <section className="bg-white py-16 sm:py-20">
        <Wrap className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <SectionHead
              eyebrow="Zone indicative"
              title="Un périmètre local, clairement présenté"
              text="Ces communes illustrent une zone d'intervention possible pour un artisan local. Elles ne correspondent pas à une activité réelle et aucune adresse exacte n'est associée au concept."
            />
            <div className="mt-8 rounded-2xl border border-[#E4EBF1] bg-[#F3F6F8] p-6 text-[14px] leading-relaxed text-[#536273]">
              <p>
                <strong className="text-[#002D72]">Important :</strong> pas de SIRET, pas de rue, pas de « nous intervenons en 30 minutes ». Le but est de montrer comment structurer une page locale honnête.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-[1.75rem] border border-[#D5DEE7] bg-[#F3F6F8] p-6 sm:p-8">
              <svg viewBox="0 0 480 360" className="w-full" role="img" aria-label="Carte stylisée de la zone indicative">
                <rect width="480" height="360" rx="24" fill="#E3F6FD" />
                <path d="M0 250 C80 210 140 280 220 240 S360 200 480 230 V360 H0Z" fill="#4FC3F7" opacity=".35" />
                <path d="M0 270 C100 230 160 300 250 260 S380 220 480 255 V360 H0Z" fill="#0077C2" opacity=".25" />
                {[
                  [240, 150, "Saint-Raphaël"],
                  [160, 170, "Fréjus"],
                  [300, 130, "Sainte-Maxime"],
                  [120, 210, "Puget"],
                  [200, 210, "Roquebrune"],
                  [340, 160, "Issambres"],
                ].map(([x, y, label]) => (
                  <g key={String(label)}>
                    <circle cx={Number(x)} cy={Number(y)} r="7" fill="#002D72" />
                    <circle cx={Number(x)} cy={Number(y)} r="14" fill="#4FC3F7" opacity=".35" />
                    <text x={Number(x) + 14} y={Number(y) + 4} fontSize="13" fontWeight="600" fill="#002D72">
                      {label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </Reveal>
        </Wrap>
      </section>

      <section className="bg-[#F3F6F8] py-16 sm:py-20">
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="Communes" title="Secteurs présentés dans ce concept" />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {azurZones.map((z, i) => (
              <Reveal key={z.name} delay={i * 0.04}>
                <article className="h-full rounded-2xl border border-[#E4EBF1] bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-[#E3F6FD] text-[#0077C2]">
                      <AzurIcons.pin className="size-5" />
                    </span>
                    <h3 className="text-lg font-bold text-[#002D72]">{z.name}</h3>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#536273]">{z.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <AzurCtaBand title="Votre commune est dans la liste ?" text="Indiquez-la dans le formulaire : cela aide à illustrer un parcours de demande locale." />
    </>
  );
}
