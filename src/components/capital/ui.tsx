"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const serif = "font-[family-name:var(--font-cap-serif)]";

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-14 ${className}`}>{children}</div>;
}

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "light" | "sand";
  children: ReactNode;
  className?: string;
  arrow?: boolean;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function CapButton({ href, variant = "primary", children, className = "", arrow = true, ...rest }: ButtonProps) {
  const base =
    "group/btn inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[13.5px] font-semibold tracking-[0.02em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183B50] disabled:opacity-60 active:scale-[0.98]";
  const styles = {
    primary: "bg-[#183B50] text-[#F8F7F3] hover:bg-[#252A2D]",
    secondary: "border border-[#183B50]/40 text-[#183B50] hover:border-[#183B50] hover:bg-[#183B50] hover:text-[#F8F7F3]",
    light: "border border-[#F8F7F3]/70 text-[#F8F7F3] hover:bg-[#F8F7F3] hover:text-[#183B50]",
    sand: "bg-[#E8E0D4] text-[#183B50] hover:bg-[#F8F7F3]",
  }[variant];
  const cls = `${base} ${styles} ${className}`;
  const arrowEl = arrow ? (
    <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1">
      →
    </span>
  ) : null;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
        {arrowEl}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
      {arrowEl}
    </button>
  );
}

export function Reveal({ children, delay = 0, className = "", y = 22 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.26em] ${light ? "text-[#E8E0D4]" : "text-[#183B50]"}`}>
      <span aria-hidden className={`h-px w-8 ${light ? "bg-[#E8E0D4]/70" : "bg-[#183B50]/50"}`} />
      {children}
    </p>
  );
}

export function SectionHead({ eyebrow, title, text, light = false, className = "" }: { eyebrow?: string; title: string; text?: string; light?: boolean; className?: string }) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className={`${serif} mt-5 text-[2.3rem] font-normal leading-[1.08] tracking-[-0.01em] sm:text-[3.1rem] ${light ? "text-[#F8F7F3]" : "text-[#252A2D]"}`}>{title}</h2>
      {text && <p className={`mt-5 text-[16.5px] leading-[1.8] ${light ? "text-[#F8F7F3]/75" : "text-[#252A2D]/70"}`}>{text}</p>}
    </Reveal>
  );
}

export function DemoBanner() {
  return (
    <div className="bg-[#252A2D] px-4 py-2 text-center text-[11.5px] leading-snug text-[#E8E0D4]">
      Concept de refonte réalisé par{" "}
      <Link href="/" className="underline underline-offset-2 hover:text-white">
        NEXWORKS AGENCY
      </Link>{" "}
      — annonces de test et photographies d&apos;illustration.{" "}
      <Link href="/realisations/capital-immobilier" className="underline underline-offset-2 hover:text-white">
        En savoir plus
      </Link>
    </div>
  );
}

/** Mention visible sur toutes les listes et fiches de biens : l'agence nommée ici est réelle, ces annonces ne sont pas les siennes. À retirer quand elle saisira ses vrais biens. */
export function DemoNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`rounded-sm border border-[#B07A52]/40 bg-[#B07A52]/10 px-4 py-3 text-[13px] leading-relaxed text-[#252A2D] ${className}`} role="note">
      <strong className="font-semibold">Annonces de test.</strong> Ces biens sont saisis dans le logiciel NEXWORKS ESTATE pour tester le site : ils ne sont pas
      commercialisés par CAPITAL IMMOBILIER. Les annonces réelles sont sur{" "}
      <a href="https://www.capitalimmobilier.fr/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
        capitalimmobilier.fr
      </a>
      .
    </p>
  );
}

export function PageIntro({ eyebrow, title, text, children }: { eyebrow: string; title: string; text?: string; children?: ReactNode }) {
  return (
    <section className="border-b border-[#E8E0D4] bg-[#F8F7F3]">
      <Wrap className="py-16 sm:py-24">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className={`${serif} mt-6 max-w-4xl text-[2.8rem] font-normal leading-[1.04] tracking-[-0.015em] text-[#252A2D] sm:text-[4.4rem]`}>{title}</h1>
          {text && <p className="mt-7 max-w-2xl text-[17.5px] leading-[1.8] text-[#252A2D]/70">{text}</p>}
          {children}
        </Reveal>
      </Wrap>
    </section>
  );
}

export function JsonLdScript({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
