import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { categories, formatEuro, getVehicle, orea, vehicles } from "@/data/orea";
import { Arrow, Sign, Wrap } from "./ui";

/** Une mosaïque par catégorie : nombre de modèles et premier prix, pour choisir d'un coup d'oeil. */
export function CategoryStrip() {
  return (
    <section className="bg-or-sand py-20 text-or-ink sm:py-28">
      <Wrap>
        <Sign>Le catalogue</Sign>
        <h2 className="mt-4 max-w-4xl text-[clamp(3rem,7vw,6.5rem)]">Commencez par votre envie.</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-or-ink/80">160 véhicules répartis en 8 catégories, de la petite citadine à la voiture d&apos;exception.</p>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((c, i) => {
            const count = vehicles.filter((v) => v.category === c.key).length;
            const from = getVehicle(c.from)?.pricePerDay ?? 0;
            return (
              <li key={c.key}>
                <Reveal delay={Math.min(i, 3) * 0.05} y={30}>
                  <Link href={`${orea.basePath}/vehicules?categorie=${c.key}`} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-or-ink sm:aspect-[4/3] lg:aspect-[4/5]">
                    <Image src={c.image} alt="" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-or-ink via-or-ink/25 to-transparent" />
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-or-flame transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white lg:p-5">
                      <span className="min-w-0">
                        <span className="block font-[family-name:var(--font-orea-display)] text-3xl font-black uppercase leading-none lg:text-5xl">{c.label}</span>
                        <span className="mt-1 block text-sm font-semibold text-white/90">{`${count} modèles, dès ${formatEuro(from)} par jour`}</span>
                      </span>
                      <span aria-hidden className="hidden size-11 shrink-0 translate-x-3 items-center justify-center rounded-lg bg-or-flame text-or-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:flex">
                        <Arrow />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Wrap>
    </section>
  );
}
