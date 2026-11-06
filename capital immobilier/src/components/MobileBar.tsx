import Link from "next/link";
import { agency } from "@/data/agency";

/** Sur téléphone : appeler ou estimer, à portée de pouce, sans masquer le contenu (le pied de page garde sa marge). */
export function MobileBar() {
  return (
    <div data-mobile-bar className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-rule bg-white sm:hidden">
      <a href={`tel:${agency.phoneHref}`} className="grid h-14 place-items-center text-[15px] text-night">Appeler l’agence</a>
      <Link href="/estimation" className="grid h-14 place-items-center bg-sea text-[15px] font-semibold text-white">Estimer mon bien</Link>
    </div>
  );
}
