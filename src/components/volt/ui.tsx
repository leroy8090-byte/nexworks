"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { volt } from "@/data/volt";

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function VoltButton({ href, variant = "primary", children, className = "", ...rest }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6FF3D] disabled:opacity-60";
  const styles = {
    primary: "bg-[#C6FF3D] text-[#101010] hover:bg-[#F5F5F0] hover:-translate-y-0.5",
    secondary: "border border-[#F5F5F0]/70 text-[#F5F5F0] hover:border-[#C6FF3D] hover:text-[#C6FF3D]",
    ghost: "text-[#C6FF3D] hover:text-[#F5F5F0] px-0 underline-offset-8 hover:underline",
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
  y = 30,
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
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
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
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="text-[12px] font-extrabold uppercase tracking-[0.3em] text-[#C6FF3D]">{eyebrow}</p>}
      <h2 className="mt-3 font-[family-name:var(--font-volt-display)] text-[3.2rem] uppercase leading-[0.95] text-[#F5F5F0] sm:text-[4.6rem]">
        {title}
      </h2>
      {text && <p className="mt-5 text-[16px] leading-[1.8] text-[#F5F5F0]/65">{text}</p>}
    </Reveal>
  );
}

/** Photo plein cadre sur fond sombre (le fond reste visible si l'image est absente). */
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#1B1B1B] ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
    </div>
  );
}

export function DemoBanner() {
  return (
    <div className="bg-[#C6FF3D] px-4 py-2 text-center text-[11.5px] font-semibold leading-snug tracking-[0.03em] text-[#101010]">
      Site de démonstration réalisé par{" "}
      <Link href="/" className="underline underline-offset-2 hover:no-underline">
        NEXWORKS AGENCY
      </Link>{" "}
      — club fictif, tarifs et contenus imaginaires.
    </div>
  );
}

export function ContactHint({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[13px] leading-relaxed text-[#858585] ${className}`}>
      {volt.phone || volt.email
        ? "Coordonnées renseignées pour la démonstration."
        : "Aucune coordonnée réelle n'est affichée : ce club est fictif. Utilisez le formulaire de démonstration."}
    </p>
  );
}

export function Counter({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      <span aria-hidden>
        {n.toLocaleString("fr-FR")}
        {suffix}
      </span>
    </span>
  );
}

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="border-b border-[#F5F5F0]/10">
      <Wrap className="py-16 sm:py-24">
        <Reveal>
          <p className="text-[12px] font-extrabold uppercase tracking-[0.3em] text-[#C6FF3D]">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-volt-display)] text-[4rem] uppercase leading-[0.9] text-[#F5F5F0] sm:text-[7rem]">
            {title}
          </h1>
          {text && <p className="mt-6 max-w-2xl text-[17px] leading-[1.8] text-[#F5F5F0]/65">{text}</p>}
        </Reveal>
      </Wrap>
    </section>
  );
}
