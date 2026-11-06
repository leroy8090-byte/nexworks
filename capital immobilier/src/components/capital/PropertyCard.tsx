"use client";

import Image from "next/image";
import Link from "next/link";
import { capital, formatPrice, roomsSummary, type Property } from "@/data/capital";
import { toggleFavorite, useFavorites } from "./favorites";

export function HeartButton({ reference, title, className = "" }: { reference: string; title: string; className?: string }) {
  const favorites = useFavorites();
  const on = favorites.includes(reference);
  return (
    <button
      type="button"
      onClick={() => toggleFavorite(reference)}
      aria-pressed={on}
      aria-label={on ? `Retirer ${title} des favoris` : `Ajouter ${title} aux favoris`}
      className={`grid size-11 place-items-center rounded-full bg-[#FBF7EE]/95 text-[#B94F33] shadow-md transition-transform duration-300 hover:scale-110 active:scale-90 ${className}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden className={`size-5 transition-all duration-300 ${on ? "scale-110 fill-current" : "fill-none"}`} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M12 20.5S3.5 15.3 3.5 9.2A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 8.5 2.7c0 6.1-8.5 11.3-8.5 11.3Z" />
      </svg>
    </button>
  );
}

export function PropertyCard({ property: p, priority = false, tall = false }: { property: Property; priority?: boolean; tall?: boolean }) {
  const cover = p.images[0];
  const second = p.images[1];
  // Photo large dans un cadre haut : l'image est recadrée sur sa hauteur, il en faut une plus grande pour rester nette.
  const sizes = tall ? "(min-width:1024px) 80vw, 100vw" : "(min-width:1024px) 50vw, (min-width:640px) 80vw, 100vw";
  return (
    <article className="group relative">
      <Link href={`${capital.basePath}/biens/${p.slug}`} className="block" aria-label={`${p.title} à ${p.commune}, consulter le bien`}>
        <div className={`relative overflow-hidden rounded-t-[10rem] bg-[#F0E4CE] ${tall ? "aspect-[4/5]" : "aspect-[5/6]"}`}>
          {cover ? (
            <Image src={cover.src} alt={cover.alt} fill preload={priority} sizes={sizes} className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-[13px] text-[#0E4F68]/60">Photos à venir</span>
          )}
          {/* Au survol, une deuxième photo du bien apparaît. */}
          {second && <Image src={second.src} alt="" fill loading="lazy" sizes={sizes} className="object-cover opacity-0 transition-opacity duration-700 [@media(hover:hover)]:group-hover:opacity-100" />}
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B3A4C]/70 to-transparent" />
          <span className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2 text-[#FBF7EE]">
            <span className="text-[12.5px] font-semibold">{p.typeLabel} · {p.transaction === "vente" ? "À vendre" : "À louer"}</span>
            {p.images.length > 1 && <span className="shrink-0 text-[12.5px] font-semibold">{`${p.images.length} photos`}</span>}
          </span>
        </div>
        <div className="pt-4">
          <p className="font-[family-name:var(--font-cap-serif)] text-[1.65rem] leading-none text-[#B94F33]">{formatPrice(p)}</p>
          <h3 className="mt-2 text-[1.2rem] leading-snug text-[#1F2D33] transition-colors group-hover:text-[#0E4F68]">{p.title}</h3>
          <p className="mt-1 text-[14.5px] text-[#1F2D33]/75"><span className="font-semibold text-[#0E4F68]">{p.commune}</span>{roomsSummary(p) ? ` · ${roomsSummary(p)}` : ""}</p>
        </div>
      </Link>
      <HeartButton reference={p.ref} title={p.title} className="absolute right-3 top-[34%]" />
    </article>
  );
}
