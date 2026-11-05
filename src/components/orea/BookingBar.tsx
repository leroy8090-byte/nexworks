"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { locations, orea } from "@/data/orea";
import { cn } from "@/lib/utils";
import { Arrow, btnCls } from "./ui";

const iso = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const inDays = (n: number) => iso(new Date(Date.now() + n * 86400000));
const field = "h-14 w-full rounded-lg border-2 border-or-ink/15 bg-white px-3 text-base font-semibold text-or-ink outline-none transition-colors hover:border-or-ink/40 focus:border-or-flame-deep";

/** Le coeur du site : lieu et dates, puis la liste des véhicules avec le prix total. */
export function BookingBar({ className, compact, initial }: { className?: string; compact?: boolean; initial?: { lieu?: string; depart?: string; retour?: string } }) {
  const router = useRouter();
  const [lieu, setLieu] = useState(initial?.lieu || locations[0].key);
  const [depart, setDepart] = useState(initial?.depart || "");
  const [retour, setRetour] = useState(initial?.retour || "");
  const [today, setToday] = useState("");
  const [error, setError] = useState("");

  // Dates calculées chez le visiteur : le serveur ne connaît pas son fuseau horaire.
  useEffect(() => {
    setToday(inDays(0));
    setDepart((d) => d || inDays(1));
    setRetour((r) => r || inDays(4));
  }, []);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!depart || !retour) return setError("Indiquez vos dates de départ et de retour.");
    if (retour <= depart) return setError("La date de retour doit être après la date de départ.");
    setError("");
    router.push(`${orea.basePath}/vehicules?${new URLSearchParams({ lieu, depart, retour })}`);
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Rechercher un véhicule" className={cn("rounded-2xl bg-or-sand p-4 text-or-ink shadow-[0_30px_70px_-20px_rgba(0,0,0,.6)] sm:p-5", className)}>
      <div className={cn("grid gap-3 sm:grid-cols-2", compact ? "lg:grid-cols-[1.4fr_1fr_1fr_auto]" : "lg:grid-cols-[1.5fr_1fr_1fr_auto]")}>
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold">Lieu de départ</span>
          <select value={lieu} onChange={(e) => setLieu(e.target.value)} className={field}>
            {locations.map((l) => <option key={l.key} value={l.key}>{l.name}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold">Départ</span>
          <input type="date" value={depart} min={today} onChange={(e) => setDepart(e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold">Retour</span>
          <input type="date" value={retour} min={depart || today} onChange={(e) => setRetour(e.target.value)} className={field} />
        </label>
        <div className="flex items-end">
          <button type="submit" className={btnCls("flame", "w-full whitespace-nowrap lg:w-auto")}>
            {compact ? "Mettre à jour" : "Voir les véhicules"}
            <Arrow />
          </button>
        </div>
      </div>
      {error && <p role="alert" className="mt-3 text-[15px] font-semibold text-or-flame-deep">{error}</p>}
    </form>
  );
}
