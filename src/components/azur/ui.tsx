"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { azur } from "@/data/azur";

export function Wrap({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1180px] px-5 sm:px-8", className)}>{children}</div>;
}

export function AzurButton({
  href,
  children,
  variant = "primary",
  className,
  type,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const styles = {
    primary:
      "bg-[#FFC107] text-[#002D72] hover:bg-[#ffb300] shadow-[0_10px_28px_-12px_rgba(255,193,7,.7)]",
    secondary: "border-2 border-[#0077C2] bg-white text-[#0077C2] hover:bg-[#E3F6FD]",
    ghost: "border border-white/40 bg-white/10 text-white hover:bg-white/20",
    dark: "bg-[#002D72] text-white hover:bg-[#003a8c]",
  }[variant];
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FC3F7]",
    styles,
    className,
  );
  if (href) {
    const external = href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) return <a href={href} className={cls}>{children}</a>;
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  light,
  center,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("text-[12px] font-bold uppercase tracking-[0.18em]", light ? "text-[#4FC3F7]" : "text-[#0077C2]")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("mt-3 font-[family-name:var(--font-azur-display)] text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-[2.55rem]", light ? "text-white" : "text-[#002D72]")}>
        {title}
      </h2>
      {text && <p className={cn("mt-4 text-[17px] leading-relaxed", light ? "text-white/75" : "text-[#536273]")}>{text}</p>}
    </div>
  );
}

export function DemoBanner() {
  return (
    <div className="bg-[#001a4a] px-4 py-2 text-center text-[12.5px] text-[#b7c8d8]">
      Projet de démonstration fictif réalisé pour le portfolio{" "}
      <Link href="/realisations" className="font-semibold text-[#4FC3F7] underline-offset-2 hover:underline">
        NEXWORKS AGENCY
      </Link>
      . Entreprise non réelle.
    </div>
  );
}

export function ContactHint() {
  if (azur.phone || azur.email) return null;
  return (
    <p className="rounded-xl border border-[#4FC3F7]/30 bg-[#4FC3F7]/10 px-4 py-3 text-[13px] leading-relaxed text-[#002D72]">
      Aucun numéro ni e-mail n&apos;est affiché sur ce concept : renseignez{" "}
      <code className="rounded bg-white/70 px-1">NEXT_PUBLIC_AZUR_PHONE</code> et{" "}
      <code className="rounded bg-white/70 px-1">NEXT_PUBLIC_AZUR_EMAIL</code> pour les activer.
    </p>
  );
}
