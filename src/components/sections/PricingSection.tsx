import Link from "next/link";
import { formatEuro, maintenancePlans, packs, priceList, pricingDisclaimer } from "@/data/pricing";
import { quoteHref } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";

export function PricingSection() {
  return (
    <section className="relative border-t border-white/8 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Tarifs"
          title="Des offres claires, *sans surprise.*"
          text="Prix indicatifs « à partir de », hors taxes. Chaque projet est chiffré sur devis après un échange sur vos besoins."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {priceList.map((p) => (
            <Reveal key={p.id}>
              <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-display text-xl font-semibold text-white">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/80">{p.blurb}</p>
                <p className="mt-5 font-display text-3xl font-semibold text-sky">
                  {formatEuro(p.from)}
                  <span className="ml-1 text-sm font-sans font-normal text-mist/60">
                    {p.unit === "mois" ? "/ mois" : " HT"}
                  </span>
                </p>
                <ul className="mt-5 flex-1 space-y-2 text-[13.5px] text-mist/75">
                  {p.includes.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-sky" aria-hidden />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <SectionHeading
            eyebrow="Packs"
            title="Duo, trio ou complet : *économisez en regroupant.*"
            text="Les packs regroupent les prestations les plus demandées, avec une réduction par rapport au prix à l'unité."
          />
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {packs.map((pack) => (
            <Reveal key={pack.id}>
              <article
                className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                  pack.highlighted
                    ? "border-sky/50 bg-sky/[0.07] shadow-[0_0_40px_-20px_rgba(85,189,242,.55)]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {pack.badge && (
                  <span className="absolute right-5 top-5 rounded-full border border-sky/40 bg-sky/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky">
                    {pack.badge}
                  </span>
                )}
                <h3 className="font-display text-2xl font-semibold text-white">{pack.name}</h3>
                <p className="mt-2 text-sm text-mist/75">{pack.blurb}</p>
                <p className="mt-2 text-[12px] uppercase tracking-[0.14em] text-mist/50">{pack.services.join(" · ")}</p>
                <p className="mt-5 font-display text-4xl font-semibold text-white">
                  {formatEuro(pack.from)}
                  <span className="ml-2 text-base font-sans font-normal text-mist/60">HT</span>
                </p>
                {pack.save ? (
                  <p className="mt-1 text-sm text-sky">Économie d&apos;environ {formatEuro(pack.save)} vs à l&apos;unité</p>
                ) : null}
                <ul className="mt-6 space-y-2 text-[13.5px] text-mist/75">
                  {pack.includes.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-sky" aria-hidden />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${quoteHref}&pack=${pack.id}`}
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                    pack.highlighted
                      ? "bg-sky text-[#050505] hover:bg-white"
                      : "border border-white/15 text-white hover:border-sky/60 hover:bg-white/[0.06]"
                  }`}
                >
                  Demander un devis
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <SectionHeading
            eyebrow="Maintenance"
            title="Après la mise en ligne, *on reste présents.*"
            text="Hébergement, mises à jour et petites évolutions : un forfait mensuel pour ne pas laisser le site s'endormir."
          />
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {maintenancePlans.map((m) => (
            <Reveal key={m.id}>
              <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <h3 className="font-display text-2xl font-semibold text-white">{m.name}</h3>
                <p className="mt-2 text-sm text-mist/75">{m.blurb}</p>
                <p className="mt-5 font-display text-3xl font-semibold text-sky">
                  {formatEuro(m.from)}
                  <span className="ml-1 text-sm font-sans font-normal text-mist/60">HT / mois</span>
                </p>
                <ul className="mt-5 space-y-2 text-[13.5px] text-mist/75">
                  {m.includes.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-sky" aria-hidden />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-[13px] leading-relaxed text-mist/55">{pricingDisclaimer}</p>
      </Container>
    </section>
  );
}
