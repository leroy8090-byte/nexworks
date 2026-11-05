import { Faq } from "@/components/azur/Faq";
import { Hero } from "@/components/azur/Hero";
import { HouseFinder } from "@/components/azur/HouseFinder";
import { PipeSteps } from "@/components/azur/PipeSteps";
import { ReflexValve } from "@/components/azur/ReflexValve";
import { TileReveal } from "@/components/azur/TileReveal";
import { TileServices } from "@/components/azur/TileServices";
import { Btn, EndCta, Sign, Wrap } from "@/components/azur/ui";
import { ZoneNetwork } from "@/components/azur/ZoneNetwork";
import { Reveal } from "@/components/ui/Reveal";
import { azurPromises, azurSteps } from "@/data/azur";

export default function AzurHome() {
  return (
    <>
      <Hero />
      <HouseFinder />
      <ReflexValve />

      <section className="bg-az-tile py-20 sm:py-28">
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Sign>Nos services</Sign>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.7rem,6.5vw,5.8rem)]">Du joint qui fuit à la salle de bain.</h2>
            </div>
            <Btn href="/azur-plomberie/services" variant="line" arrow>Tous les services</Btn>
          </div>
          <div className="mt-10"><TileServices /></div>
        </Wrap>
      </section>

      <TileReveal />

      <section className="bg-white py-20 sm:py-28">
        <Wrap>
          <Sign>Comment ça se passe</Sign>
          <h2 className="mt-4 max-w-4xl text-[clamp(2.7rem,6.5vw,5.8rem)]">Quatre étapes, pas une de plus.</h2>
          <div className="mt-12"><PipeSteps steps={azurSteps} /></div>
        </Wrap>
      </section>

      <section className="bg-az-cobalt py-20 text-white sm:py-28">
        <Wrap>
          <h2 className="max-w-4xl text-[clamp(2.7rem,6.5vw,5.8rem)]">Nos engagements, écrits noir sur blanc.</h2>
          <ul className="mt-10 grid gap-x-8 md:grid-cols-2">
            {azurPromises.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 0.06} y={18} className="border-t-2 border-white/40 py-5">
                  <h3 className="text-[2.1rem]">{p.title}</h3>
                  <p className="mt-1.5 text-lg text-white/85">{p.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <section className="az-tiles bg-az-tile py-20 sm:py-28">
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Sign>Notre secteur</Sign>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.7rem,6.5vw,5.8rem)]">Autour de Saint-Raphaël.</h2>
            </div>
            <Btn href="/azur-plomberie/zone-d-intervention" variant="line" arrow>Voir le secteur</Btn>
          </div>
          <div className="mt-10"><ZoneNetwork /></div>
        </Wrap>
      </section>

      <Faq />
      <EndCta />
    </>
  );
}
