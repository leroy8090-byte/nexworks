import Link from "next/link";
import type { ReactNode } from "react";
import { localePath, type Lang } from "@/i18n/config";
import { breadcrumbLd } from "@/lib/seo";
import { ImageReveal, Reveal } from "./Motion";
import { Photo } from "./Photo";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-16 ${className}`}>{children}</div>;
}

type Variant = "ink" | "outline" | "quiet";
const STYLES: Record<Variant, string> = {
  ink: "bg-ink text-white hover:bg-sea",
  outline: "border border-ink/25 text-ink hover:border-ink",
  quiet: "text-ink",
};
/** Boutons rectangulaires, en petites capitales espacées : la sobriété des maisons de prestige. */
export const btn = (v: Variant = "ink", extra = "") => `group/b inline-flex min-h-[3.4rem] items-center justify-center gap-3 whitespace-nowrap rounded-[1px] px-8 text-[11.5px] font-medium tracking-[0.24em] uppercase transition-colors duration-300 ${STYLES[v]} ${extra}`;

export function Btn({ href, children, variant, className, arrow, lang = "fr" }: { href: string; children: ReactNode; variant?: Variant; className?: string; arrow?: boolean; lang?: Lang }) {
  const inner = <>{children}{arrow && <span aria-hidden className="text-[15px] tracking-normal transition-transform duration-300 group-hover/b:translate-x-1">→</span>}</>;
  if (/^(tel:|mailto:|https?:)/.test(href)) return <a href={href} className={btn(variant, className)} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>;
  return <Link href={localePath(lang, href)} className={btn(variant, className)}>{inner}</Link>;
}

/** Un titre de section : surtitre, grand titre, texte d'introduction. Il apparaît d'un seul geste. */
export function Title({ kicker, title, text, className = "", as: Tag = "h2", center }: { kicker?: string; title: string; text?: string; className?: string; as?: "h2" | "h3"; center?: boolean }) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {kicker && <p className={`kicker ${center ? "justify-center" : ""}`}>{kicker}</p>}
      <Tag className="mt-6 text-[2.5rem] text-ink sm:text-[3.8rem]">{title}</Tag>
      {text && <p className={`mt-6 max-w-2xl text-[16.5px] leading-[1.8] text-muted ${center ? "mx-auto" : ""}`}>{text}</p>}
    </Reveal>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Crumbs({ items, lang = "fr" }: { items: { name: string; path: string }[]; lang?: Lang }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(items, lang)} />
      <nav aria-label={lang === "fr" ? "Fil d'Ariane" : "Breadcrumb"} className="text-[12.5px] tracking-wide text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href={localePath(lang, "/")} className="line">{lang === "fr" ? "Accueil" : "Home"}</Link></li>
          {items.map((c, i) => <li key={c.path} className="flex items-center gap-2"><span aria-hidden className="text-stone">/</span>{i === items.length - 1 ? <span aria-current="page" className="text-ink">{c.name}</span> : <Link href={localePath(lang, c.path)} className="line">{c.name}</Link>}</li>)}
        </ol>
      </nav>
    </>
  );
}

/** Haut des pages intérieures : sur fond blanc, le titre, puis une grande photo panoramique qui se pose. */
export function PageHero({ kicker, title, text, image, alt, crumbs, children, lang = "fr" }: { kicker: string; title: string; text?: string; image?: string; alt?: string; crumbs: { name: string; path: string }[]; children?: ReactNode; lang?: Lang }) {
  return (
    <section className="bg-white pt-40 sm:pt-48">
      <Container>
        <div className="rise"><Crumbs items={crumbs} lang={lang} /></div>
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="rise kicker" style={{ animationDelay: "80ms" }}>{kicker}</p>
            <h1 className="rise mt-6 text-[3rem] text-ink sm:text-[5rem]" style={{ animationDelay: "160ms" }}>{title}</h1>
          </div>
          {text && <p className="rise text-[16.5px] leading-[1.8] text-muted lg:col-span-4" style={{ animationDelay: "260ms" }}>{text}</p>}
        </div>
        {children && <div className="rise mt-10" style={{ animationDelay: "320ms" }}>{children}</div>}
      </Container>
      {image && (
        <Container className="mt-14 sm:mt-20">
          <div className="relative aspect-[4/3] overflow-hidden bg-paper sm:aspect-[21/9]">
            <Photo src={image} alt={alt ?? ""} fill preload sizes="(min-width:1440px) 1312px, 100vw" className="settle object-cover" />
          </div>
        </Container>
      )}
    </section>
  );
}

/** Bandeau de fin de page, clair : une invitation à prendre rendez-vous. */
const CTA = {
  fr: { kicker: "Rendez-vous privé", title: "Parlons de la maison que vous cherchez.", text: "Un premier échange, en toute discrétion, pour comprendre votre projet et vous présenter les biens qui y répondent, publiés ou non.", meet: "Prendre rendez-vous", see: "Voir les propriétés" },
  en: { kicker: "Private appointment", title: "Let's talk about the home you are looking for.", text: "A first conversation, in complete discretion, to understand your project and present the properties that match it, listed or not.", meet: "Book an appointment", see: "View properties" },
};
export function CtaBand({ lang = "fr", kicker = CTA[lang].kicker, title = CTA[lang].title, text = CTA[lang].text }: { lang?: Lang; kicker?: string; title?: string; text?: string }) {
  return (
    <section className="bg-paper py-28 sm:py-36">
      <Container className="text-center">
        <Reveal>
          <p className="kicker justify-center">{kicker}</p>
          <h2 className="mx-auto mt-7 max-w-3xl text-[2.6rem] text-ink sm:text-[4.2rem]">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-[1.8] text-muted">{text}</p>
          <div className="mt-11 flex flex-col justify-center gap-3 sm:flex-row"><Btn lang={lang} href="/contact" arrow>{CTA[lang].meet}</Btn><Btn lang={lang} href="/proprietes" variant="outline">{CTA[lang].see}</Btn></div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Questions fréquentes, dépliables. */
export function Faq({ items, lang = "fr", title = lang === "fr" ? "Questions fréquentes" : "Frequently asked questions" }: { items: { q: string; a: string }[]; lang?: Lang; title?: string }) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5"><Title kicker={lang === "fr" ? "Bon à savoir" : "Good to know"} title={title} /></div>
        <Reveal className="border-t border-line lg:col-span-7">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="serif flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[1.45rem] leading-snug text-ink [&::-webkit-details-marker]:hidden">
                {f.q}<span aria-hidden className="grid size-8 shrink-0 place-items-center text-[20px] font-light text-gold transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-7 text-[16px] leading-[1.8] text-muted">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/** Une photo de section, qui se pose doucement à l'arrivée. */
export function Picture({ src, alt, className = "", sizes = "(min-width:1024px) 50vw, 100vw" }: { src: string; alt: string; className?: string; sizes?: string }) {
  return <ImageReveal className={`relative overflow-hidden bg-paper ${className}`}><Photo src={src} alt={alt} fill sizes={sizes} className="object-cover" /></ImageReveal>;
}

/** Pictogrammes fins, dessinés au trait. */
export function Icon({ name, className = "size-5" }: { name: "bed" | "bath" | "area" | "land" | "sea" | "pool" | "heart" | "pin" | "arrow" | "phone" | "close" | "share" | "lock" | "key" | "eye" | "pen" | "check"; className?: string }) {
  const p: Record<string, ReactNode> = {
    bed: <><path d="M3 18V8m0 5h18v5M21 18v-3a3 3 0 0 0-3-3h-7v1" /><circle cx="7" cy="10.5" r="1.6" /></>,
    bath: <><path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2ZM6 12V6a2 2 0 0 1 4 0M7 19l-1 2m11-2 1 2" /></>,
    area: <><path d="M4 4h16v16H4z" /><path d="M8 4v3M12 4v2M16 4v3M4 8h3M4 12h2M4 16h3" /></>,
    land: <><path d="M3 20h18M5 20l4-8 3 5 2-3 5 6" /><circle cx="17" cy="6" r="2" /></>,
    sea: <><path d="M2 15c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 19c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2" /><circle cx="12" cy="8" r="3" /></>,
    pool: <><path d="M8 15V5a2 2 0 0 1 4 0M16 15V5a2 2 0 0 0-4 0M8 9h8M2 18c2.5 0 2.5 1.5 5 1.5S9.5 18 12 18s2.5 1.5 5 1.5 2.5-1.5 5-1.5" /></>,
    heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
    pin: <><path d="M12 21s-6-5.4-6-11a6 6 0 0 1 12 0c0 5.6-6 11-6 11Z" /><circle cx="12" cy="10" r="2.2" /></>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    share: <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" /></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="1.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
    key: <><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9m-3 3 2 2m-5 1 2 2" /></>,
    eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    pen: <><path d="M4 20h4L19 9l-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></>,
    check: <path d="m5 12 4.5 4.5L19 7" />,
  };
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{p[name]}</svg>;
}
