import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fenêtre de navigateur autour d'une capture ou d'un aperçu. */
export function BrowserFrame({ url, children, className }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-white/15 bg-ink-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] sm:rounded-2xl", className)}>
      {/* Barre d'adresse décorative : ignorée par les lecteurs d'écran (le lien autour porte son propre nom) */}
      <div aria-hidden className="flex h-7 items-center gap-1.5 border-b border-white/10 bg-[#14181d] px-3 sm:h-8">
        <span className="size-[7px] rounded-full bg-white/25" />
        <span className="size-[7px] rounded-full bg-white/25" />
        <span className="size-[7px] rounded-full bg-white/25" />
        <span className="ml-2 flex h-[18px] min-w-0 flex-1 items-center truncate rounded-md bg-white/[0.07] px-2.5 text-[10px] text-mist">{url}</span>
      </div>
      {children}
    </div>
  );
}
