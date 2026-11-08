import Image from "next/image";
import Link from "next/link";
import { pagePath, type Lang } from "@/i18n/lang";
import { cn } from "@/lib/utils";

/** Logo officiel NEXWORKS AGENCY (fichier fourni, détouré — proportions et couleurs d'origine). */
export function Logo({ className, priority, lang = "fr" }: { className?: string; priority?: boolean; lang?: Lang }) {
  return (
    <Link href={pagePath(lang, "home")} aria-label={lang === "en" ? "NEXWORKS AGENCY — Home" : "NEXWORKS AGENCY — Accueil"} className={cn("inline-flex shrink-0", className)}>
      <Image
        src="/brand/nexworks-logo.png"
        alt="NEXWORKS AGENCY"
        width={747}
        height={134}
        preload={priority}
        sizes="(max-width: 640px) 160px, 210px"
        className="h-full w-auto"
      />
    </Link>
  );
}
