import Image from "next/image";
import Link from "next/link";
import { CategoryStrip } from "@/components/orea/CategoryStrip";
import { FleetPinned } from "@/components/orea/FleetPinned";
import { HomeHero } from "@/components/orea/HomeHero";
import { PriceGauge } from "@/components/orea/PriceGauge";
import { RoadStory } from "@/components/orea/RoadStory";
import { SpeedText } from "@/components/orea/SpeedText";
import { Btn, RoadBand, Sign, Wrap } from "@/components/orea/ui";
import { Reveal } from "@/components/ui/Reveal";
import { destinations, faq, included, locations, orea } from "@/data/orea";

export default function OreaHome() {
  return (
    <>
      <HomeHero />
      <SpeedText />
      <FleetPinned />
      <RoadBand />
      <CategoryStrip />
      <RoadStory />
      <PriceGauge />

      <section className="bg-or-sand py-20 text-or-ink sm:py-28">
        <Wrap>
          <Sign>Toujours inclus</Sign>
          <h2 className="mt-4 max-w-4xl text-[clamp(3rem,7vw,6.5rem)]">Ce que vous n&apos;aurez pas à négocier.</h2>
          <ul className="mt-10 grid gap-x-8 gap-y-2 md:grid-cols-2">
            {included.map((x, i) => (
              <li key={x.title}>
                <Reveal delay={i * 0.06} y={18} className="border-t-2 border-or-ink py-5">
                  <h3 className="text-4xl">{x.title}</h3>
                  <p className="mt-1 text-lg text-or-ink/80">{x.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <section className="bg-or-ink py-20 text-white sm:py-28">
        <Wrap className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Sign>Où aller</Sign>
            <h2 className="mt-4 max-w-4xl text-[clamp(3rem,7vw,6.5rem)]">Des routes qui valent le détour.</h2>
          </div>
          <Btn href={`${orea.basePath}/destinations`} variant="ghost" arrow>Toutes les idées</Btn>
        </Wrap>
        <Wrap className="mt-10">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d, i) => (
              <li key={d.slug}>
                <Reveal delay={i * 0.07} y={32}>
                  <Link href={`${orea.basePath}/destinations#${d.slug}`} className="group block">
                    <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-or-ink2">
                      <Image src={d.image} alt={d.imageAlt} fill sizes="(max-width: 1024px) 100vw, 660px" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    </span>
                    <span className="mt-3 block text-[15px] font-bold text-or-flame">{d.duration}</span>
                    <span className="mt-0.5 block font-[family-name:var(--font-orea-display)] text-3xl font-extrabold uppercase leading-none">{d.title}</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <section className="bg-or-sand py-20 text-or-ink sm:py-28">
        <Wrap className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Sign>Nos agences</Sign>
            <h2 className="mt-4 max-w-4xl text-[clamp(3rem,7vw,6.5rem)]">Présents dans cinq villes.</h2>
          </div>
          <Btn href={`${orea.basePath}/agences`} variant="line" arrow>Toutes les agences</Btn>
        </Wrap>
        <Wrap className="mt-10">
          <ul className="grid gap-4 md:grid-cols-6">
            {locations.map((l, i) => (
              <li key={l.key} className={i < 2 ? "md:col-span-3" : "md:col-span-2"}>
                <Reveal delay={Math.min(i, 3) * 0.06} y={30}>
                  <Link href={`${orea.basePath}/agences#${l.key}`} className={`group relative block overflow-hidden rounded-2xl bg-or-ink ${i < 2 ? "aspect-[16/10]" : "aspect-[4/3] md:aspect-[4/5]"}`}>
                    <Image src={l.image} alt={l.imageAlt} fill sizes={i < 2 ? "(max-width: 768px) 92vw, 660px" : "(max-width: 768px) 92vw, 860px"} className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-or-ink/90 via-transparent to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <span className="block font-[family-name:var(--font-orea-display)] text-5xl font-black uppercase leading-none">{l.city}</span>
                      <span className="mt-1 block text-[15px] font-semibold text-white/90">{l.hint}</span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <section className="border-t-2 border-or-ink/10 bg-or-sand py-20 text-or-ink sm:py-28">
        <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
          <div>
            <Sign>Questions</Sign>
            <h2 className="mt-4 text-[clamp(3rem,6vw,5.5rem)]">Avant de partir.</h2>
          </div>
          <div className="border-t-2 border-or-ink">
            {faq.map((f, i) => (
              <details key={f.q} open={i === 0} className="group border-b-2 border-or-ink/15 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-bold marker:content-none [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded bg-or-ink text-xl leading-none text-white transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 max-w-2xl pr-12 text-[17px] leading-relaxed text-or-ink/80">{f.a}</p>
              </details>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="relative isolate overflow-hidden bg-or-ink py-24 text-white sm:py-36">
        <Image src="/orea-drive/cockpit.webp" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-40" />
        <Wrap>
          <h2 className="max-w-5xl text-[clamp(3.8rem,11vw,10rem)] leading-[0.85]">On prend la route ?</h2>
          <Btn href={`${orea.basePath}/vehicules`} className="mt-8" arrow>Choisir mon véhicule</Btn>
        </Wrap>
      </section>
    </>
  );
}
