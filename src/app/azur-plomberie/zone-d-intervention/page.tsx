import type { Metadata } from "next";
import { EndCta, PageTop, Wrap } from "@/components/azur/ui";
import { ZoneNetwork } from "@/components/azur/ZoneNetwork";
import { Reveal } from "@/components/ui/Reveal";
import { azurZones } from "@/data/azur";

export const metadata: Metadata = { title: "Notre secteur" };

export default function ZonePage() {
  return (
    <>
      <PageTop sign="Secteur" title="Là où on intervient." text="Depuis notre atelier de Saint-Raphaël, on rayonne dans les communes voisines." />
      <section className="az-tiles bg-az-tile py-16 sm:py-24">
        <Wrap><ZoneNetwork detailed /></Wrap>
      </section>
      <section className="bg-white py-16 sm:py-24">
        <Wrap>
          <h2 className="text-[clamp(2.5rem,5.5vw,4.8rem)]">Les six communes.</h2>
          <ul className="mt-8 grid gap-x-8 md:grid-cols-2">
            {azurZones.map((z, i) => (
              <li key={z.key}>
                <Reveal delay={(i % 2) * 0.05} y={16} className="border-t-2 border-az-ink py-5">
                  <h3 className="text-[2.3rem]">{z.name}</h3>
                  <p className="mt-1 text-lg text-az-ink/80">{z.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>
      <EndCta title="Votre commune n'est pas sur le plan ?" text="Dites-nous où vous êtes : on vous répondra franchement." />
    </>
  );
}
