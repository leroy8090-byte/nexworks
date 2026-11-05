import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ArrowUpRight } from "@/components/ui/Icons";

/** Au survol, la vraie page du projet défile dans la fenêtre. */
export function ProjectCard({ project: p, sizes = "(max-width: 768px) 92vw, 640px", compact }: { project: Project; sizes?: string; compact?: boolean }) {
  const view = (p.images.desktop.width * 10) / 16;
  const to = `${-(1 - view / p.images.desktop.height) * 100}%`;
  return (
    <article className="group relative">
      <Link href={`/realisations/${p.slug}`} className="block transition-transform duration-500 group-hover:-translate-y-1.5" aria-label={`Découvrir le projet ${p.name}`}>
        <BrowserFrame url={`${p.name.toLowerCase()} · ${p.concept ? "concept de refonte" : "site de démonstration"}`}>
          <div className="relative aspect-[16/10] overflow-hidden bg-ink-3">
            <Image
              src={p.images.desktop.src}
              alt={p.alt}
              width={p.images.desktop.width}
              height={p.images.desktop.height}
              sizes={sizes}
              loading="lazy"
              className="block h-auto w-full translate-y-0 transition-transform duration-[9s] ease-linear group-hover:translate-y-[var(--to)]"
              style={{ ["--to" as string]: to }}
            />
          </div>
        </BrowserFrame>
      </Link>
      <div className="mt-5">
        <p className="text-sm text-mist">
          {p.categoryLabel} · <span className="font-semibold text-sky">{p.concept ? "Concept de refonte" : "Démonstration"}</span>
        </p>
        <h3 className="mt-1.5 font-display text-3xl font-bold text-white">{p.name}</h3>
        <p className="mt-2 text-base leading-relaxed text-mist">{p.summary}</p>
        {!compact && (
          <p className="mt-3 text-sm leading-relaxed text-mist/85">
            {p.concept
              ? "Concept réalisé de notre initiative, sans commande ni validation de l'entreprise concernée : ce n'est pas un client."
              : "Réalisé par NEXWORKS pour un établissement fictif, et non pour un client réel."}
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] font-bold">
          <Link href={`/realisations/${p.slug}`} className="text-white underline-offset-4 hover:underline">
            Découvrir le projet →
          </Link>
          {p.demoUrl && (
            <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sky underline-offset-4 hover:underline">
              Ouvrir le site <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
