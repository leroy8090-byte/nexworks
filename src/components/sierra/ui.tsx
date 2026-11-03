"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { sierra } from "@/data/sierra";

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "gold" | "ghost";
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function SierraButton({ href, variant = "primary", children, className = "", ...rest }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A68936] disabled:opacity-60";
  const styles = {
    primary: "bg-[#231F31] text-white hover:bg-[#A68936]",
    secondary: "border border-[#231F31] text-[#231F31] hover:bg-[#231F31] hover:text-white",
    gold: "bg-[#A68936] text-white hover:bg-[#231F31]",
    ghost: "border border-white/70 text-white hover:bg-white hover:text-[#231F31]",
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
  y = 22,
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
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
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
        <p className={`text-[11px] font-bold uppercase tracking-[0.32em] ${light ? "text-[#A68936]" : "text-[#A68936]"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 font-[family-name:var(--font-sierra-display)] text-[2.1rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.85rem] ${
          light ? "text-white" : "text-[#231F31]"
        }`}
      >
        {title}
      </h2>
      {text && <p className={`mt-4 text-[15.5px] leading-[1.8] ${light ? "text-white/75" : "text-[#7A7684]"}`}>{text}</p>}
    </Reveal>
  );
}

export function DemoBanner() {
  return (
    <div className="bg-[#A68936] px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
      Accès privé client · proposition de refonte non officielle ·{" "}
      <a href={sierra.officialSite} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
        sierra-immo.fr
      </a>
    </div>
  );
}

export function PageIntro({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <section className="border-b border-[#E8E4DE] bg-[#231F31] pb-14 pt-10 text-white sm:pb-16 sm:pt-12">
      <Wrap>
        {eyebrow && <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#A68936]">{eyebrow}</p>}
        <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-sierra-display)] text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[3.6rem]">
          {title}
        </h1>
        {text && <p className="mt-5 max-w-2xl text-[15.5px] leading-[1.8] text-white/70">{text}</p>}
      </Wrap>
    </section>
  );
}

export function ContactHint({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[12.5px] leading-relaxed text-[#7A7684] ${className}`}>
      Horaires : à confirmer auprès de l&apos;agence. Formulaires de cette démonstration sans envoi de données.
    </p>
  );
}
