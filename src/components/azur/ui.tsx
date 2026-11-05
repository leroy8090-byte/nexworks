import Link from "next/link";
import type { ReactNode } from "react";
import { azur, type PictoKey } from "@/data/azur";
import { cn } from "@/lib/utils";

export function Wrap({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8", className)}>{children}</div>;
}

type Variant = "hot" | "cobalt" | "white" | "line" | "line-light";
const variants: Record<Variant, string> = {
  hot: "bg-az-hot-deep text-white hover:bg-az-hot",
  cobalt: "bg-az-cobalt text-white hover:bg-az-deep",
  white: "bg-white text-az-ink hover:bg-az-brass",
  line: "border-2 border-az-ink text-az-ink hover:bg-az-ink hover:text-white",
  "line-light": "border-2 border-white/60 text-white hover:border-white hover:bg-white hover:text-az-ink",
};
export const btnCls = (variant: Variant = "cobalt", extra?: string) =>
  cn("inline-flex min-h-14 items-center justify-center gap-2.5 rounded-xl px-6 text-center text-base font-bold transition-colors", variants[variant], extra);

export const Arrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden className={cn("size-5 shrink-0", className)}>
    <path d="M3 10h13M11 4.5 16.5 10 11 15.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Btn({ href, variant, children, className, arrow }: { href: string; variant?: Variant; children: ReactNode; className?: string; arrow?: boolean }) {
  return (
    <Link href={href} className={btnCls(variant, className)}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

/** Petite plaque au-dessus des titres. */
export function Sign({ children, tone = "cobalt" }: { children: ReactNode; tone?: "cobalt" | "hot" | "light" }) {
  const cls = { cobalt: "bg-az-cobalt text-white", hot: "bg-az-hot-deep text-white", light: "bg-white text-az-cobalt" }[tone];
  return <p className={cn("inline-flex rounded-md px-3 py-1 text-[14px] font-bold", cls)}>{children}</p>;
}

/** Le logo : une plaque émaillée ronde, avec une goutte. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("size-10 shrink-0", className)}>
      <circle cx="24" cy="24" r="23" fill="#fff" />
      <circle cx="24" cy="24" r="20" fill="#1538b5" />
      <circle cx="24" cy="24" r="17.5" fill="none" stroke="#fff" strokeWidth="1.2" />
      <path d="M24 10c5.2 7 8.5 11.4 8.5 15.6a8.5 8.5 0 0 1-17 0C15.5 21.4 18.8 17 24 10Z" fill="#fff" />
      <path d="M20 27a4.2 4.2 0 0 0 4 3.8" fill="none" stroke="#1538b5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const paths: Record<PictoKey, ReactNode> = {
  wrench: (
    <>
      <path d="M38 8a10.5 10.5 0 0 0-11 14.5L9.5 40a4.6 4.6 0 0 0 6.5 6.5L33.5 29A10.5 10.5 0 0 0 48 18l-6.5 6.5-6-1.5-1.5-6L40.5 10.5A10.5 10.5 0 0 0 38 8Z" />
    </>
  ),
  drop: (
    <>
      <path d="M28 7c9 12.5 15 20 15 27.5a15 15 0 0 1-30 0C13 27 19 19.5 28 7Z" />
      <path d="M21 36a7.5 7.5 0 0 0 7 7" />
    </>
  ),
  drain: (
    <>
      <path d="M8 13h40" />
      <path d="M13 13c0 10 6 15 15 15s15-5 15-15" />
      <path d="M28 28v6c0 4 3 6 6 6h5c3 0 5 2 5 5v4" />
      <path d="M18 21h.01M28 22h.01M38 21h.01" />
    </>
  ),
  tap: (
    <>
      <path d="M12 26h19a9 9 0 0 1 9 9v3h-9v-3H12Z" />
      <path d="M21 26v-9" />
      <path d="M12 17h18" />
      <path d="M36 44c-2 2.5-3 3.7-3 5a3 3 0 0 0 6 0c0-1.3-1-2.5-3-5Z" />
    </>
  ),
  heater: (
    <>
      <rect x="15" y="6" width="26" height="38" rx="9" />
      <path d="M22 44v6M34 44v6" />
      <path d="M15 19h26" />
      <path d="M28 25c3 4 4.5 6 4.5 8a4.5 4.5 0 0 1-9 0c0-2 1.5-4 4.5-8Z" />
    </>
  ),
  shower: (
    <>
      <path d="M14 50V16a9 9 0 0 1 18 0" />
      <path d="M22 22a10 6 0 0 1 20 0Z" />
      <path d="M26 30v3M32 30v5M38 30v3M29 40v3M35 41v3" />
    </>
  ),
};

/** Pictogrammes dessinés pour les six services. */
export function Picto({ name, className }: { name: PictoKey; className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={cn("size-14", className)}>
      {paths[name]}
    </svg>
  );
}

export const Check = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden className={cn("size-5 shrink-0", className)}>
    <path d="m4 10.5 4 4L16 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** En haut des pages intérieures : émail et carreaux. */
export function PageTop({ sign, title, text, children, compact }: { sign: string; title: string; text?: string; children?: ReactNode; compact?: boolean }) {
  return (
    <section className={cn("az-tiles az-tiles-dark relative overflow-hidden bg-az-cobalt text-white", compact ? "pb-8 pt-28 sm:pb-10 sm:pt-32" : "pb-16 pt-32 sm:pb-24 sm:pt-44")}>
      <Wrap>
        <div className="az-rise">
          <Sign tone="light">{sign}</Sign>
        </div>
        <h1 className={cn("az-rise max-w-5xl", compact ? "mt-3 text-[clamp(2.3rem,4.5vw,3.8rem)]" : "mt-5 text-[clamp(2.9rem,7.5vw,6.8rem)]")} style={{ animationDelay: ".08s" }}>{title}</h1>
        {text && <p className={cn("az-rise max-w-2xl leading-relaxed text-white/85", compact ? "mt-3 text-lg" : "mt-5 text-lg sm:text-xl")} style={{ animationDelay: ".16s" }}>{text}</p>}
        {children && <div className="az-rise mt-8" style={{ animationDelay: ".24s" }}>{children}</div>}
      </Wrap>
    </section>
  );
}

/** Numéro masqué tant que la démo n'a pas de numéro fourni : personne ne risque d'appeler un inconnu. */
export function PhoneLine({ className }: { className?: string }) {
  if (azur.phone) return <a href={`tel:${azur.phone.replace(/\s/g, "")}`} className={cn("font-bold underline underline-offset-4", className)}>{azur.phone}</a>;
  return <span className={className}>04 •• •• •• ••<span className="sr-only"> (numéro masqué sur ce site de démonstration)</span></span>;
}

/** Un bloc de fin de page, avec les deux portes d'entrée. */
export function EndCta({ title = "On regarde ça ensemble ?", text = "Décrivez votre problème ou votre projet en deux minutes. Une photo suffit souvent." }: { title?: string; text?: string }) {
  return (
    <section className="az-tiles az-tiles-dark bg-az-deep py-20 text-white sm:py-28">
      <Wrap>
        <h2 className="max-w-4xl text-[clamp(2.7rem,6.5vw,5.8rem)]">{title}</h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">{text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Btn href="/azur-plomberie/contact?urgence=1" variant="hot" arrow>C&apos;est urgent</Btn>
          <Btn href="/azur-plomberie/contact" variant="white" arrow>J&apos;ai un projet</Btn>
        </div>
      </Wrap>
    </section>
  );
}
