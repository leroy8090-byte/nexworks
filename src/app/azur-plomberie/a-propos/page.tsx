import type { Metadata } from "next";
import Image from "next/image";
import { PipeSteps } from "@/components/azur/PipeSteps";
import { EndCta, PageTop, Sign, Wrap } from "@/components/azur/ui";
import { Reveal } from "@/components/ui/Reveal";
import { azurPromises, azurSteps, azurValues } from "@/data/azur";

export const metadata: Metadata = { title: "L'artisan" };

export default function AboutPage() {
  return (
    <>
      <PageTop sign="L'artisan" title="Un plombier qu'on comprend." text="Azur Plomberie, c'est une idée simple : vous dire ce qui se passe chez vous, et ce que ça coûte, avant de toucher à quoi que ce soit." />

      <section className="bg-az-tile py-20 sm:py-28">
        <Wrap className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal x={-40} y={0} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-az-grout">
            <Image src="/azur/sdb-hero.webp" alt="Lavabo sur colonne près d'une fenêtre, dans une salle de bain blanche" fill sizes="(max-width: 1024px) 92vw, 620px" className="object-cover" />
          </Reveal>
          <div>
            <Sign>Notre façon de travailler</Sign>
            <ol className="mt-6 space-y-7">
              {azurValues.map((v) => (
                <li key={v.title}>
                  <Reveal y={18}>
                    <h2 className="text-[clamp(2.5rem,4.5vw,3.8rem)]">{v.title}</h2>
                    <p className="mt-2 text-lg leading-relaxed text-az-ink/80">{v.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Wrap>
      </section>

      <section className="bg-az-cobalt py-20 text-white sm:py-28">
        <Wrap>
          <h2 className="max-w-4xl text-[clamp(2.7rem,6.5vw,5.8rem)]">Ce sur quoi vous pouvez compter.</h2>
          <ul className="mt-10 grid gap-x-8 md:grid-cols-2">
            {azurPromises.map((p) => (
              <li key={p.title} className="border-t-2 border-white/40 py-5">
                <h3 className="text-[2.1rem]">{p.title}</h3>
                <p className="mt-1.5 text-lg text-white/85">{p.text}</p>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Wrap>
          <Sign>Comment ça se passe</Sign>
          <h2 className="mt-4 text-[clamp(2.7rem,6.5vw,5.8rem)]">Quatre étapes, pas une de plus.</h2>
          <div className="mt-12"><PipeSteps steps={azurSteps} /></div>
        </Wrap>
      </section>

      <section className="bg-az-tile py-14">
        <Wrap>
          <p className="max-w-3xl text-[15px] leading-relaxed text-az-ink/75">Azur Plomberie est une entreprise fictive. Ce site ne présente volontairement ni avis clients, ni ancienneté, ni certification : rien de tout cela n&apos;existe. Sur un vrai site, ces preuves viendraient de l&apos;artisan.</p>
        </Wrap>
      </section>
      <EndCta />
    </>
  );
}
