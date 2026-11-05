import type { Metadata } from "next";
import Image from "next/image";
import { Btn, PageTop, Wrap } from "@/components/orea/ui";
import { Reveal } from "@/components/ui/Reveal";
import { destinations, getVehicle, orea } from "@/data/orea";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Idées de destinations" };

export default function DestinationsPage() {
  return (
    <>
      <PageTop sign="Destinations" title="Où va-t-on ?" text="Quatre idées de routes au départ de la Côte d'Azur, et la voiture qui va avec." />
      <section className="bg-or-sand py-16 text-or-ink sm:py-24">
        <Wrap className="space-y-16 sm:space-y-28">
          {destinations.map((d, i) => {
            const v = getVehicle(d.vehicle);
            return (
              <article key={d.slug} id={d.slug} className="grid scroll-mt-24 items-center gap-7 lg:grid-cols-2 lg:gap-14">
                <Reveal x={i % 2 ? 40 : -40} y={0} className={cn("relative aspect-[4/3] overflow-hidden rounded-2xl bg-or-ink", i % 2 === 1 && "lg:order-2")}>
                  <Image src={d.image} alt={d.imageAlt} fill sizes="(max-width: 1024px) 92vw, 640px" className="object-cover" />
                </Reveal>
                <Reveal y={24}>
                  <p className="text-base font-bold text-or-flame-deep">{d.duration}</p>
                  <h2 className="mt-1 text-[clamp(3rem,5.5vw,5.5rem)]">{d.title}</h2>
                  <p className="mt-3 text-lg leading-relaxed text-or-ink/80">{d.text}</p>
                  {v && <Btn href={`${orea.basePath}/vehicules/${v.slug}`} variant="ink" className="mt-5" arrow>Y aller en {v.name}</Btn>}
                </Reveal>
              </article>
            );
          })}
        </Wrap>
      </section>
    </>
  );
}
