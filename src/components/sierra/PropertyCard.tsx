"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { formatPrice, propertyTypeLabel, sierra, type SierraProperty } from "@/data/sierra";
import { trackPropertyClick } from "./Analytics";
import { CompareButton, FavButton } from "./Extras";

export function PropertyCard({ property }: { property: SierraProperty }) {
  const href = `${sierra.basePath}/biens/${property.slug}`;
  const reduce = useReducedMotion();
  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.35 }}
      className="group overflow-hidden border border-[#E8E4DE] bg-white shadow-[0_10px_30px_-24px_rgba(35,31,49,.45)]"
    >
      <Link
        href={href}
        className="block"
        onClick={() => trackPropertyClick(property.slug, property.title)}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#231F31]">
          <Image
            src={property.images[0]}
            alt={`${property.title} — ${property.city}`}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="bg-[#231F31] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
              {property.transaction === "achat" ? "Vente" : "Location"}
            </span>
            {property.exclusif && (
              <span className="bg-[#A68936] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">Exclusif</span>
            )}
            {property.coupDeCoeur && (
              <span className="bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#231F31]">Coup de cœur</span>
            )}
          </div>
          <div className="absolute right-3 top-3">
            <FavButton slug={property.slug} />
          </div>
        </div>
        <div className="p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A68936]">
            {property.city} · {propertyTypeLabel[property.type]}
          </p>
          <h3 className="mt-2 line-clamp-2 text-[1.05rem] font-semibold leading-snug text-[#231F31] group-hover:text-[#A68936]">
            {property.title}
          </h3>
          <p className="mt-2 text-[13.5px] text-[#7A7684]">
            {property.surface} m²
            {property.rooms ? ` · ${property.rooms} pièces` : ""}
          </p>
          <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#E8E4DE] pt-4">
            <p className="text-[1.05rem] font-bold text-[#231F31]">{formatPrice(property.price, property.transaction)}</p>
            <div className="flex flex-col items-end gap-2">
              <CompareButton slug={property.slug} />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A68936]">Voir →</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
