import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { capital, communes, formatPrice, getProperty, properties, propertyTypeLabel, similarProperties } from "@/data/capital";
import { ContactForm } from "@/components/capital/Forms";
import { PropertyCard } from "@/components/capital/PropertyCard";
import { PropertyGallery } from "@/components/capital/PropertyGallery";
import { breadcrumbLd, capitalMeta } from "@/components/capital/seo";
import { CapButton, DemoNotice, JsonLdScript, Reveal, serif, Wrap } from "@/components/capital/ui";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) return {};
  return capitalMeta(`${p.title} à ${p.commune} (bien de démonstration)`, `${p.tagline} Bien de démonstration : ${p.surface} m², ${p.rooms} pièces à ${p.commune}.`, `/biens/${p.slug}`);
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) notFound();
  const similar = similarProperties(p);
  const commune = communes.find((c) => c.name === p.commune);
  const bien = `${p.title} — ${p.commune} (${p.ref})`;
  const facts: [string, string][] = [
    ["Type", propertyTypeLabel[p.type]],
    ["Surface habitable", `${p.surface} m²`],
    ["Pièces", String(p.rooms)],
    ["Chambres", p.bedrooms > 0 ? String(p.bedrooms) : "Studio"],
    ["Salles d'eau", String(p.bathrooms)],
    ["Référence", p.ref],
  ];

  return (
    <>
      <JsonLdScript
        data={breadcrumbLd([
          { name: "Accueil", path: "" },
          { name: "Nos biens", path: "/biens" },
          { name: p.title, path: `/biens/${p.slug}` },
        ])}
      />
      <Wrap className="pt-8">
        <nav aria-label="Fil d'Ariane" className="text-[13px] text-[#252A2D]/65">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href={capital.basePath} className="hover:text-[#183B50]">
                Accueil
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`${capital.basePath}/${p.transaction === "vente" ? "acheter" : "louer"}`} className="hover:text-[#183B50]">
                {p.transaction === "vente" ? "Acheter" : "Louer"}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-[#252A2D]">
              {p.title}
            </li>
          </ol>
        </nav>
        <DemoNotice className="mt-5" />
      </Wrap>

      <Wrap className="grid gap-12 py-10 lg:grid-cols-[1.7fr_1fr] lg:gap-16 lg:py-14">
        <div>
          <PropertyGallery images={p.images} title={`${p.title} à ${p.commune}`} />

          <Reveal className="mt-14">
            <h2 className={`${serif} text-[2.2rem] leading-tight`}>À propos de ce bien</h2>
            <div className="mt-5 space-y-5 text-[16.5px] leading-[1.9] text-[#252A2D]/72">
              {p.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className={`${serif} text-[2.2rem] leading-tight`}>Caractéristiques</h2>
            <dl className="mt-6 grid border-t border-[#183B50]/20 sm:grid-cols-2 sm:gap-x-10">
              {facts.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between border-b border-[#183B50]/20 py-4">
                  <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#183B50]/70">{k}</dt>
                  <dd className="text-[16px]">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Prestations">
              {p.features.map((f) => (
                <li key={f} className="rounded-full border border-[#183B50]/25 px-4 py-2 text-[14px] text-[#183B50]">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-14 grid gap-6 sm:grid-cols-2">
            <div className="border border-[#E8E0D4] bg-white p-6">
              <h2 className="cap-label text-[13px] font-semibold uppercase tracking-[0.16em] text-[#183B50]/70">Performance énergétique</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#252A2D]/72">DPE non renseigné : bien de démonstration. Pour une annonce réelle, l&apos;étiquette énergie et climat serait affichée ici.</p>
            </div>
            <div className="border border-[#E8E0D4] bg-white p-6">
              <h2 className="cap-label text-[13px] font-semibold uppercase tracking-[0.16em] text-[#183B50]/70">Localisation</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#252A2D]/72">
                Secteur : {p.commune}. Aucune carte n&apos;est affichée, car ce bien est fictif et n&apos;a pas d&apos;adresse fiable.{" "}
                {commune && (
                  <Link href={`${capital.basePath}/secteurs/${commune.slug}`} className="font-semibold text-[#183B50] underline underline-offset-4">
                    Immobilier à {commune.name}
                  </Link>
                )}
              </p>
            </div>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-36 lg:self-start" aria-label="Prix et contact">
          <div className="border border-[#E8E0D4] bg-white p-7 sm:p-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#183B50]">
              {p.commune} · {p.transaction === "vente" ? "À vendre" : "À louer"}
            </p>
            <h1 className={`${serif} mt-3 text-[2.3rem] leading-[1.08]`}>{p.title}</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#252A2D]/70">{p.tagline}</p>
            <p className={`${serif} mt-6 text-[2.4rem] text-[#183B50]`}>{formatPrice(p)}</p>
            {p.transaction === "location" && <p className="mt-1 text-[12.5px] text-[#252A2D]/60">Loyer hors charges, fictif.</p>}
            <div className="mt-7 flex flex-col gap-3">
              <CapButton href="#contact-bien">Organiser une visite</CapButton>
              <CapButton href={`tel:${capital.phoneHref}`} variant="secondary" arrow={false}>
                Appeler l&apos;agence · {capital.phone}
              </CapButton>
            </div>
            <p className="mt-4 text-[12.5px] leading-relaxed text-[#252A2D]/60">Bien de démonstration : le formulaire ne transmet rien.</p>
          </div>
        </aside>
      </Wrap>

      <section id="contact-bien" className="scroll-mt-32 bg-[#E8E0D4]/55 py-20">
        <Wrap className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className={`${serif} text-[2.4rem] leading-tight`}>Ce bien vous intéresse ?</h2>
            <p className="mt-4 max-w-md text-[16px] leading-[1.8] text-[#252A2D]/70">Laissez-nous vos coordonnées et vos disponibilités : le message est pré-rempli avec la référence du bien.</p>
          </div>
          <div className="bg-white p-7 sm:p-10">
            <ContactForm bien={bien} idPrefix="bien" />
          </div>
        </Wrap>
      </section>

      {similar.length > 0 && (
        <section className="py-20">
          <Wrap>
            <h2 className={`${serif} text-[2.4rem] leading-tight`}>Biens similaires</h2>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => (
                <PropertyCard key={s.slug} property={s} />
              ))}
            </div>
          </Wrap>
        </section>
      )}
    </>
  );
}
