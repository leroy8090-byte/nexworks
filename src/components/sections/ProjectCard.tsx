import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ProjectMockup } from "@/components/visuals/ProjectMockups";

export function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <SpotlightCard
      as="article"
      className="group flex h-full flex-col transition-transform duration-500 hover:-translate-y-1.5"
    >
      <div className="relative overflow-hidden border-b border-white/[0.07] bg-gradient-to-b from-ink-3 to-ink-2 p-5 sm:p-8">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="relative">
          <ProjectMockup images={project.images} label={project.alt} url={`${project.name} · site de démonstration`} />
        </div>
        {project.demo && (
          <span className="absolute left-5 top-5 rounded-full border border-sky/30 bg-ink/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky backdrop-blur sm:left-8 sm:top-8">
            Projet de démonstration
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky">{project.categoryLabel}</p>
        <h3 className={`mt-3 font-display font-semibold text-white ${large ? "text-3xl" : "text-2xl"}`}>
          {project.name}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-mist">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.highlights.map((h) => (
            <li key={h} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs leading-relaxed text-mist/70">
          Site de démonstration réalisé par NEXWORKS AGENCY pour un établissement ou une entreprise fictifs, et non pour un client réel.
        </p>
        <div className="mt-auto flex items-center justify-between pt-7">
          <Button href={`/realisations/${project.slug}`} variant="secondary" arrow className="after:absolute after:inset-0 after:content-['']">
            Découvrir le projet
          </Button>
        </div>
      </div>
    </SpotlightCard>
  );
}
