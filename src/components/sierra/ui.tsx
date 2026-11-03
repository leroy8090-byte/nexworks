"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { sierra } from "@/data/sierra";

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "light" | "accent";
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function SierraButton({ href, variant = "primary", children, className = "", ...rest }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263B48] disabled:opacity-60";
  const styles = {
    primary: "bg-[#222421] text-[#FCFBF8] hover:bg-[#263B48]",
    secondary: "border border-[#222421] text-[#222421] hover:bg-[#222421] hover:text-[#FCFBF8]",
    light: "border border-[#FCFBF8]/75 text-[#FCFBF8] hover:bg-[#FCFBF8] hover:text-[#222421]",
    accent: "bg-[#263B48] text-[#FCFBF8] hover:bg-[#222421]",
  }[variant];
  const cls = `${base} ${styles} ${className}`;
  if (href) {
    const { onClick } = rest;
    return (
      <Link href={href} className={cls} onClick={onClick as never}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <Reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${light ? "text-[#D8C9B5]" : "text-[#263B48]"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-4 font-[family-name:var(--font-sierra-display)] text-[2.4rem] font-light leading-[1.08] sm:text-[3.25rem] ${
          light ? "text-[#FCFBF8]" : "text-[#222421]"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-5 text-[16px] leading-[1.85] ${light ? "text-[#FCFBF8]/78" : "text-[#77766F]"}`}>{text}</p>
      )}
    </Reveal>
  );
}

export function DemoBanner() {
  return (
    <div className="bg-[#263B48] px-4 py-2 text-center text-[11.5px] leading-snug tracking-wide text-[#FCFBF8]">
      Proposition de refonte — démonstration NEXWORKS AGENCY · non officielle ·{" "}
      <a href={sierra.officialSite} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
        catalogue officiel sierra-immo.fr
      </a>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <section className="border-b border-[#D8C9B5]/70 bg-[#F5F2EC] pb-14 pt-10 sm:pb-16 sm:pt-12">
      <Wrap>
        {eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#263B48]">{eyebrow}</p>}
        <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-sierra-display)] text-[2.8rem] font-light leading-[1.05] text-[#222421] sm:text-[4rem]">
          {title}
        </h1>
        {text && <p className="mt-5 max-w-2xl text-[16.5px] leading-[1.85] text-[#77766F]">{text}</p>}
      </Wrap>
    </section>
  );
}

export function ContactHint({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[12.5px] leading-relaxed text-[#77766F] ${className}`}>
      Horaires d&apos;ouverture : à confirmer auprès de l&apos;agence. Les formulaires de cette démonstration n&apos;envoient aucune donnée.
    </p>
  );
}
