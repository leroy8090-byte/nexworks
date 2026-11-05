import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const btn = {
  flame: "bg-or-flame text-or-ink hover:bg-[#ff7640]",
  ink: "bg-or-ink text-white hover:bg-black",
  ghost: "border-2 border-white/30 text-white hover:border-white hover:bg-white hover:text-or-ink",
  line: "border-2 border-or-ink/25 text-or-ink hover:border-or-ink hover:bg-or-ink hover:text-white",
};

export const btnCls = (variant: keyof typeof btn = "flame", className?: string) =>
  cn(
    "group inline-flex min-h-14 items-center justify-center gap-2 rounded-lg px-7 py-3 text-center text-base font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    btn[variant],
    className,
  );

export function Btn({ variant = "flame", className, children, arrow, ...rest }: ComponentProps<typeof Link> & { variant?: keyof typeof btn; arrow?: boolean; children: ReactNode }) {
  return (
    <Link className={btnCls(variant, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export const Arrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={cn("size-5 transition-transform duration-300 group-hover:translate-x-1", className)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Wrap = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>
);

/** Panneau de signalisation : l'étiquette de section du site. */
export const Sign = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn("inline-flex rounded bg-or-flame px-2.5 py-1 font-[family-name:var(--font-orea-display)] text-lg font-extrabold uppercase leading-none tracking-wide text-or-ink", className)}>{children}</p>
);

/** Bande de route animée : sépare les sections. */
export const RoadBand = ({ className }: { className?: string }) => (
  <div aria-hidden className={cn("orea-road h-10 bg-[#24272b]", className)} />
);

export function PageTop({ sign, title, text, children }: { sign: string; title: ReactNode; text?: string; children?: ReactNode }) {
  return (
    <section className="bg-or-ink pb-14 pt-36 text-white sm:pb-20 sm:pt-44">
      <Wrap>
        <div className="rise">
          <Sign>{sign}</Sign>
        </div>
        <h1 className="rise mt-5 max-w-5xl text-[clamp(3.2rem,9vw,8rem)]" style={{ animationDelay: "0.08s" }}>
          {title}
        </h1>
        {text && (
          <p className="rise mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl" style={{ animationDelay: "0.16s" }}>
            {text}
          </p>
        )}
        {children}
      </Wrap>
    </section>
  );
}

export const Spec = ({ label, value }: { label: string; value: ReactNode }) => (
  <div>
    <dt className="text-sm text-current/70">{label}</dt>
    <dd className="font-[family-name:var(--font-orea-display)] text-2xl font-extrabold uppercase leading-tight">{value}</dd>
  </div>
);
