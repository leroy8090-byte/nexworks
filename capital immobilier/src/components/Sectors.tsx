"use client";

import { Photo as Image } from "./Photo";
import Link from "next/link";
import { useState } from "react";

type S = { slug: string; name: string; image: string; alt: string; text: string; count: number };

/** Les secteurs : la grande photo suit le nom survolé. Sur téléphone, chaque secteur a sa photo. */
export function Sectors({ items }: { items: S[] }) {
  const [on, setOn] = useState(0);
  const link = (s: S) => `/secteurs/${s.slug}`;
  const label = (s: S) => (s.count > 0 ? `${s.count} ${s.count > 1 ? "annonces" : "annonce"}` : "Découvrir");
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <ul className="border-t border-night/20">
        {items.map((s, i) => (
          <li key={s.slug} className="border-b border-rule" onPointerEnter={() => setOn(i)}>
            <Link href={link(s)} onFocus={() => setOn(i)} className="group block py-4 lg:py-5">
              <span className="relative mb-4 block aspect-[16/9] overflow-hidden bg-sand lg:hidden"><Image src={s.image} alt="" fill sizes="100vw" className="object-cover" /></span>
              <span className="flex items-baseline justify-between gap-5">
                <span className={`text-[2rem] font-bold uppercase leading-tight transition-all duration-500 lg:group-hover:translate-x-3 lg:group-hover:text-sea [font-family:var(--font-display)] sm:text-[2.7rem] ${on === i ? "text-night" : "text-night lg:text-night/55"}`}>{s.name}</span>
                <span className="shrink-0 text-[14.5px] text-muted">{label(s)} <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span></span>
              </span>
              <span className={`block overflow-hidden text-[16px] leading-relaxed text-muted transition-all duration-500 lg:max-h-0 lg:opacity-0 ${on === i ? "lg:mt-1 lg:max-h-20 lg:opacity-100" : ""}`}>{s.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="relative hidden min-h-[36rem] overflow-hidden bg-sand lg:block">
        {items.map((s, i) => <Image key={s.slug} src={s.image} alt={i === on ? s.alt : ""} fill sizes="56vw" quality={85} className={`object-cover transition-all duration-[1000ms] ${on === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`} />)}
        <p className="absolute bottom-5 left-5 bg-sea px-3 py-1.5 text-[14px] font-semibold text-white">{items[on].name}</p>
      </div>
    </div>
  );
}
