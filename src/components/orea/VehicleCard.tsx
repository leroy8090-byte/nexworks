import Image from "next/image";
import Link from "next/link";
import { formatEuro, orea, quote, type Vehicle } from "@/data/orea";
import { Arrow } from "./ui";

export function VehicleCard({ v, days, query = "" }: { v: Vehicle; days?: number; query?: string }) {
  const q = days ? quote(v.pricePerDay, days) : null;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white text-or-ink shadow-[0_2px_0_rgba(19,21,24,.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-24px_rgba(19,21,24,.55)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-or-ink">
        <Image src={v.image} alt={v.imageAlt} fill sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 440px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute left-3 top-3 rounded bg-or-ink px-2.5 py-1 text-sm font-bold text-white">{v.categoryLabel}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-4xl">
          <Link href={`${orea.basePath}/vehicules/${v.slug}${query}`} className="after:absolute after:inset-0 after:content-['']">{v.name}</Link>
        </h3>
        <p className="mt-1 text-[15px] text-or-ink/70">{v.tagline}</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
          <li>{v.seats} places</li>
          <li>{`${v.bags} ${v.bags > 1 ? "valises" : "valise"}`}</li>
          <li>{v.transmission}</li>
          <li>{v.energy}</li>
        </ul>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p>
            <span className="font-[family-name:var(--font-orea-display)] text-5xl font-black leading-none">{formatEuro(q ? q.total : v.pricePerDay)}</span>{" "}
            <span className="ml-1 text-sm font-semibold text-or-ink/70">{q ? `pour ${days} ${days === 1 ? "jour" : "jours"}` : "par jour"}</span>
          </p>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-or-ink text-white transition-colors group-hover:bg-or-flame group-hover:text-or-ink" aria-hidden>
            <Arrow className="size-5" />
          </span>
        </div>
      </div>
    </article>
  );
}
