import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Reservation } from "@/components/orea/Reservation";
import { Wrap } from "@/components/orea/ui";
import { getVehicle, orea } from "@/data/orea";

export const metadata: Metadata = { title: "Réserver" };

type Search = Promise<Record<string, string | string[] | undefined>>;
const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

export default async function ReservePage({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams;
  const vehicle = getVehicle(str(sp.vehicule) ?? "");
  if (!vehicle) redirect(`${orea.basePath}/vehicules`);
  return (
    <>
      <div className="h-[72px] bg-or-ink" aria-hidden />
      <section className="min-h-[80svh] bg-or-sand py-10 text-or-ink sm:py-14">
        <Wrap>
          <h1 className="rise mb-8 text-[clamp(3rem,7vw,6rem)]">Réservez votre {vehicle.name}</h1>
          <Reservation vehicle={vehicle} initial={{ lieu: str(sp.lieu), depart: str(sp.depart), retour: str(sp.retour) }} />
        </Wrap>
      </section>
    </>
  );
}
