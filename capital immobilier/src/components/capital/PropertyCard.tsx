import Image from "next/image";
import Link from "next/link";
import { capital, formatPrice, roomsSummary, type Property } from "@/data/capital";

export function PropertyCard({ property: p, priority = false, tall = false }: { property: Property; priority?: boolean; tall?: boolean }) {
  const cover = p.images[0];
  return (
    <article className="group">
      <Link href={`${capital.basePath}/biens/${p.slug}`} className="block" aria-label={`${p.title} à ${p.commune} — consulter le bien`}>
        <div className={`relative overflow-hidden bg-[#E8E0D4] ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              priority={priority}
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-[13px] text-[#183B50]/60">Photos à venir</span>
          )}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
            <span className="bg-[#F8F7F3]/95 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#183B50]">
              {p.typeLabel} · {p.transaction === "vente" ? "À vendre" : "À louer"}
            </span>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-[family-name:var(--font-cap-serif)] text-[1.55rem] leading-tight text-[#252A2D]">{p.title}</h3>
          </div>
          <p className="mt-1.5 text-[13px] font-medium uppercase tracking-[0.16em] text-[#183B50]">{p.commune}</p>
          <p className="mt-4 text-[13.5px] text-[#252A2D]/65">{roomsSummary(p)}</p>
          <div className="mt-4 flex items-center justify-between border-t border-[#E8E0D4] pt-4">
            <p className="font-[family-name:var(--font-cap-serif)] text-[1.5rem] text-[#183B50]">{formatPrice(p)}</p>
            <span className="text-[12.5px] font-semibold text-[#183B50] transition-transform duration-300 group-hover:translate-x-1">Consulter →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
