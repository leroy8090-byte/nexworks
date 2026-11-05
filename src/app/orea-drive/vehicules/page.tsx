import type { Metadata } from "next";
import { BookingBar } from "@/components/orea/BookingBar";
import { PageTop, Wrap } from "@/components/orea/ui";
import { VehicleList } from "@/components/orea/VehicleList";
import { daysBetween, locations } from "@/data/orea";

export const metadata: Metadata = { title: "Nos véhicules" };

type Search = Promise<Record<string, string | string[] | undefined>>;
const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

export default async function VehiclesPage({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams;
  const lieu = str(sp.lieu), depart = str(sp.depart), retour = str(sp.retour);
  const hasDates = Boolean(depart && retour);
  const days = hasDates ? daysBetween(depart as string, retour as string) : undefined;
  const place = locations.find((l) => l.key === lieu);
  const query = hasDates ? `?${new URLSearchParams({ lieu: lieu ?? "", depart: depart as string, retour: retour as string })}` : "";

  return (
    <>
      <PageTop
        sign="Véhicules"
        title="Choisissez votre voiture."
        text={days ? `${days} ${days === 1 ? "jour" : "jours"} au départ de ${place?.name ?? "l'agence choisie"} : le prix affiché est le total.` : "Indiquez vos dates pour voir le prix total de chaque véhicule."}
      />
      <section className="bg-or-sand pb-24 text-or-ink">
        <Wrap className="relative z-10 -translate-y-6">
          <BookingBar compact initial={{ lieu, depart, retour }} />
        </Wrap>
        <Wrap className="pt-4">
          <VehicleList initialCategory={str(sp.categorie)} days={days} query={query} />
        </Wrap>
      </section>
    </>
  );
}
