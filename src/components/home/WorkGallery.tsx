"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { Container, SectionHeading } from "@/components/ui/Section";

/** Galerie à faire glisser : au doigt, à la souris, au clavier ou avec les flèches. */
export function WorkGallery() {
  const ref = useRef<HTMLUListElement>(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const move = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 680), behavior: reduce ? "auto" : "smooth" });
  };
  const arrow = "flex size-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-ink";

  return (
    <section id="realisations" className="pb-24 pt-20 sm:pb-32 sm:pt-28">
      <Container className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Exemples" title="Regardez plutôt *ce que nous construisons.*" text="Dans chaque fenêtre, c'est la vraie page qui défile." />
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => move(-1)} aria-label="Projets précédents" className={arrow}>
            <ArrowRight className="size-5 rotate-180" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Projets suivants" className={arrow}>
            <ArrowRight className="size-5" />
          </button>
        </div>
      </Container>

      <ul
        ref={ref}
        tabIndex={0}
        aria-label="Réalisations"
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-5 px-5 pb-2 sm:scroll-pl-8 sm:px-8 lg:gap-8 xl:scroll-pl-[max(2.5rem,calc((100vw-1240px)/2))] xl:px-[max(2.5rem,calc((100vw-1240px)/2))]"
      >
        {projects.map((p) => (
          <li key={p.slug} className="w-[86vw] max-w-[620px] shrink-0 snap-start sm:w-[62vw] lg:w-[44vw]">
            <ProjectCard project={p} compact sizes="(max-width: 640px) 86vw, 620px" />
          </li>
        ))}
      </ul>

      <Container className="mt-10">
        <div className="h-0.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
          <motion.div style={{ scaleX: scrollXProgress }} className="h-full origin-left bg-sky" />
        </div>
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-mist">
            Ces projets sont des sites de démonstration pour des établissements fictifs. Ce ne sont pas des clients.
          </p>
          <Button href="/realisations" variant="secondary" arrow className="self-start sm:self-auto">
            Tous les projets
          </Button>
        </div>
      </Container>
    </section>
  );
}
