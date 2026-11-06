"use client";

import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import { Photo } from "./Photo";

type S = { title: string; text: string; href: string; image: string; alt: string };

/** Les métiers en grandes lignes : le rouge monte au survol, et la photo suit la souris. Sur téléphone, chaque ligne a sa photo. */
export function ServiceRows({ items }: { items: S[] }) {
  const [on, setOn] = useState<number | null>(null);
  const float = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || !float.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.width - 384 - 70 + (e.clientX - r.left - r.width / 2) * 0.05;
    float.current.style.transform = `translate(${x}px, ${e.clientY - r.top - 136}px)`;
  };
  return (
    <div className="relative">
      <ul onPointerMove={move} onPointerLeave={() => setOn(null)} className="border-t border-white/20">
        {items.map((s, i) => (
          <li key={s.title} onPointerEnter={() => setOn(i)} className="border-b border-white/20">
            <Link href={s.href} onFocus={() => setOn(i)} onBlur={() => setOn(null)} className="row-fill group relative grid items-center gap-4 overflow-hidden py-5 sm:grid-cols-[4rem_7rem_minmax(0,1fr)_2rem] sm:gap-7 sm:px-3 sm:py-6">
              <span className="relative hidden text-[14px] tabular-nums text-white/60 transition-colors group-hover:text-white sm:block">{String(i + 1).padStart(2, "0")}</span>
              <span className="relative block aspect-[16/9] overflow-hidden bg-ink-soft sm:aspect-[4/3]"><Photo src={s.image} alt={s.alt} fill sizes="(min-width:640px) 112px, 100vw" className="object-cover" /></span>
              <span className="relative min-w-0">
                <span className="block text-[1.75rem] font-bold uppercase leading-[1.02] tracking-[-0.02em] text-white transition-transform duration-500 [font-family:var(--font-display)] group-hover:translate-x-2 sm:text-[3rem]">{s.title}</span>
                <span className="mt-1.5 block max-w-2xl text-[16px] leading-[1.55] text-white/70 transition-colors group-hover:text-white">{s.text}</span>
              </span>
              <span aria-hidden className="relative hidden text-[24px] text-white transition-transform duration-500 group-hover:translate-x-1 sm:block">→</span>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={float} aria-hidden className="pointer-events-none absolute left-0 top-0 z-20 hidden transition-transform duration-200 ease-out lg:block">
        <div className={`relative h-[17rem] w-[24rem] overflow-hidden shadow-2xl transition-all duration-500 ${on === null ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}>
          {items.map((s, i) => <Photo key={s.title} src={s.image} alt="" fill sizes="384px" className={`object-cover transition-opacity duration-300 ${on === i ? "opacity-100" : "opacity-0"}`} />)}
        </div>
      </div>
    </div>
  );
}
