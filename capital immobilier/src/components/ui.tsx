import { Photo as Image } from "./Photo";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Motion";
import { breadcrumbLd, webPageLd } from "@/lib/seo";
import { Words } from "./Words";

export type Crumb = { name: string; path?: string };

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1480px] px-5 sm:px-10 lg:px-16 ${className}`}>{children}</div>;
}

export const eyebrowCls = "eb text-[13px] font-semibold uppercase tracking-[0.18em]";

type Variant = "night" | "line" | "white" | "ghost" | "black";
const STYLES: Record<Variant, string> = {
  night: "fill bg-sea text-white [--f:var(--color-night)]",
  black: "fill bg-night text-white [--f:#fff] hover:text-night",
  line: "fill border border-night/35 text-night [--f:var(--color-night)] hover:border-night hover:text-white",
  white: "fill bg-white text-night [--f:var(--color-sea)] hover:text-white",
  ghost: "fill border border-white/60 text-white [--f:#fff] hover:border-white hover:text-night",
};
export const btnCls = (v: Variant = "night", extra = "") => `group/btn inline-flex min-h-[3.3rem] items-center justify-center gap-3 px-7 text-center text-[15px] font-semibold transition-colors duration-300 ${STYLES[v]} ${extra}`;

const Arrow = () => <span aria-hidden className="transition-transform duration-500 group-hover/btn:translate-x-1">→</span>;

export function Btn({ href, children, variant, className, arrow }: { href: string; children: ReactNode; variant?: Variant; className?: string; arrow?: boolean }) {
  if (/^(tel:|mailto:|https?:)/.test(href)) return <a href={href} className={btnCls(variant, className)} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}{arrow && <Arrow />}</a>;
  return <Link href={href} className={btnCls(variant, className)}>{children}{arrow && <Arrow />}</Link>;
}

export function HeroWords({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={`${w}${i}`}><span className="word-mask"><span className="word-rise" style={{ "--d": `${start + i * 70}ms` } as React.CSSProperties}>{w}</span></span>{" "}</span>
      ))}
    </>
  );
}

export function Title({ eyebrow, title, text, light, className = "" }: { eyebrow?: string; title: string; text?: string; light?: boolean; className?: string }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <Reveal><p className={`${eyebrowCls} ${light ? "text-white" : "text-night"}`}>{eyebrow}</p></Reveal>}
      <h2 className={`mt-4 text-[2.5rem] leading-[0.98] sm:text-[4.6rem] ${light ? "text-white" : "text-night"}`}><Words text={title} /></h2>
      {text && <Reveal delay={0.25}><p className={`mt-5 max-w-2xl text-[18px] leading-[1.65] ${light ? "text-white/85" : "text-muted"}`}>{text}</p></Reveal>}
    </div>
  );
}

/** Fil d’Ariane, visible et lu par les moteurs. Le dernier élément est la page en cours. */
export function Crumbs({ items, light, className = "" }: { items: Crumb[]; light?: boolean; className?: string }) {
  const all: Crumb[] = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbLd(all)} />
      <nav aria-label="Fil d’Ariane" className={`rise text-[14px] ${light ? "text-white/85" : "text-muted"} ${className}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => (
            <li key={c.name} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {i < all.length - 1 && c.path ? <Link href={c.path} className={`line-link ${light ? "hover:text-white" : "hover:text-night"}`}>{c.name}</Link> : <span aria-current="page" className={light ? "text-white" : "text-night"}>{c.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** Haut des pages intérieures : une grande photo et un titre. */
export function PageHero({ eyebrow, title, text, image, alt, children, crumbs }: { eyebrow: string; title: string; text?: string; image: string; alt: string; children?: ReactNode; crumbs?: Crumb[] }) {
  const path = crumbs?.at(-1)?.path;
  return (
    <section className="relative isolate flex min-h-[64svh] items-end overflow-hidden bg-night pb-24 pt-44 text-white">
      <div className="hero-away absolute inset-0 -z-20"><div className="settle absolute inset-0"><Image src={image} alt={alt} fill preload quality={85} sizes="(max-width: 640px) 120vw, 100vw" className="object-cover" /></div></div>
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-night/55 via-night/25 to-night/85" />
      {path && <JsonLd data={webPageLd({ name: title, path, description: text })} />}
      <Container className="hero-fade">
        {crumbs && <Crumbs light items={crumbs} className="mb-6" />}
        <p className={`rise ${eyebrowCls} text-white`}>{eyebrow}</p>
        <h1 className="mt-4 max-w-5xl text-[2.7rem] leading-[0.98] sm:text-[4.8rem]"><HeroWords text={title} /></h1>
        {text && <p className="rise mt-5 max-w-2xl text-[18.5px] leading-[1.6] text-white/90" style={{ animationDelay: "200ms" }}>{text}</p>}
        {children && <div className="rise mt-7" style={{ animationDelay: "280ms" }}>{children}</div>}
      </Container>
    </section>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
