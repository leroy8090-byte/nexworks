import { projects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Glow, SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  return (
    <section id="realisations" className="relative overflow-hidden py-24 sm:py-32">
      <Glow className="-right-40 top-1/3 h-[640px] w-[640px]" tone="deep" />
      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Nos réalisations"
            title="Des expériences digitales pensées pour faire *la différence.*"
            text="Trois sites de démonstration réalisés par NEXWORKS : restaurant, hôtel et artisan plombier."
          />
          <Reveal>
            <Button href="/realisations" variant="secondary" arrow className="shrink-0">
              Toutes les réalisations
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
