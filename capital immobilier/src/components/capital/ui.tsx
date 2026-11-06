"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCalmMotion } from "@/lib/useCalmMotion";

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
    "group/btn inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E4F68] disabled:opacity-60 active:scale-[0.98]";
  const styles = {
    primary: "bg-[#B94F33] text-white hover:bg-[#9E3F27]",
    secondary: "border border-[#0E4F68]/40 text-[#0E4F68] hover:border-[#0E4F68] hover:bg-[#0E4F68] hover:text-[#FBF7EE]",
    light: "border border-[#FBF7EE]/70 text-[#FBF7EE] hover:bg-[#FBF7EE] hover:text-[#0E4F68]",
    sand: "bg-[#E9A93B] text-[#0B3A4C] hover:bg-[#F2BE5C]",
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
  const calm = useCalmMotion();
  if (calm) return <div className={className}>{children}</div>;
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

/** Une photo qui se dévoile en arrivant à l'écran. */
export function ImageReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const calm = useCalmMotion();
  if (calm) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(10% 6% 10% 6%)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** La vague qui sépare deux sections. Elle ondule doucement. */
export function Wave({ className = "" }: { className?: string }) {
  const d = `M0 30${"c75 0 110-24 187.5-24s112.5 24 187.5 24".repeat(4)}V70H0Z`;
  return (
    <div aria-hidden className={`overflow-hidden ${className}`}>
      <svg viewBox="0 0 1500 70" preserveAspectRatio="none" className="cap-wave block h-10 w-[200%] fill-current sm:h-16"><path d={d} /></svg>
    </div>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[15px] font-semibold ${light ? "text-[#E9A93B]" : "text-[#B94F33]"}`}>
      <span aria-hidden className={`size-2.5 rounded-full ${light ? "bg-[#E9A93B]" : "bg-[#B94F33]"}`} />
      {children}
    </p>
  );
}

export function SectionHead({ eyebrow, title, text, light = false, className = "" }: { eyebrow?: string; title: string; text?: string; light?: boolean; className?: string }) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className={`${serif} mt-5 text-[2.6rem] font-normal leading-[1.03] sm:text-[3.8rem] ${light ? "text-[#FBF7EE]" : "text-[#0B3A4C]"}`}>{title}</h2>
      {text && <p className={`mt-5 text-[17px] leading-[1.7] ${light ? "text-[#FBF7EE]/90" : "text-[#1F2D33]/80"}`}>{text}</p>}
    </Reveal>
  );
}

export function DemoBanner() {
  return (
    <div className="bg-[#1F2D33] px-4 py-2 text-center text-[11.5px] leading-snug text-[#F0E4CE]">
      Concept de refonte réalisé par{" "}
      <a href="https://www.nexworks.agency" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
        NEXWORKS AGENCY
      </a>{" "}
      — annonces de test et photographies d&apos;illustration.
    </div>
  );
}

/** Mention visible sur toutes les listes et fiches de biens : l'agence nommée ici est réelle, ces annonces ne sont pas les siennes. À retirer quand elle saisira ses vrais biens. */
export function DemoNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`rounded-sm border border-[#B94F33]/40 bg-[#B94F33]/10 px-4 py-3 text-[13px] leading-relaxed text-[#1F2D33] ${className}`} role="note">
      <strong className="font-semibold">Annonces de test.</strong> Ces biens sont saisis dans le logiciel NEXWORKS ESTATE pour tester le site : ils ne sont pas
      commercialisés par CAPITAL IMMOBILIER. Les annonces réelles sont sur{" "}
      <a href="https://www.capitalimmobilier.fr/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
        capitalimmobilier.fr
      </a>
      .
    </p>
  );
}

const INTRO_PHOTOS: Record<string, string> = {
  Acheter: "villa-palm",
  Louer: "living-sun",
  Vendre: "villa-pool",
  "Nos biens": "pool-white",
  "L'agence": "agence",
  Estimation: "estimation",
  Contact: "window-sea",
  "Gestion immobilière": "kitchen-open",
  "Gestion de copropriété": "white-balcony",
  "Mes favoris": "pool-sea",
  Informations: "balcony-hills",
};

/** En-tête de page : le titre à gauche, une photo dans une arche à droite. */
export function PageIntro({ eyebrow, title, text, children }: { eyebrow: string; title: string; text?: string; children?: ReactNode }) {
  const photo = INTRO_PHOTOS[eyebrow] ?? "pool-garden";
  return (
    <section className="relative overflow-hidden bg-[#F5ECDA]">
      <span aria-hidden className="cap-sun absolute -right-24 -top-32 size-[28rem] rounded-full bg-[radial-gradient(circle,#F2BE5C_0%,#E9A93B_55%,#E9A93B00_72%)]" />
      <Wrap className="relative grid items-end gap-8 pt-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:pt-16">
        <div className="pb-14 sm:pb-20">
          <div className="cap-rise"><Eyebrow>{eyebrow}</Eyebrow></div>
          <h1 className={`${serif} cap-title mt-4 text-[3rem] font-normal leading-[1] text-[#0B3A4C] sm:text-[4.9rem]`} style={{ animationDelay: ".1s" }}>{title}</h1>
          {text && <p className="cap-rise mt-6 max-w-2xl text-[18px] leading-[1.65] text-[#1F2D33]/85" style={{ animationDelay: ".3s" }}>{text}</p>}
          {children && <div className="cap-rise" style={{ animationDelay: ".4s" }}>{children}</div>}
        </div>
        <div className="cap-arch relative hidden aspect-[4/5] max-h-[28rem] w-full justify-self-end overflow-hidden rounded-t-full lg:block">
          <Image src={`/capital-immobilier/${photo}.webp`} alt="" fill preload sizes="50vw" className="object-cover" />
        </div>
      </Wrap>
    </section>
  );
}

export function JsonLdScript({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
