"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent, type PointerEvent, type TouchEvent } from "react";
import { priceLabel, surfaceLabel, type Card } from "@/lib/filter";
import { toggleFavorite, useFavorites } from "./favorites";
import { Photo } from "./Photo";

export function Heart({ id, title, className = "absolute right-3 top-3 z-10" }: { id: string; title: string; className?: string }) {
  const on = useFavorites().includes(id);
  return (
    <button type="button" onClick={() => toggleFavorite(id)} aria-pressed={on} aria-label={on ? `Retirer « ${title} » de mes favoris` : `Ajouter « ${title} » à mes favoris`} className={`grid size-11 place-items-center rounded-full bg-white/90 text-night backdrop-blur-sm transition-colors hover:bg-white ${className}`}>
      <svg key={String(on)} viewBox="0 0 24 24" aria-hidden className={`size-[18px] ${on ? "heart-pop fill-current" : "fill-none"}`} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M12 20.5S3.5 15.3 3.5 9.2A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 8.5 2.7c0 6.1-8.5 11.3-8.5 11.3Z" /></svg>
    </button>
  );
}

/**
 * Une annonce réelle. On parcourt ses photos sans ouvrir la fiche : à la souris en la déplaçant, au doigt en balayant.
 */
export function PropertyCard({ property: p, frame = "aspect-[4/3]", sizes = "(min-width:1024px) 32vw, (min-width:640px) 50vw, 70vw", large, priority }: { property: Card; frame?: string; sizes?: string; large?: boolean; priority?: boolean }) {
  const [i, setI] = useState(0);
  const [armed, setArmed] = useState(false);
  const touch = useRef<{ x: number; moved: boolean } | null>(null);
  const imgs = p.photos;
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    if (imgs.length > 1) setI(Math.min(imgs.length - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * imgs.length))));
  };
  const onTouchStart = (e: TouchEvent) => { setArmed(true); touch.current = { x: e.touches[0].clientX, moved: false }; };
  const onTouchEnd = (e: TouchEvent) => {
    if (!touch.current || imgs.length < 2) return;
    const d = e.changedTouches[0].clientX - touch.current.x;
    if (Math.abs(d) > 35) { touch.current.moved = true; setI((v) => (d < 0 ? (v + 1) % imgs.length : (v - 1 + imgs.length) % imgs.length)); }
  };
  const onClick = (e: MouseEvent) => { if (touch.current?.moved) e.preventDefault(); touch.current = null; };
  const place = p.commune + (p.postalCode ? ` (${p.postalCode.slice(0, 2)})` : "");
  return (
    <article className="group relative">
      <Link href={`/biens/${p.slug}`} onClick={onClick} className="block" aria-label={`${p.title}, ${p.commune} : consulter l’annonce`}>
        <div onPointerEnter={() => setArmed(true)} onPointerMove={onMove} onPointerLeave={() => setI(0)} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className={`zoom relative touch-pan-y overflow-hidden bg-sand ${frame}`}>
          {imgs[0] && <Photo src={imgs[0]} alt={`${p.title}, ${p.commune}`} fill preload={priority} sizes={sizes} className="object-cover" />}
          {armed && imgs.slice(1).map((src, k) => <Photo key={src} src={src} alt="" fill sizes={sizes} className={`object-cover transition-opacity duration-500 ${i === k + 1 ? "opacity-100" : "opacity-0"}`} />)}
          {imgs.length > 1 && (
            <span aria-hidden className="absolute inset-x-3 bottom-3 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
              {imgs.map((src, k) => <span key={src} className={`h-[2px] flex-1 rounded-full shadow-[0_0_4px_rgba(0,0,0,.4)] transition-colors duration-300 ${k === i ? "bg-white" : "bg-white/45"}`} />)}
            </span>
          )}
        </div>
        <div className="pt-4">
          <p className="text-[14px] text-muted">{p.type} · {place}</p>
          <h3 className={`mt-1 leading-[1.14] text-night ${large ? "text-[2.1rem]" : "text-[1.55rem]"}`}><span className="line-link">{p.title}</span></h3>
          <p className="mt-2 text-[19px] font-bold tracking-[-0.01em] text-sea">{priceLabel(p)}</p>
          <p className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 text-[14.5px] text-muted">
            <span>{[p.surface != null && surfaceLabel(p.surface), p.rooms != null && `${p.rooms} ${p.rooms > 1 ? "pièces" : "pièce"}`].filter(Boolean).join(" · ")}</span>
            <span className="inline-flex items-center gap-1.5 text-night">Consulter l’annonce <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span></span>
          </p>
        </div>
      </Link>
      <Heart id={p.id} title={p.title} />
    </article>
  );
}
