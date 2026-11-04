import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyCard } from "@/components/capital/PropertyCard";
import { CtaBand } from "@/components/capital/Blocks";
import { breadcrumbLd, capitalMeta } from "@/components/capital/seo";
import { Eyebrow, JsonLdScript, Reveal, Wrap, serif } from "@/components/capital/ui";
import { capital, communes, getCommune, properties } from "@/data/capital";

export function generateStaticParams() {
  return communes.map((c) => ({ commune: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ commune: string }> }): Promise<Metadata> {
  const { commune } = await params;
  const c = getCommune(commune);
  if (!c) return {};
  return capitalMeta(`Immobilier à ${c.name} — achat, vente, location`, `${c.tagline} Vendre, acheter ou louer à ${c.name} avec CAPITAL IMMOBILIER, agence de Saint-Raphaël.`, `/secteurs/${c.slug}`);
}

export default async function CommunePage({ params }: { params: Promise<{ commune: string }> }) {
  const { commune } = await params;
  const c = getCommune(commune);
  if (!c) notFound();
  const here = properties.filter((p) => p.commune === c.name);
  const others = communes.filter((x) => x.slug !== c.slug);
  const b = capital.basePath;

  return (
    <>
      <JsonLdScript
        data={breadcrumbLd([
          { name: "Accueil", path: "" },
          { name: `Immobilier à ${c.name}`, path: `/secteurs/${c.slug}` },
        ])}
      />
      <section className="relative isolate flex min-h-[56svh] items-end overflow-hidden bg-[#183B50]">
        <Image src={c.image} alt={c.imageAlt} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#183B50]/85 via-[#183B50]/30 to-[#183B50]/10" />
        <Wrap className="pb-14 pt-32">
          <Eyebrow light>Secteur</Eyebrow>
          <h1 className={`${serif} mt-5 text-[2.8rem] leading-[1.04] text-[#F8F7F3] sm:text-[4.6rem]`}>Immobilier à {c.name}</h1>
          <p className="mt-4 max-w-xl text-[17.5px] text-[#F8F7F3]/85">{c.tagline}</p>
        </Wrap>
      </section>

      <section className="py-20 sm:py-24">
        <Wrap className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <Reveal className="space-y-5 text-[17px] leading-[1.9] text-[#252A2D]/75">
            {c.intro.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={`${serif} text-[1.8rem]`}>Nos services dans ce secteur</h2>
            <ul className="mt-5 border-t border-[#183B50]/20">
              {c.services.map((s) => (
                <li key={s} className="border-b border-[#183B50]/20 py-3.5 text-[15.5px]">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13.5px] leading-relaxed text-[#252A2D]/60">Zone citée sur le site public de l&apos;agence. La disponibilité des services par secteur est à confirmer avec l&apos;agence.</p>
          </Reveal>
        </Wrap>
      </section>

      <section className="bg-[#E8E0D4]/55 py-20 sm:py-24">
        <Wrap>
          <h2 className={`${serif} text-[2.2rem] sm:text-[2.8rem]`}>Biens de démonstration à {c.name}</h2>
          {here.length > 0 ? (
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {here.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          ) : (
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-[#252A2D]/70">Aucun bien de démonstration n&apos;est associé à cette commune.</p>
          )}
          <p className="mt-8 text-[13px] text-[#252A2D]/60">Biens fictifs, présentés à titre d&apos;exemple de fiche.</p>
        </Wrap>
      </section>

      <section className="py-16">
        <Wrap>
          <h2 className={`${serif} text-[1.8rem]`}>Autres secteurs</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`${b}/secteurs/${o.slug}`} className="inline-block rounded-full border border-[#183B50]/30 px-5 py-2.5 text-[14px] text-[#183B50] transition-colors hover:bg-[#183B50] hover:text-[#F8F7F3]">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <CtaBand title={`Un projet à ${c.name} ?`} primary={{ label: "Demander une estimation", href: `${b}/estimation` }} secondary={{ label: "Contacter l'agence", href: `${b}/contact` }} />
    </>
  );
}
