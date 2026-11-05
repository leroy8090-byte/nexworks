"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { projectCategories, projects } from "@/data/projects";
import { cn, ease } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

export function PortfolioGrid() {
  const [active, setActive] = useState("tous");
  const visible = active === "tous" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div role="group" aria-label="Filtrer les réalisations par catégorie" className="flex flex-wrap gap-2.5">
        {projectCategories.map((c) => {
          const on = c.key === active;
          return (
            <button
              key={c.key}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c.key)}
              className={cn(
                "relative rounded-full border px-5 py-2.5 text-sm font-medium transition-colors active:scale-95",
                on ? "border-transparent text-ink" : "border-white/12 text-mist hover:border-sky/50 hover:text-white",
              )}
            >
              {on && (
                <motion.span
                  layoutId="portfolio-filter"
                  className="absolute inset-0 rounded-full bg-gradient-to-b from-[#6cc6f6] to-sky-bright shadow-[0_8px_24px_-8px_rgba(54,169,232,0.7)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{c.label}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-mist" aria-live="polite">
        {visible.length} projet{visible.length > 1 ? "s" : ""} affiché{visible.length > 1 ? "s" : ""}
      </p>

      <motion.div layout className="mt-8 grid gap-x-6 gap-y-14 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
