import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedHeading } from "./AnimatedHeading";
import { Reveal } from "./Reveal";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-2 text-sm font-semibold text-sky", className)}>{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  as = "h2",
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  /** "light" : sur une section claire (.paper) */
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal className={cn("mb-4", align === "center" && "flex justify-center")}>
          <Eyebrow className={light ? "text-sky-deep" : undefined}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <AnimatedHeading
        as={as}
        text={title}
        className={cn(
          "font-display font-bold leading-[1.02]",
          as === "h1" ? "text-[clamp(2.6rem,6.4vw,5.6rem)]" : "text-[clamp(2.2rem,4.8vw,4.1rem)]",
          light ? "text-graphite" : "text-white",
        )}
      />
      {text && (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed", light ? "text-fog" : "text-mist", align === "center" && "mx-auto")}>{text}</p>
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
    <section className="relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      <Glow className="hero-drift -top-52 left-[12%] h-[620px] w-[920px]" />
      <Container className="relative">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} text={text} />
        {children && <Reveal delay={0.25} className="mt-10">{children}</Reveal>}
      </Container>
    </section>
  );
}
