"use client";

import Link from "next/link";
import type { Card } from "@/lib/filter";
import { useFavorites } from "./favorites";
import { PropertyCard } from "./PropertyCard";

export function FavoritesList({ cards }: { cards: Card[] }) {
  const favs = useFavorites();
  const list = cards.filter((c) => favs.includes(c.id));
  if (!list.length) {
    return (
      <div className=" bg-white p-10 text-center sm:p-14">
        <p className="text-[2rem] leading-tight text-night [font-family:var(--font-display)]">Vous n’avez pas encore de favori.</p>
        <p className="mx-auto mt-3 max-w-md text-[16.5px] leading-relaxed text-muted">Touchez le cœur sur une annonce pour la retrouver ici. Vos favoris restent dans ce navigateur.</p>
        <Link href="/biens" className="mt-6 inline-grid min-h-[3.3rem] place-items-center bg-night px-7 text-[15px] font-medium text-white hover:bg-sea">Découvrir nos biens</Link>
      </div>
    );
  }
  return <ul className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <li key={p.id}><PropertyCard property={p} /></li>)}</ul>;
}
