import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary:
    "btn-shine relative overflow-hidden bg-gradient-to-b from-[#6cc6f6] to-sky-bright text-ink font-semibold shadow-[0_0_0_1px_rgba(255,255,255,0.18)_inset,0_10px_30px_-8px_rgba(54,169,232,0.65)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25)_inset,0_14px_40px_-6px_rgba(54,169,232,0.85)] hover:-translate-y-0.5",
  secondary:
    "border border-white/15 bg-white/[0.03] text-white backdrop-blur hover:border-sky/60 hover:bg-white/[0.07] hover:-translate-y-0.5",
  ghost: "text-white/80 hover:text-white",
  dark: "bg-ink text-white font-semibold shadow-[0_14px_40px_-12px_rgba(0,0,0,0.6)] hover:bg-black hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-7 text-[15px]",
};

const baseCls =
  "group inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap select-none transition-all duration-300 ease-out active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

export function Button(
  props: Common & ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">),
): ReactNode;
export function Button(
  props: Common & ({ href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">),
): ReactNode;
export function Button(props: Common & Record<string, unknown>) {
  const { variant = "primary", size = "md", arrow, className, children, href, ...rest } = props;
  const cls = cn(baseCls, variants[variant], sizes[size], className);
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowRight className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );
  if (typeof href === "string") {
    return (
      <Link href={href} className={cls} {...(rest as object)}>
        {content}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as object)}>
      {content}
    </button>
  );
}
