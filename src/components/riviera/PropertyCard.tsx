import Image from "next/image";
import Link from "next/link";
import { formatPrice, propertyTypeLabel, riviera, type Property } from "@/data/riviera";

export function PropertyCard({ property: p, priority = false }: { property: Property; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`${riviera.basePath}/proprietes/${p.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#D9CBB7]">
          <Image
            src={p.images[0]}
            alt={`${p.title} à ${p.city}`}
            fill
            priority={priority}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
          <span className="absolute left-4 top-4 bg-[#FFFEFA]/90 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#24251F]">
            {propertyTypeLabel[p.type]}
          </span>
        </div>
        <div className="border-b border-[#D9CBB7] pb-6 pt-5">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.24em] text-[#68715B]">{p.city}</p>
          <h3 className="mt-2 font-[family-name:var(--font-riviera-display)] text-[1.7rem] font-normal leading-tight text-[#24251F]">
            {p.title}
          </h3>
          <p className="mt-3 text-[13.5px] text-[#858178]">
            {p.surface} m² · {p.bedrooms} chambres · {p.bathrooms} salles de bain
          </p>
          <p className="mt-4 flex items-center justify-between text-[15px] font-semibold text-[#24251F]">
            {formatPrice(p.price)}
            <span className="text-[11.5px] font-medium uppercase tracking-[0.18em] text-[#68715B] transition-transform group-hover:translate-x-1">
              Découvrir →
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}
