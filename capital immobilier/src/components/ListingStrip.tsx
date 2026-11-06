import Link from "next/link";
import { priceLabel, type Card } from "@/lib/filter";
import { Photo } from "./Photo";

/** Tous les biens de l'agence glissent en deux rangées quand on descend. La page défile normalement, chaque photo ouvre sa fiche. */
export function ListingStrip({ cards }: { cards: Card[] }) {
  const half = Math.ceil(cards.length / 2);
  const row = (list: Card[], cls: string) => (
    <div className="strip strip-scroll">
      <ul className={`${cls} flex w-max gap-3`}>
        {list.map((p) => p.photos[0] && (
          <li key={p.id} className="shrink-0">
            <Link href={`/biens/${p.slug}`} aria-label={`${p.title}, ${p.commune}`} className="group relative block h-[13.5rem] w-[20rem] overflow-hidden bg-ink-soft sm:h-[20rem] sm:w-[30rem]">
              <span className="zoom absolute inset-0 block"><Photo src={p.photos[0]} alt="" fill sizes="(min-width:640px) 480px, 320px" className="object-cover" /></span>
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
              <span className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3 text-white">
                <span className="min-w-0 truncate text-[1.25rem] [font-family:var(--font-display)]">{p.commune}</span>
                <span className="shrink-0 text-[14.5px]">{priceLabel(p)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <section aria-label="Tous nos biens en photos" className="space-y-3 overflow-hidden py-3">
      {row(cards.slice(0, half), "glide-left")}
      {row(cards.slice(half), "glide-right")}
    </section>
  );
}
