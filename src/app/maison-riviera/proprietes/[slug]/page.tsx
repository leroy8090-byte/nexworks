import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getProperty, properties, propertyTypeLabel, riviera } from "@/data/riviera";
import { PropertyCard } from "@/components/riviera/PropertyCard";
import { PropertyGallery } from "@/components/riviera/PropertyGallery";
import { Reveal, RivieraButton, Wrap } from "@/components/riviera/ui";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) return {};
  return { title: `${p.title} — ${p.city}`, description: `${p.tagline} Bien fictif de démonstration.` };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) notFound();
  const similar = properties.filter((x) => x.slug !== p.slug).slice(0, 3);
  const contactHref = `${riviera.basePath}/contact?bien=${p.slug}`;
  const facts = [
    ["Type", propertyTypeLabel[p.type]],
    ["Surface", `${p.surface} m²`],
    ["Chambres", String(p.bedrooms)],
    ["Salles de bain", String(p.bathrooms)],
  ];

  return (
    <>
      <Wrap className="pt-8">
        <nav aria-label="Fil d'Ariane" className="text-[12px] uppercase tracking-[0.16em] text-[#858178]">
          <Link href={`${riviera.basePath}/proprietes`} className="hover:text-[#24251F]">← Nos propriétés</Link>
        </nav>
      </Wrap>
      <Wrap className="grid gap-12 py-10 lg:grid-cols-[1.7fr_1fr] lg:gap-16 lg:py-14">
        <div>
          <PropertyGallery images={p.images} title={`${p.title} à ${p.city}`} />
          <Reveal className="mt-14">
            <h2 className="font-[family-name:var(--font-riviera-display)] text-[2.2rem] font-light">À propos de ce bien</h2>
            <div className="mt-5 space-y-5 text-[16px] leading-[1.9] text-[#858178]">
              {p.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-14">
            <h2 className="font-[family-name:var(--font-riviera-display)] text-[2.2rem] font-light">Prestations</h2>
            <ul className="mt-6 grid gap-x-10 border-t border-[#D9CBB7] sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-3 border-b border-[#D9CBB7] py-4 text-[15px]">
                  <span aria-hidden className="size-1.5 rounded-full bg-[#68715B]" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="border border-[#D9CBB7] bg-[#FFFEFA] p-7 sm:p-8">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.26em] text-[#68715B]">{p.city}</p>
            <h1 className="mt-3 font-[family-name:var(--font-riviera-display)] text-[2.4rem] font-light leading-[1.05]">{p.title}</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#858178]">{p.tagline}</p>
            <p className="mt-6 font-[family-name:var(--font-riviera-display)] text-[2.2rem] font-medium">{formatPrice(p.price)}</p>
            <dl className="mt-6 grid grid-cols-2 border-t border-[#D9CBB7]">
              {facts.map(([k, v]) => (
                <div key={k} className="border-b border-[#D9CBB7] py-4">
                  <dt className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#858178]">{k}</dt>
                  <dd className="mt-1 text-[16px]">{v}</dd>
                </div>
              ))}
            </dl>
            <RivieraButton href={contactHref} className="mt-7 w-full">
              Organiser une visite
            </RivieraButton>
            <p className="mt-4 text-[12.5px] leading-relaxed text-[#858178]">Bien fictif — le formulaire de contact est une démonstration.</p>
          </div>
        </aside>
      </Wrap>

      <section className="border-t border-[#D9CBB7] bg-[#FFFEFA] py-20">
        <Wrap>
          <h2 className="font-[family-name:var(--font-riviera-display)] text-[2.4rem] font-light">Dans le même esprit</h2>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => (
              <PropertyCard key={s.slug} property={s} />
            ))}
          </div>
        </Wrap>
      </section>

      {/* Barre de visite mobile */}
      <div className="sticky bottom-0 z-40 border-t border-[#D9CBB7] bg-[#F6F3EC]/95 p-3 backdrop-blur lg:hidden">
        <RivieraButton href={contactHref} className="w-full">
          Organiser une visite · {formatPrice(p.price)}
        </RivieraButton>
      </div>
    </>
  );
}
