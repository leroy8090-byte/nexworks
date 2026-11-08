import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ArrowUpRight } from "@/components/ui/Icons";
import { projectPath, type Lang } from "@/i18n/lang";

const T = {
  fr: {
    discover: "Découvrir le projet",
    concept: "concept de refonte",
    demo: "site de démonstration",
    conceptTag: "Concept de refonte",
    demoTag: "Démonstration",
    view: "Voir le projet",
    conceptNote: "Concept réalisé de notre initiative, sans commande ni validation de l'entreprise concernée : ce n'est pas un client.",
    demoNote: "Réalisé par NEXWORKS pour un établissement fictif, et non pour un client réel.",
    open: "Ouvrir le site",
  },
  en: {
    discover: "Discover the project",
    concept: "redesign concept",
    demo: "demo website",
    conceptTag: "Redesign concept",
    demoTag: "Demo",
    view: "View the project",
    conceptNote: "A concept created on our own initiative, without a commission or the company's approval: this is not a client.",
    demoNote: "Built by NEXWORKS for a fictional business, not for a real client.",
    open: "Open the site",
  },
};

/** Au survol, la vraie page du projet défile dans la fenêtre. */
export function ProjectCard({ project: p, sizes = "(max-width: 768px) 92vw, 640px", compact, heading = "h3", lang = "fr" }: { project: Project; sizes?: string; compact?: boolean; /** Niveau du titre : h2 quand la carte suit directement le titre de la page */ heading?: "h2" | "h3"; lang?: Lang }) {
  const Heading = heading;
  const t = T[lang];
  const href = projectPath(lang, p.slug);
  const view = (p.images.desktop.width * 10) / 16;
  const to = `${-(1 - view / p.images.desktop.height) * 100}%`;
  return (
    <article className="group relative">
      <Link href={href} className="block transition-transform duration-500 group-hover:-translate-y-1.5">
        <span className="sr-only">{t.discover} {p.name}</span>
        <BrowserFrame url={`${p.name.toLowerCase()} · ${p.concept ? t.concept : t.demo}`}>
          <div className="relative aspect-[16/10] overflow-hidden bg-ink-3">
            <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 z-10 flex translate-y-2 items-center gap-1.5 rounded-full bg-sky px-3.5 py-1.5 text-sm font-bold text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {t.view} <ArrowUpRight className="size-4" />
            </span>
            <Image
              src={p.images.desktop.src}
              alt={p.alt}
              width={p.images.desktop.width}
              height={p.images.desktop.height}
              sizes={sizes}
              loading="lazy"
              className="nx-pan-touch block h-auto w-full translate-y-0 transition-transform duration-[9s] ease-linear group-hover:translate-y-[var(--to)]"
              style={{ ["--to" as string]: to }}
            />
          </div>
        </BrowserFrame>
      </Link>
      <div className="mt-5">
        <p className="text-sm text-mist">
          {p.categoryLabel} · <span className="font-semibold text-sky">{p.concept ? t.conceptTag : t.demoTag}</span>
        </p>
        <Heading className="mt-1.5 font-display text-3xl font-bold text-white">{p.name}</Heading>
        <p className="mt-2 text-base leading-relaxed text-mist">{p.summary}</p>
        {!compact && (
          <p className="mt-3 text-sm leading-relaxed text-mist/85">
            {p.concept ? t.conceptNote : t.demoNote}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-x-6 text-[15px] font-bold">
          <Link href={href} className="inline-flex min-h-11 items-center text-white underline-offset-4 hover:underline">
            {t.discover} →
          </Link>
          {p.demoUrl && (
            <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-sky underline-offset-4 hover:underline">
              {t.open} <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
