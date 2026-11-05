import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Btn, Spec, Wrap } from "@/components/orea/ui";
import { VehicleCard } from "@/components/orea/VehicleCard";
import { daysBetween, formatEuro, getVehicle, included, orea, quote, vehicles } from "@/data/orea";
import { photoCredits } from "@/data/orea-credits";

type Params = Promise<{ slug: string }>;
type Search = Promise<Record<string, string | string[] | undefined>>;
const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const v = getVehicle((await params).slug);
  return v ? { title: v.name, description: `${v.name} : ${v.tagline} ${v.description}` } : {};
}

export default async function VehiclePage({ params, searchParams }: { params: Params; searchParams: Search }) {
  const v = getVehicle((await params).slug);
  if (!v) notFound();
  const sp = await searchParams;
  const lieu = str(sp.lieu), depart = str(sp.depart), retour = str(sp.retour);
  const days = depart && retour ? daysBetween(depart, retour) : undefined;
  const q = days ? quote(v.pricePerDay, days) : null;
  const params2 = new URLSearchParams({ vehicule: v.slug, ...(lieu ? { lieu } : {}), ...(depart ? { depart } : {}), ...(retour ? { retour } : {}) });
  const credit = photoCredits[`catalogue/${v.slug}`];
  const others = vehicles.filter((o) => o.slug !== v.slug && o.category === v.category).sort((a, b) => Math.abs(a.pricePerDay - v.pricePerDay) - Math.abs(b.pricePerDay - v.pricePerDay)).slice(0, 3);

  return (
    <>
      <section className="relative isolate flex min-h-[86svh] flex-col justify-end overflow-hidden bg-or-ink pb-10 pt-28 text-white">
        <div className="orea-reveal absolute inset-0 -z-20">
          <Image src={v.image} alt={v.imageAlt} fill preload sizes="100vw" className="object-cover" />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-or-ink via-or-ink/40 to-or-ink/30" />
        <Wrap>
          <nav aria-label="Fil d'Ariane" className="mb-4 text-[15px] font-semibold">
            <Link href={`${orea.basePath}/vehicules`} className="hover:underline">← Tous les véhicules</Link>
          </nav>
          <p className="rise font-[family-name:var(--font-orea-display)] text-2xl font-black uppercase text-or-flame">{v.categoryLabel}</p>
          <h1 className="rise text-[clamp(4rem,12vw,11rem)] leading-[0.85]" style={{ animationDelay: "0.1s" }}>{v.name}</h1>
          <p className="rise mt-3 text-xl sm:text-2xl" style={{ animationDelay: "0.2s" }}>{v.tagline}</p>
        </Wrap>
      </section>

      <section className="bg-or-sand py-14 text-or-ink sm:py-20">
        <Wrap className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-14">
          <div>
            <p className="text-xl leading-relaxed sm:text-2xl">{v.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-5 border-y-2 border-or-ink/15 py-6 sm:grid-cols-3">
              <Spec label="Places" value={v.seats} />
              <Spec label="Portes" value={v.doors} />
              <Spec label="Valises" value={v.bags} />
              <Spec label="Boîte" value={v.transmission} />
              <Spec label="Énergie" value={v.energy} />
              <Spec label="Âge minimum" value={`${v.minAge} ans`} />
            </dl>
            <h2 className="mt-10 text-5xl">Équipements</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {v.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-lg font-semibold">
                  <span aria-hidden className="size-3 shrink-0 rotate-45 bg-or-flame-deep" />
                  {f}
                </li>
              ))}
            </ul>
            <h2 className="mt-10 text-5xl">Idéal pour</h2>
            <p className="mt-2 text-lg">{v.idealFor}.</p>
            {credit && (
              <p className="mt-8 text-sm text-or-ink/75">
                Photo d&apos;illustration du modèle : {credit.author} ({credit.license}).{" "}
                <Link href={`${orea.basePath}/credits-photos`} className="underline underline-offset-2">Voir les crédits</Link>
              </p>
            )}
          </div>
          <aside className="rounded-2xl bg-or-ink p-6 text-white lg:sticky lg:top-24">
            <p className="text-base font-semibold text-white/75">{q ? `Total pour ${days} ${days === 1 ? "jour" : "jours"}` : "À partir de"}</p>
            <p className="mt-1 font-[family-name:var(--font-orea-display)] text-7xl font-black leading-none">
              {formatEuro(q ? q.total : v.pricePerDay)}
              {!q && <span className="ml-1 font-sans text-lg font-semibold">/ jour</span>}
            </p>
            {q && q.discount > 0 && <p className="mt-2 font-bold text-or-flame">{formatEuro(q.discount)} de remise longue durée incluse</p>}
            <Btn href={`${orea.basePath}/reserver?${params2}`} className="mt-5 w-full" arrow>Réserver</Btn>
            <ul className="mt-5 space-y-1.5 border-t border-white/15 pt-4 text-[15px] text-white/80">
              {included.slice(0, 3).map((x) => <li key={x.title}>{x.title}</li>)}
            </ul>
            <p className="mt-3 text-sm text-white/70">Tarif fictif : site de démonstration.</p>
          </aside>
        </Wrap>
      </section>

      <section className="bg-or-sand pb-24 text-or-ink">
        <Wrap>
          <h2 className="border-t-2 border-or-ink pt-8 text-5xl">À comparer aussi</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {others.map((o) => <li key={o.slug}><VehicleCard v={o} /></li>)}
          </ul>
        </Wrap>
      </section>
    </>
  );
}
