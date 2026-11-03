"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, propertyTypeLabel, sierra, type SierraProperty } from "@/data/sierra";

export function PropertyCard({ property }: { property: SierraProperty }) {
  const href = `${sierra.basePath}/biens/${property.slug}`;
  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#D8C9B5]">
          <Image
            src={property.images[0]}
            alt={`${property.title} — ${property.city} (démonstration)`}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="bg-[#FCFBF8]/95 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#222421]">
              {property.transaction === "achat" ? "Vente" : "Location"}
            </span>
            <span className="bg-[#263B48]/90 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#FCFBF8]">
              Démo
            </span>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#263B48]">
            {property.city} · {propertyTypeLabel[property.type]}
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-sierra-display)] text-[1.75rem] font-light leading-tight text-[#222421] transition-colors group-hover:text-[#263B48]">
            {property.title}
          </h3>
          <p className="mt-2 text-[14px] text-[#77766F]">
            {property.surface} m² · {property.rooms} pièces · {property.bedrooms} ch.
          </p>
          <p className="mt-3 text-[15px] font-semibold tracking-wide text-[#222421]">{formatPrice(property.price, property.transaction)}</p>
          <span className="mt-4 inline-block text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#263B48] underline-offset-8 group-hover:underline">
            Découvrir
          </span>
        </div>
      </Link>
    </article>
  );
}
