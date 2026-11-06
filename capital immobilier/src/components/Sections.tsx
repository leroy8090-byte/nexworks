import Link from "next/link";
import type { ReactNode } from "react";
import { ImageReveal, Reveal } from "./Motion";
import { Photo } from "./Photo";
import { Btn, Container, eyebrowCls, Title } from "./ui";

/** Étapes : un grand chiffre rouge, qui arrive avec le défilement. */
export function Steps({ items, dark }: { items: { t: string; d: string }[]; dark?: boolean }) {
  return (
    <ol className={`grid gap-x-8 gap-y-10 ${items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"}`}>
      {items.map((s, i) => (
        <li key={s.t} className="scale-in">
          <div className={`border-t-2 pt-5 ${dark ? "border-white/30" : "border-night"}`}>
            <p className="text-[4.6rem] font-bold leading-none tracking-[-0.05em] text-sea [font-family:var(--font-display)]">{i + 1}</p>
            <h3 className={`mt-4 text-[1.6rem] leading-tight ${dark ? "text-white" : "text-night"}`}>{s.t}</h3>
            <p className={`mt-2.5 text-[16.5px] leading-[1.6] ${dark ? "text-white/75" : "text-muted"}`}>{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Liste d'engagements : le carré rouge, et la ligne qui s'éclaire au survol. */
export function Checks({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <ul className={`grid border-t md:grid-cols-2 md:gap-x-10 ${dark ? "border-white/20" : "border-night/20"}`}>
      {items.map((t, i) => (
        <li key={t} className={`border-b ${dark ? "border-white/20" : "border-night/20"}`}>
          <Reveal delay={(i % 2) * 0.07} className="group flex items-start gap-4 py-4 transition-transform duration-500 hover:translate-x-1.5">
            <span aria-hidden className="mt-[0.55em] size-2.5 shrink-0 bg-sea" />
            <span className={`text-[17.5px] leading-[1.5] ${dark ? "text-white" : "text-night"}`}>{t}</span>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/** Texte et photo : la photo se dévoile puis glisse plus lentement que la page. */
export function Split({ eyebrow, title, children, image, alt, reverse, dark, id }: { eyebrow?: string; title: string; children: ReactNode; image: string; alt: string; reverse?: boolean; dark?: boolean; id?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-32 ${dark ? "bg-night text-white" : "bg-white"}`}>
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
          <ImageReveal className="relative aspect-[5/4] overflow-hidden bg-sand"><div className="depth"><Photo src={image} alt={alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" /></div></ImageReveal>
        </div>
        <div className="lg:col-span-6">
          <Title light={dark} eyebrow={eyebrow} title={title} />
          <Reveal delay={0.1} className={`mt-6 space-y-5 text-[18px] leading-[1.65] ${dark ? "text-white/80" : "text-muted"}`}>{children}</Reveal>
        </div>
      </Container>
    </section>
  );
}

/** Bande rouge d'appel à l'action. */
export function RedBand({ eyebrow, title, text, primary, secondary, image, alt }: { eyebrow?: string; title: string; text?: string; primary: { label: string; href: string }; secondary?: { label: string; href: string }; image?: string; alt?: string }) {
  return (
    <section className="relative overflow-hidden bg-sea py-20 text-white sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className={image ? "lg:col-span-7" : "lg:col-span-12"}>
          {eyebrow && <p className={`${eyebrowCls} eb-white`}>{eyebrow}</p>}
          <h2 className="mt-4 max-w-5xl text-[2.7rem] leading-[0.96] sm:text-[5rem]">{title}</h2>
          {text && <p className="mt-5 max-w-xl text-[19px] leading-[1.5]">{text}</p>}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Btn href={primary.href} variant="black" arrow>{primary.label}</Btn>
            {secondary && <Btn href={secondary.href} variant="ghost">{secondary.label}</Btn>}
          </div>
        </div>
        {image && <div className="open-up relative aspect-[4/3] overflow-hidden lg:col-span-5"><div className="depth"><Photo src={image} alt={alt ?? ""} fill sizes="(min-width:1024px) 42vw, 100vw" className="object-cover" /></div></div>}
      </Container>
    </section>
  );
}

/** Le bloc de demande : titre sur fond noir, formulaire sur fond blanc. */
export function FormBlock({ eyebrow, title, text, children, id = "demande" }: { eyebrow?: string; title: string; text?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 bg-night py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5"><Title light eyebrow={eyebrow} title={title} text={text} /></div>
        <Reveal delay={0.1} className="bg-white p-6 sm:p-10 lg:col-span-7">{children}</Reveal>
      </Container>
    </section>
  );
}

/** Questions : réponses courtes, utiles aux visiteurs comme aux moteurs. */
export function Questions({ items, title = "Vos questions.", eyebrow = "Questions fréquentes" }: { items: { q: string; a: string }[]; title?: string; eyebrow?: string }) {
  return (
    <section className="bg-white py-20 sm:py-32">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5"><Title eyebrow={eyebrow} title={title} /></div>
        <Reveal className="border-t-2 border-night lg:col-span-7">
          {items.map((f) => (
            <details key={f.q} className="faq group border-b border-night/20">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.3rem] font-semibold leading-snug tracking-[-0.01em] text-night transition-colors [font-family:var(--font-display)] hover:text-sea [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="relative size-4 shrink-0 text-sea transition-transform duration-300 group-open:rotate-45"><span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-current" /><span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-current" /></span>
              </summary>
              <p className="max-w-2xl pb-6 pr-8 text-[17px] leading-[1.65] text-muted">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/** Une grande photo plein cadre qui s'ouvre avec le défilement. */
export function WidePhoto({ image, alt }: { image: string; alt: string }) {
  return <section className="relative h-[62svh] overflow-hidden bg-white"><div className="open-up absolute inset-0"><div className="depth"><Photo src={image} alt={alt} fill sizes="100vw" className="object-cover" /></div></div></section>;
}

/** Pour aller plus loin : de grandes lignes qui relient les pages entre elles. */
export function Further({ items, title = "Pour aller plus loin.", eyebrow = "À lire aussi" }: { items: { label: string; href: string }[]; title?: string; eyebrow?: string }) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5"><Title eyebrow={eyebrow} title={title} /></div>
        <ul className="border-t-2 border-night lg:col-span-7">
          {items.map((l, i) => (
            <li key={l.href} className="border-b border-night/20">
              <Reveal delay={i * 0.06}>
                <Link href={l.href} className="row-fill group relative flex items-center justify-between gap-6 px-1 py-5 text-[1.3rem] font-semibold leading-snug tracking-[-0.01em] text-night transition-[color,padding] duration-500 [font-family:var(--font-display)] hover:px-5 hover:text-white">
                  {l.label}<span aria-hidden className="shrink-0 text-sea transition-transform duration-500 group-hover:translate-x-1 group-hover:text-white">→</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Des articles : la photo se dévoile, puis glisse plus lentement que la page. */
export function ArticleCards({ items }: { items: { slug: string; title: string; description: string; eyebrow: string; image: string; alt: string }[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {items.map((a, i) => (
        <li key={a.slug} className="scale-in">
          <Link href={`/conseils/${a.slug}`} className="group block">
            <ImageReveal delay={(i % 3) * 0.08} className="relative aspect-[4/3] overflow-hidden bg-sand"><div className="depth"><span className="zoom absolute inset-0 block"><Photo src={a.image} alt={a.alt} fill sizes="(min-width:1024px) 32vw, (min-width:768px) 50vw, 100vw" className="object-cover" /></span></div></ImageReveal>
            <p className="eb mt-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-night">{a.eyebrow}</p>
            <h3 className="mt-3 text-[1.7rem] leading-[1.06] text-night transition-colors duration-300 group-hover:text-sea">{a.title}</h3>
            <p className="mt-3 text-[16.5px] leading-[1.55] text-muted">{a.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const faqLd = (items: { q: string; a: string }[]) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
