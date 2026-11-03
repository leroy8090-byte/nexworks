import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/sierra/Forms";
import { PropertyCard } from "@/components/sierra/PropertyCard";
import { PropertyGallery } from "@/components/sierra/PropertyGallery";
import { Wrap } from "@/components/sierra/ui";
import { SierraPropertyViewTracker } from "@/components/sierra/Analytics";
import { formatPrice, propertyTypeLabel, sierra } from "@/data/sierra";
import { getBySlug, listPublished } from "@/lib/sierra-cms";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBySlug(slug);
  if (!p) return { title: "Bien introuvable" };
  return {
    title: `${p.title} — ${p.city} (démonstration)`,
    description: `${p.tagline} Fiche de démonstration — non commerciale.`,
  };
}

export default async function BienDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const p = await getBySlug(slug);
  if (!p) notFound();
  const similar = (await listPublished()).filter((x) => x.slug !== p.slug && x.city === p.city).slice(0, 3);

  return (
    <Wrap className="py-10 sm:py-14">
      <SierraPropertyViewTracker slug={p.slug} title={p.title} />
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
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A68936]">
            {p.transaction === "achat" ? "Vente" : "Location"} · {propertyTypeLabel[p.type]}
            {p.exclusif ? " · Exclusif" : ""}
          </p>
          <h1 className="mt-3 text-[2.2rem] font-semibold leading-tight tracking-[-0.02em] text-[#231F31] sm:text-[3rem]">
            {p.title}
          </h1>
          <p className="mt-3 text-[16px] text-[#7A7684]">
            {p.city} · {p.surface} m²{p.rooms ? ` · ${p.rooms} pièces` : ""}
          </p>
          <p className="mt-5 text-[1.55rem] font-bold text-[#231F31]">{formatPrice(p.price, p.transaction)}</p>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-[#7A7684]">{p.tagline}</p>
          <div className="mt-8 space-y-4">
            {p.description.map((para) => (
              <p key={para.slice(0, 24)} className="max-w-2xl text-[15px] leading-[1.85] text-[#7A7684]">
                {para}
              </p>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {p.features.map((f) => (
              <li key={f} className="border border-[#E8E4DE] bg-white px-3 py-1.5 text-[12.5px] text-[#231F31]">
                {f}
              </li>
            ))}
          </ul>
          {p.officialUrl ? (
            <a
              href={p.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex bg-[#A68936] px-6 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-white hover:bg-[#231F31]"
            >
              Voir l&apos;annonce officielle
            </a>
          ) : null}
          <p className="mt-6 rounded border border-[#E8E4DE] bg-[#F4F2F0] p-4 text-[13px] leading-relaxed text-[#7A7684]">
            Proposition de refonte : disponibilité et détails juridiques à vérifier sur sierra-immo.fr. DPE non inventé ici.
          </p>
        </div>
        <aside className="border border-[#E8E4DE] bg-white p-6 sm:p-8 lg:sticky lg:top-36 lg:self-start">
          <h2 className="text-[1.4rem] font-semibold text-[#231F31]">Demande d&apos;information</h2>
          <p className="mt-2 text-[13.5px] text-[#7A7684]">
            Formulaire de démonstration — aucun envoi réel. Préférez le téléphone de l&apos;agence pour un contact officiel.
          </p>
          <div className="mt-6">
            <ContactForm bien={p.title} />
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="text-[1.8rem] font-semibold text-[#231F31]">Biens similaires</h2>
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
