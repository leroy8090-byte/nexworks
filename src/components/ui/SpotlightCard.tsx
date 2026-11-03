"use client";

import { useCallback, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/** Carte translucide avec halo lumineux qui suit le curseur (survol). */
export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const onMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
  return (
    <Tag onMouseMove={onMove} className={cn("spotlight glass relative overflow-hidden rounded-3xl", className)}>
      {children}
    </Tag>
  );
}
