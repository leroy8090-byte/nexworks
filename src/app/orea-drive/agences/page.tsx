import type { Metadata } from "next";
import Image from "next/image";
import { Btn, PageTop, Wrap } from "@/components/orea/ui";
import { Reveal } from "@/components/ui/Reveal";
import { locations, orea } from "@/data/orea";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Nos agences" };

export default function AgenciesPage() {
  return (
    <>
      <PageTop sign="Agences" title="Cinq points de départ." text="Prenez votre voiture dans une agence et rendez-la dans une autre, sans supplément. Agences et horaires fictifs, villes bien réelles." />
      <section className="bg-or-sand py-16 text-or-ink sm:py-24">
        <Wrap className="space-y-14 sm:space-y-24">
          {locations.map((l, i) => (
            <article key={l.key} id={l.key} className="grid scroll-mt-24 items-center gap-7 lg:grid-cols-12 lg:gap-12">
              <Reveal x={i % 2 ? 40 : -40} y={0} className={cn("group relative aspect-[3/2] overflow-hidden rounded-2xl bg-or-ink lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
                <Image src={l.image} alt={l.imageAlt} fill loading={i === 0 ? "eager" : "lazy"} sizes="(max-width: 1024px) 92vw, 760px" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </Reveal>
              <Reveal y={24} className="lg:col-span-5">
                <p className="text-base font-bold text-or-flame-deep">{l.city}</p>
                <h2 className="mt-1 text-[clamp(3rem,5vw,5rem)]">{l.name}</h2>
                <p className="mt-3 text-lg leading-relaxed text-or-ink/80">{l.text}</p>
                <dl className="mt-5 space-y-1 border-t-2 border-or-ink/15 pt-4 text-[17px]">
                  <div className="flex flex-wrap gap-x-2"><dt className="font-bold">Accès :</dt><dd>{l.hint}</dd></div>
                  <div className="flex flex-wrap gap-x-2"><dt className="font-bold">Horaires :</dt><dd>{l.hours}</dd></div>
                </dl>
                <Btn href={`${orea.basePath}/vehicules?lieu=${l.key}`} variant="ink" className="mt-6" arrow>Partir d&apos;ici</Btn>
              </Reveal>
            </article>
          ))}
        </Wrap>
      </section>
    </>
  );
}
