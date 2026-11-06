"use client";

import { AnimatePresence, motion } from "framer-motion";
import { capital, type Property } from "@/data/capital";
import { useFavorites } from "./favorites";
import { PropertyCard } from "./PropertyCard";
import { CapButton } from "./ui";

export function FavoritesList({ properties }: { properties: Property[] }) {
  const favorites = useFavorites();
  const list = properties.filter((p) => favorites.includes(p.ref));
  if (!list.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-[#0E4F68]/30 p-10 text-center sm:p-16">
        <p className="font-[family-name:var(--font-cap-serif)] text-[2rem] leading-tight">Aucun favori pour l&apos;instant.</p>
        <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-[#1F2D33]/75">Touchez le cœur sur un bien pour le retrouver ici.</p>
        <CapButton href={`${capital.basePath}/biens`} className="mt-7">Voir les biens</CapButton>
      </div>
    );
  }
  return (
    <ul className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout" initial={false}>
        {list.map((p) => (
          <motion.li key={p.ref} layout="position" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
            <PropertyCard property={p} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
