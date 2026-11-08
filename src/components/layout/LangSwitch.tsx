"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { counterpartPath, langs, type Lang } from "@/i18n/lang";
import { useLang } from "@/i18n/use-lang";
import { cn } from "@/lib/utils";

const names: Record<Lang, { code: string; label: string }> = {
  fr: { code: "FR", label: "Passer en français" },
  en: { code: "EN", label: "Switch to English" },
};

/** Sélecteur de langue : la langue active est en bleu ciel, l'autre mène à la même page traduite. */
export function LangSwitch({ className, compact }: { className?: string; /** Version réduite (barre d'en-tête sur ordinateur) */ compact?: boolean }) {
  const lang = useLang();
  const pathname = usePathname() || "/";
  const item = cn("inline-flex items-center justify-center rounded-full px-3 text-[13px] font-bold tracking-wide transition-colors", compact ? "min-h-9 min-w-9" : "min-h-11 min-w-11");
  return (
    <div role="group" aria-label={lang === "en" ? "Language" : "Langue"} className={cn("inline-flex items-center rounded-full border border-white/15 p-0.5", className)}>
      {langs.map((l) =>
        l === lang ? (
          <span key={l} lang={l} aria-current="true" className={cn(item, "bg-sky text-ink")}>
            {names[l].code}
          </span>
        ) : (
          <Link key={l} href={counterpartPath(pathname, l)} lang={l} hrefLang={l} className={cn(item, "text-white/75 hover:bg-white/10 hover:text-white")}>
            {names[l].code}
            <span className="sr-only"> : {names[l].label}</span>
          </Link>
        ),
      )}
    </div>
  );
}
