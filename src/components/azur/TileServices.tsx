import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { azur, azurServices } from "@/data/azur";
import { Arrow, Picto } from "./ui";

/** Les services, comme un mur de carreaux émaillés. Au survol, le carreau se retourne. */
export function TileServices() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {azurServices.map((s, i) => (
        <li key={s.slug}>
          <Reveal delay={(i % 3) * 0.07} y={30}>
            <Link href={s.href ?? `${azur.basePath}/services/${s.slug}`} className="az-flip group block rounded-[18px] [--h:19rem] sm:[--h:23rem]" style={{ height: "var(--h)" }}>
              <span className="az-flip-inner block">
                <span className="az-flip-face flex flex-col justify-between overflow-hidden rounded-[18px] border-2 border-az-ink bg-az-cobalt p-6 text-white [--plaque-bg:#1538b5] sm:p-7">
                  <span className="flex items-start justify-between">
                    <span className="az-display flex size-14 items-center justify-center rounded-full border-[3px] border-white text-3xl">{s.n}</span>
                    <Picto name={s.picto} className="size-16 sm:size-20" />
                  </span>
                  <span>
                    <span className="az-display block text-[2.6rem] sm:text-[3.1rem]">{s.title}</span>
                    {/* Sur téléphone, pas de survol : le texte est toujours affiché. */}
                    <span className="mt-2 block text-[16px] leading-relaxed text-white/90 [@media(hover:hover)]:hidden">{s.short}</span>
                  </span>
                </span>
                <span className="az-flip-face az-flip-back flex flex-col justify-between overflow-hidden rounded-[18px] border-2 border-az-ink bg-az-brass p-6 text-az-ink sm:p-7">
                  <span className="az-display block text-[2.1rem]">{s.title}</span>
                  <span>
                    <span className="block text-lg font-medium leading-snug">{s.short}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-base font-bold">Voir ce service<Arrow /></span>
                  </span>
                </span>
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
