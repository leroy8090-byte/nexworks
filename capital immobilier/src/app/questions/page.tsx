import Link from "next/link";
import { Reveal } from "@/components/Motion";
import { faqLd, RedBand } from "@/components/Sections";
import { Container, JsonLd, PageHero } from "@/components/ui";
import { questions } from "@/data/questions";
import { pageMeta } from "@/lib/seo";

const DESC = "Quelle agence contacter à Saint-Raphaël, comment acheter, faire estimer une maison, choisir un syndic : des réponses claires aux questions immobilières courantes.";
export const metadata = pageMeta({ title: "Questions sur l’immobilier à Saint-Raphaël", description: DESC, path: "/questions", image: "/media/vieux-port.webp" });

export default function Questions() {
  return (
    <>
      <JsonLd data={faqLd(questions.map((f) => ({ q: f.q, a: f.a })))} />
      <PageHero crumbs={[{ name: "Questions fréquentes", path: "/questions" }]} eyebrow="Questions fréquentes" title="Vos questions, des réponses directes." text="Acheter, vendre, louer, confier un bien, choisir un syndic : l’essentiel en quelques lignes, puis les détails." image="/media/vieux-port.webp" alt="Le Vieux-Port de Saint-Raphaël, ses bateaux et ses façades" />
      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="Sommaire des questions" className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <p className="eb text-[13px] font-semibold uppercase tracking-[0.18em] text-night">Sommaire</p>
            <ol className="mt-5 border-t border-night/20">
              {questions.map((q) => <li key={q.id} className="border-b border-night/20"><a href={`#${q.id}`} className="block py-3 text-[16px] leading-snug text-muted transition-[color,padding] duration-300 hover:pl-2 hover:text-sea">{q.q}</a></li>)}
            </ol>
          </nav>
          <div className="lg:col-span-8">
            {questions.map((q, i) => (
              <article key={q.id} id={q.id} className={`scroll-mt-28 border-t-2 border-night pb-14 pt-6 ${i === questions.length - 1 ? "pb-0" : ""}`}>
                <div className="scale-in"><p className="text-[3.4rem] font-bold leading-none tracking-[-0.05em] text-sea [font-family:var(--font-display)]">{i + 1}</p></div>
                <h2 className="mt-4 text-[2rem] leading-[1.02] text-night sm:text-[2.9rem]">{q.q}</h2>
                <Reveal><p className="mt-5 text-[20px] font-medium leading-[1.5] text-night">{q.a}</p></Reveal>
                <Reveal delay={0.08} className="mt-5 space-y-4 text-[17.5px] leading-[1.65] text-muted">{q.more.map((p) => <p key={p}>{p}</p>)}</Reveal>
                <Reveal delay={0.14}>
                  <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2.5">{q.links.map((l) => <li key={l.href}><Link href={l.href} className="group inline-flex items-center gap-2 text-[16px] font-semibold text-night transition-colors hover:text-sea"><span className="line-on">{l.label}</span><span aria-hidden className="text-sea transition-transform duration-500 group-hover:translate-x-1">→</span></Link></li>)}</ul>
                </Reveal>
              </article>
            ))}
            <p className="mt-10 text-[15px] leading-relaxed text-muted">Informations générales sur le droit français, qui ne remplacent pas l’avis d’un notaire ou d’un professionnel du droit pour votre situation.</p>
          </div>
        </Container>
      </section>
      <RedBand title="Votre question n’y est pas ?" text="Posez-la directement à l’agence." primary={{ label: "Contacter l’agence", href: "/contact" }} secondary={{ label: "Lire nos conseils", href: "/conseils" }} />
    </>
  );
}
