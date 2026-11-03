import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/sierra/Forms";
import { PropertyCard } from "@/components/sierra/PropertyCard";
import { PropertyGallery } from "@/components/sierra/PropertyGallery";
import { Wrap } from "@/components/sierra/ui";
import { formatPrice, getSierraProperty, propertyTypeLabel, sierra, sierraProperties } from "@/data/sierra";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return sierraProperties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = getSierraProperty(slug);
  if (!p) return { title: "Bien introuvable" };
  return {
    title: `${p.title} — ${p.city} (démonstration)`,
    description: `${p.tagline} Fiche de démonstration — non commerciale.`,
  };
}

export default async function BienDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const p = getSierraProperty(slug);
  if (!p) notFound();
  const similar = sierraProperties.filter((x) => x.slug !== p.slug && x.city === p.city).slice(0, 3);

  return (
    <Wrap className="py-10 sm:py-14">
      <nav aria-label="Fil d'Ariane" className="mb-8 text-[12.5px] text-[#77766F]">
        <Link href={sierra.basePath} className="hover:text-[#222421]">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <Link href={`${sierra.basePath}/biens`} className="hover:text-[#222421]">
          Biens
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#222421]">{p.title}</span>
      </nav>

      <PropertyGallery images={p.images} title={p.title} />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#263B48]">
            {p.transaction === "achat" ? "Vente" : "Location"} · Démonstration · {propertyTypeLabel[p.type]}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-sierra-display)] text-[2.8rem] font-light leading-tight text-[#222421] sm:text-[3.4rem]">
            {p.title}
          </h1>
          <p className="mt-3 text-[16px] text-[#77766F]">
            {p.city} · {p.surface} m² · {p.rooms} pièces · {p.bedrooms} chambres
          </p>
          <p className="mt-5 text-[1.5rem] font-semibold text-[#222421]">{formatPrice(p.price, p.transaction)}</p>
          <p className="mt-6 max-w-2xl text-[16px] leading-[1.85] text-[#77766F]">{p.tagline}</p>
          <div className="mt-8 space-y-4">
            {p.description.map((para) => (
              <p key={para.slice(0, 24)} className="max-w-2xl text-[15.5px] leading-[1.85] text-[#77766F]">
                {para}
              </p>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {p.features.map((f) => (
              <li key={f} className="border border-[#D8C9B5] bg-[#FCFBF8] px-3 py-1.5 text-[12.5px] text-[#222421]">
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded border border-[#D8C9B5] bg-[#FCFBF8] p-4 text-[13.5px] leading-relaxed text-[#77766F]">
            DPE / informations juridiques : non inventés sur cette démonstration. Pour une fiche réelle, consultez{" "}
            <a href={sierra.officialSite} target="_blank" rel="noopener noreferrer" className="underline">
              sierra-immo.fr
            </a>
            .
          </p>
        </div>
        <aside className="border border-[#D8C9B5] bg-[#FCFBF8] p-6 sm:p-8 lg:sticky lg:top-36 lg:self-start">
          <h2 className="font-[family-name:var(--font-sierra-display)] text-[1.8rem] font-light text-[#222421]">Demande d&apos;information</h2>
          <p className="mt-2 text-[13.5px] text-[#77766F]">Formulaire de démonstration — aucun envoi réel.</p>
          <div className="mt-6">
            <ContactForm bien={p.title} />
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="font-[family-name:var(--font-sierra-display)] text-[2.2rem] font-light text-[#222421]">Biens similaires (démo)</h2>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => (
              <PropertyCard key={s.slug} property={s} />
            ))}
          </div>
        </section>
      )}
    </Wrap>
  );
}
