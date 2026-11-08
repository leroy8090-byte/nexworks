import Link from "next/link";
import { num, priceText, typeLabel } from "@/data/localized";
import { type Property } from "@/data/properties";
import { localePath, type Lang } from "@/i18n/config";
import { Photo } from "./Photo";
import { SaveButton } from "./Selection";

const T = {
  fr: { rent: "Location saisonnière", newDev: "Programme neuf · perspective", land: "terrain", beds: "chambres", sea: "vue mer", in: "à" },
  en: { rent: "Seasonal rental", newDev: "New development · rendering", land: "plot", beds: "bedrooms", sea: "sea view", in: "in" },
};

/**
 * Une carte de bien, épurée : la photo sans surcharge, puis le lieu, le nom, les chiffres et le prix.
 * Au survol, une deuxième vue du bien remplace la première : on découvre la maison avant même de cliquer.
 */
export function PropertyCard({ p, lang, sizes = "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw", tall, eager }: { p: Property; lang: Lang; sizes?: string; tall?: boolean; eager?: boolean }) {
  const t = T[lang];
  const second = p.images[1] ?? p.images[0];
  const price = priceText(p, lang);
  return (
    <article className="group relative">
      <Link href={localePath(lang, `/proprietes/${p.slug}`)} className="block" aria-label={`${p.name}, ${typeLabel(p.type, lang).toLowerCase()} ${t.in} ${p.city}, ${price}`}>
        <div className={`relative overflow-hidden bg-paper ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
          <Photo src={p.images[0].src} alt={p.images[0].alt} fill sizes={sizes} loading={eager ? "eager" : undefined} className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-0" />
          <Photo src={second.src} alt="" fill sizes={sizes} loading={eager ? "eager" : undefined} className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" />
          <span className="absolute top-4 left-4 bg-white px-3 py-1.5 text-[10px] font-medium tracking-[0.22em] text-ink uppercase">{p.transaction === "location" ? t.rent : p.render ? t.newDev : typeLabel(p.type, lang)}</span>
        </div>
        <p className="caps mt-5 text-[10px] text-pave-dark">{p.city} · {p.sector}</p>
        <h3 className="mt-2 text-[1.65rem] leading-tight text-ink">{p.name}</h3>
        <p className="mt-2 text-[14px] text-muted">{p.surface} m²{p.land ? ` · ${t.land} ${num(p.land, lang)} m²` : ""} · {p.bedrooms} {t.beds}{p.seaView ? ` · ${t.sea}` : ""}</p>
        <p className="tabular mt-3 text-[15px] font-medium text-ink"><span className="line">{price}</span></p>
      </Link>
      <SaveButton slug={p.slug} name={p.name} lang={lang} className="absolute top-3 right-3 z-10 flex size-10 rounded-full bg-white text-ink" />
    </article>
  );
}
