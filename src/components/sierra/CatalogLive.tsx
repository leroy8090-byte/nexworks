"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PropertyCard } from "@/components/sierra/PropertyCard";
import { filterSierraProperties, sierra, sortSierraProperties, type SierraProperty } from "@/data/sierra";
import { pickNewerCms, readLocalCms, writeLocalCms } from "@/lib/sierra-client-store";

async function loadCatalog(): Promise<SierraProperty[]> {
  let api: { updatedAt?: string; properties?: SierraProperty[] } | null = null;
  try {
    const res = await fetch("/api/sierra-cms", { cache: "no-store" });
    if (res.ok) api = await res.json();
  } catch {
    /* ignore */
  }
  const local = readLocalCms();
  const chosen = pickNewerCms(
    api ? { updatedAt: api.updatedAt || new Date(0).toISOString(), properties: api.properties || [] } : null,
    local,
  );
  const list = (chosen?.properties || api?.properties || []) as SierraProperty[];
  // Si le cache navigateur est plus récent (ex: suppression admin), pousse vers l'API si connecté
  if (local && api && Date.parse(local.updatedAt) > Date.parse(api.updatedAt || "")) {
    void fetch("/api/sierra-cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ properties: local.properties }),
    }).catch(() => undefined);
  } else if (api?.properties) {
    writeLocalCms(api.properties, api.updatedAt);
  }
  return list.filter((p) => (p as { published?: boolean }).published !== false);
}

export function FeaturedLive({ initial }: { initial: SierraProperty[] }) {
  const [list, setList] = useState(initial.filter((p) => p.transaction === "achat").slice(0, 6));
  useEffect(() => {
    loadCatalog().then((all) => setList(all.filter((p) => p.transaction === "achat").slice(0, 6)));
  }, []);
  if (list.length === 0) {
    return (
      <p className="mt-10 text-center text-[15px] text-[#7A7684]">
        Aucun bien publié —{" "}
        <Link href={`${sierra.basePath}/admin`} className="text-[#A68936] underline">
          ouvrir le back-office
        </Link>
      </p>
    );
  }
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p) => (
        <PropertyCard key={p.slug} property={p} />
      ))}
    </div>
  );
}

type SearchValues = {
  transaction: string;
  location: string;
  type: string;
  budgetMin: string;
  budgetMax: string;
  rooms: string;
};

export function BiensLive({
  initial,
  search,
  sort,
}: {
  initial: SierraProperty[];
  search: SearchValues;
  sort: "price-asc" | "price-desc" | "surface-desc" | "surface-asc";
}) {
  const [catalog, setCatalog] = useState(initial);

  useEffect(() => {
    loadCatalog().then(setCatalog);
  }, []);

  const filtered = sortSierraProperties(
    filterSierraProperties(
      {
        transaction: search.transaction || undefined,
        location: search.location || undefined,
        type: search.type || undefined,
        budgetMin: search.budgetMin ? Number(search.budgetMin) : undefined,
        budgetMax: search.budgetMax ? Number(search.budgetMax) : undefined,
        rooms: search.rooms ? Number(search.rooms) : undefined,
      },
      catalog,
    ),
    sort,
  );

  if (filtered.length === 0) {
    return (
      <div className="mt-16 border border-dashed border-[#D8C9B5] bg-white p-12 text-center">
        <p className="text-[2rem] font-light text-[#231F31]">Aucun résultat</p>
        <p className="mt-3 text-[15px] text-[#7A7684]">Élargissez vos critères ou gérez le catalogue dans le back-office.</p>
        <Link
          href={`${sierra.basePath}/admin`}
          className="mt-6 inline-block text-[12px] font-semibold uppercase tracking-[0.16em] text-[#A68936] underline underline-offset-4"
        >
          Ouvrir le back-office
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mt-8 text-[14px] text-[#7A7684]">
        {filtered.length} bien{filtered.length > 1 ? "s" : ""}
      </p>
      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PropertyCard key={p.slug} property={p} />
        ))}
      </div>
    </>
  );
}
