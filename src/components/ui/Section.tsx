import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedHeading } from "./AnimatedHeading";
import { Reveal } from "./Reveal";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky",
        className,
      )}
    >
      <span className="h-px w-8 bg-gradient-to-r from-sky to-transparent" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  as = "h2",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal className={cn("mb-5", align === "center" && "flex justify-center")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <AnimatedHeading
        as={as}
        text={title}
        className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.08] text-white"
      />
      {text && (
        <Reveal delay={0.15}>
          <p className="mt-6 text-base leading-relaxed text-mist sm:text-lg">{text}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Halos lumineux d'arrière-plan (dégradés radiaux : légers pour le GPU). */
export function Glow({ className, tone = "sky" }: { className?: string; tone?: "sky" | "deep" }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        background:
          tone === "sky"
            ? "radial-gradient(closest-side, rgba(85,189,242,0.20), rgba(85,189,242,0.06) 55%, transparent 100%)"
            : "radial-gradient(closest-side, rgba(54,169,232,0.10), transparent 100%)",
      }}
    />
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <Glow className="-top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2" />
      <Container className="relative">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} text={text} />
        {children && <Reveal delay={0.25} className="mt-10">{children}</Reveal>}
      </Container>
    </section>
  );
}
