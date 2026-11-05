"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { motion } from "framer-motion";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { riviera } from "@/data/riviera";

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "light";
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function RivieraButton({ href, variant = "primary", children, className = "", ...rest }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#68715B] disabled:opacity-60";
  const styles = {
    primary: "bg-[#24251F] text-[#FFFEFA] hover:bg-[#68715B]",
    secondary: "border border-[#24251F] text-[#24251F] hover:bg-[#24251F] hover:text-[#FFFEFA]",
    light: "border border-[#FFFEFA]/70 text-[#FFFEFA] hover:bg-[#FFFEFA] hover:text-[#24251F]",
  }[variant];
  const cls = `${base} ${styles} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
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
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useCalmMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
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
    <Reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`text-[11.5px] font-semibold uppercase tracking-[0.28em] ${light ? "text-[#D9CBB7]" : "text-[#68715B]"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-4 font-[family-name:var(--font-riviera-display)] text-[2.3rem] font-light leading-[1.08] sm:text-[3.1rem] ${
          light ? "text-[#FFFEFA]" : "text-[#24251F]"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-5 text-[16px] leading-[1.8] ${light ? "text-[#FFFEFA]/75" : "text-[#858178]"}`}>{text}</p>
      )}
    </Reveal>
  );
}

export function DemoBanner() {
  return (
    <div className="bg-[#24251F] px-4 py-2 text-center text-[11.5px] leading-snug tracking-[0.04em] text-[#D9CBB7]">
      Site de démonstration réalisé par{" "}
      <Link href="/" className="underline underline-offset-2 hover:text-[#FFFEFA]">
        NEXWORKS AGENCY
      </Link>{" "}
      — agence fictive, biens et contenus imaginaires.
    </div>
  );
}

export function ContactHint({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[13px] leading-relaxed text-[#858178] ${className}`}>
      {riviera.phone || riviera.email
        ? "Coordonnées renseignées pour la démonstration."
        : "Aucune coordonnée réelle n'est affichée : cette agence est fictive. Utilisez le formulaire de démonstration."}
    </p>
  );
}

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="border-b border-[#D9CBB7]">
      <Wrap className="py-16 sm:py-24">
        <Reveal>
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.3em] text-[#68715B]">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-riviera-display)] text-[2.8rem] font-light leading-[1.05] text-[#24251F] sm:text-[4.4rem]">
            {title}
          </h1>
          {text && <p className="mt-6 max-w-2xl text-[17px] leading-[1.8] text-[#858178]">{text}</p>}
        </Reveal>
      </Wrap>
    </section>
  );
}
