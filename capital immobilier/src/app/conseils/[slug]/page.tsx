import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageReveal, Reveal } from "@/components/Motion";
import { Photo } from "@/components/Photo";
import { ArticleCards, Further, RedBand } from "@/components/Sections";
import { Container, JsonLd, PageHero } from "@/components/ui";
import { articles, getArticle } from "@/data/articles";
import { articleLd, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return pageMeta({ title: a.metaTitle, description: a.description, path: `/conseils/${a.slug}`, image: a.image, alt: a.alt, type: "article", modified: a.updated });
}

const dateFr = (iso: string) => new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(iso));

export default async function Article({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const path = `/conseils/${a.slug}`;
  const others = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={articleLd({ title: a.title, description: a.description, path, image: a.image, updated: a.updated })} />
      <PageHero crumbs={[{ name: "Conseils", path: "/conseils" }, { name: a.eyebrow, path }]} eyebrow={a.eyebrow} title={a.title} image={a.image} alt={a.alt} />
      <article className="bg-white py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="Sommaire de l’article" className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <p className="eb text-[13px] font-semibold uppercase tracking-[0.18em] text-night">Sommaire</p>
            <ol className="mt-5 border-t border-night/20">
              {a.sections.map((s, i) => <li key={s.h} className="border-b border-night/20"><a href={`#s${i + 1}`} className="flex gap-3 py-3 text-[16px] leading-snug text-muted transition-[color,padding] duration-300 hover:pl-2 hover:text-sea"><span aria-hidden className="font-semibold text-sea">{i + 1}</span>{s.h}</a></li>)}
            </ol>
          </nav>
          <div className="min-w-0 lg:col-span-8">
            <p className="text-[15px] text-muted">Mis à jour le {dateFr(a.updated)}</p>
            <Reveal className="mt-6 bg-night p-7 text-white sm:p-10">
              <h2 className="text-[1.7rem] leading-tight text-white sm:text-[2.2rem]">L’essentiel</h2>
              <ul className="mt-5 space-y-3">{a.takeaways.map((t) => <li key={t} className="flex gap-4 text-[17.5px] leading-[1.5]"><span aria-hidden className="mt-[0.55em] size-2.5 shrink-0 bg-sea" />{t}</li>)}</ul>
            </Reveal>
            {a.sections.map((s, i) => (
              <section key={s.h} id={`s${i + 1}`} className="mt-16 scroll-mt-28 sm:mt-20">
                <div className="scale-in"><p className="text-[3.4rem] font-bold leading-none tracking-[-0.05em] text-sea [font-family:var(--font-display)]">{i + 1}</p></div>
                <h2 className="mt-3 text-[2rem] leading-[1.02] text-night sm:text-[2.9rem]">{s.h}</h2>
                <Reveal className="mt-5 space-y-5 text-[18px] leading-[1.7] text-muted">{s.p.map((p) => <p key={p}>{p}</p>)}</Reveal>
                {s.list && <ul className="mt-6 border-t border-night/20">{s.list.map((t, k) => <li key={t} className="border-b border-night/20"><Reveal delay={k * 0.04} className="flex items-start gap-4 py-3.5 text-[17.5px] leading-[1.5] text-night transition-transform duration-500 hover:translate-x-1.5"><span aria-hidden className="mt-[0.55em] size-2.5 shrink-0 bg-sea" />{t}</Reveal></li>)}</ul>}
                {i === 1 && <ImageReveal className="relative mt-10 aspect-[16/9] overflow-hidden bg-sand"><div className="depth"><Photo src={a.image2} alt={a.alt2} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" /></div></ImageReveal>}
              </section>
            ))}
            <p className="mt-14 border-t border-rule pt-5 text-[15px] leading-relaxed text-muted">Informations générales, à jour à la date indiquée, sur le droit français. Elles ne remplacent pas l’avis d’un notaire, d’un expert-comptable ou d’un professionnel du droit pour votre situation.</p>
          </div>
        </Container>
      </article>
      <Further eyebrow="Passer à l’action" title="Et maintenant ?" items={a.links} />
      <section className="border-t border-rule bg-white py-20 sm:py-28">
        <Container>
          <h2 className="text-[2.5rem] leading-[0.98] text-night sm:text-[4rem]">À lire aussi</h2>
          <div className="mt-12"><ArticleCards items={others} /></div>
        </Container>
      </section>
      <RedBand title="Parlons de votre projet." text="L’agence vous répond." primary={{ label: "Contacter l’agence", href: "/contact" }} secondary={{ label: "Questions fréquentes", href: "/questions" }} />
    </>
  );
}
