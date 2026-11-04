import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { capital, communes, formatEuro, formatPrice, isSameCommune, roomsSummary, similarProperties, videoEmbedUrl } from "@/data/capital";
import { ContactForm } from "@/components/capital/Forms";
import { PropertyCard } from "@/components/capital/PropertyCard";
import { PropertyGallery } from "@/components/capital/PropertyGallery";
import { breadcrumbLd, capitalMeta } from "@/components/capital/seo";
import { CapButton, DemoNotice, JsonLdScript, Reveal, serif, Wrap } from "@/components/capital/ui";
import { getProperties, getProperty } from "@/lib/capital-properties";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProperty(slug);
  if (!p) return {};
  return capitalMeta(`${p.title} à ${p.commune}`, `${p.typeLabel} à ${p.commune} : ${roomsSummary(p)}. ${p.description[0] ?? ""}`.slice(0, 200), `/biens/${p.slug}`);
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProperty(slug);
  if (!p) notFound();
  const similar = similarProperties(p, await getProperties());
  const commune = communes.find((c) => isSameCommune(c.name, p.commune));
  const bien = `${p.title} — ${p.commune} (${p.ref})`;
  const mapQuery = [p.address, p.commune, "France"].filter(Boolean).join(", ");
  const mapKey = process.env.GOOGLE_MAPS_EMBED_KEY;
  // Sans clé, Google affiche quand même la carte ; la clé (gratuite) n'apporte que l'API officielle.
  const mapSrc = mapKey
    ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(mapKey)}&q=${encodeURIComponent(mapQuery)}&language=fr`
    : `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed&hl=fr`;
  const facts: [string, string][] = [
    ["Type", p.typeLabel],
    ...(p.surface != null ? ([["Surface habitable", `${p.surface} m²`]] as [string, string][]) : []),
    ...(p.landSurface != null ? ([["Terrain", `${p.landSurface} m²`]] as [string, string][]) : []),
    ...(p.rooms != null ? ([["Pièces", String(p.rooms)]] as [string, string][]) : []),
    ...(p.bedrooms != null ? ([["Chambres", p.bedrooms > 0 ? String(p.bedrooms) : "Studio"]] as [string, string][]) : []),
    ...(p.bathrooms != null ? ([["Salles d'eau", String(p.bathrooms)]] as [string, string][]) : []),
    ["Référence", p.ref],
  ];

  return (
    <>
      {/* Permet aux statistiques du logiciel de rattacher la visite à ce bien. */}
      <meta name="estate:property" content={p.ref} />
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
          {p.images.length > 0 ? (
            <PropertyGallery images={p.images} title={`${p.title} à ${p.commune}`} />
          ) : (
            <div className="grid aspect-[16/10] place-items-center bg-[#E8E0D4] text-[14px] text-[#183B50]/60">Photos à venir</div>
          )}

          <Reveal className="mt-14">
            <h2 className={`${serif} text-[2.2rem] leading-tight`}>À propos de ce bien</h2>
            <div className="mt-5 space-y-5 text-[16.5px] leading-[1.9] text-[#252A2D]/72">
              {p.description.map((d) => (
                <p key={d} className="whitespace-pre-line">{d}</p>
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
            {p.features.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Prestations">
                {p.features.map((f) => (
                  <li key={f} className="rounded-full border border-[#183B50]/25 px-4 py-2 text-[14px] text-[#183B50]">
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          {p.videos.length > 0 && (
            <Reveal className="mt-14">
              <h2 className={`${serif} text-[2.2rem] leading-tight`}>{p.videos.length > 1 ? "Vidéos" : "Vidéo"}</h2>
              <div className="mt-6 space-y-6">
                {p.videos.map((v, i) => {
                  const embed = videoEmbedUrl(v);
                  return embed ? (
                    <div key={v} className="relative aspect-[16/9] overflow-hidden bg-[#183B50]">
                      <iframe
                        src={embed}
                        title={`Vidéo ${i + 1} : ${p.title}`}
                        loading="lazy"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="absolute inset-0 size-full border-0"
                      />
                    </div>
                  ) : (
                    <a key={v} href={v} target="_blank" rel="noopener noreferrer" className="block font-semibold text-[#183B50] underline underline-offset-4">
                      Voir la vidéo {p.videos.length > 1 ? i + 1 : ""}
                    </a>
                  );
                })}
              </div>
            </Reveal>
          )}

          <Reveal className="mt-14">
            <div className="border border-[#E8E0D4] bg-white p-6">
              <h2 className="cap-label text-[13px] font-semibold uppercase tracking-[0.16em] text-[#183B50]/70">Performance énergétique</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#252A2D]/72">
                {p.dpe || p.ges ? (
                  <>
                    {p.dpe && <>DPE : <strong className="font-semibold">{p.dpe === "NC" ? "non concerné" : p.dpe}</strong></>}
                    {p.dpe && p.ges && " · "}
                    {p.ges && <>GES : <strong className="font-semibold">{p.ges === "NC" ? "non concerné" : p.ges}</strong></>}
                  </>
                ) : (
                  "DPE et GES non renseignés."
                )}
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className={`${serif} text-[2.2rem] leading-tight`}>Localisation</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[#252A2D]/72">
              {p.address ? `${p.address}, ${p.commune}` : `${p.commune}. L'adresse exacte est communiquée par l'agence.`}
            </p>
            <div className="relative mt-5 aspect-[16/10] overflow-hidden border border-[#E8E0D4] bg-[#E8E0D4]">
              <iframe src={mapSrc} title={`Carte : ${p.title}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full border-0" />
            </div>
            <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#183B50] underline underline-offset-4">
                Ouvrir dans Google Maps
              </a>
              {commune && (
                <Link href={`${capital.basePath}/secteurs/${commune.slug}`} className="font-semibold text-[#183B50] underline underline-offset-4">
                  Immobilier à {commune.name}
                </Link>
              )}
            </p>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-36 lg:self-start" aria-label="Prix et contact">
          <div className="border border-[#E8E0D4] bg-white p-7 sm:p-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#183B50]">
              {p.commune} · {p.transaction === "vente" ? "À vendre" : "À louer"}
            </p>
            <h1 className={`${serif} mt-3 text-[2.3rem] leading-[1.08]`}>{p.title}</h1>
            <p className={`${serif} mt-6 text-[2.4rem] text-[#183B50]`}>{formatPrice(p)}</p>
            {p.transaction === "location" && <p className="mt-1 text-[12.5px] text-[#252A2D]/60">Loyer hors charges.</p>}
            {(p.fees != null || p.feesNote) && (
              <p className="mt-1 text-[12.5px] text-[#252A2D]/60">
                Honoraires{p.fees != null ? ` : ${formatEuro(p.fees)}` : ""}
                {p.feesNote ? ` (${p.feesNote})` : ""}
              </p>
            )}
            <div className="mt-7 flex flex-col gap-3">
              <CapButton href="#contact-bien">Organiser une visite</CapButton>
              <CapButton href={`tel:${capital.phoneHref}`} variant="secondary" arrow={false}>
                Appeler l&apos;agence · {capital.phone}
              </CapButton>
            </div>
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
            <ContactForm bien={bien} reference={p.ref} idPrefix="bien" />
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
