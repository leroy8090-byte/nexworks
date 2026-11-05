"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { servicePagePath } from "@/data/service-pages";
import { services, type Service } from "@/data/services";
import { Plus } from "@/components/ui/Icons";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ServiceVisual, serviceVisualCaption } from "@/components/visuals/ServiceVisuals";
import { cn, ease } from "@/lib/utils";

function VisualPanel({ service }: { service: Service }) {
  return (
    <figure className="rounded-3xl bg-graphite p-3 sm:p-6">
      <ServiceVisual id={service.id} />
      <figcaption className="mt-3 text-center text-xs text-mist">{serviceVisualCaption[service.id]}</figcaption>
    </figure>
  );
}

/** Quatre besoins dits simplement : on en choisit un, l'illustration suit. */
export function ServicesExplorer() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="services" className="paper scroll-mt-24 pb-20 sm:pb-32">
      <Container>
        <SectionHeading tone="light" eyebrow="Ce qu'on fait pour vous" title="Quatre façons de *vous aider.*" />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <ul className="border-t border-graphite/15">
            {services.map((s, i) => {
              const open = i === active;
              return (
                <li key={s.id} className="border-b border-graphite/15">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={open}
                      className="group flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                    >
                      <span className={cn("font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold leading-tight transition-colors", open ? "text-graphite" : "text-graphite/55 group-hover:text-graphite")}>
                        {s.plainTitle}
                      </span>
                      <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300", open ? "rotate-45 border-graphite bg-graphite text-white" : "border-graphite/25 text-graphite")}>
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>
                  {/* Toujours présent dans la page : les robots d'IA lisent le texte sans exécuter le JavaScript. */}
                  <div className={cn("grid transition-[grid-template-rows] duration-500 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="overflow-hidden" inert={!open}>
                        <div className="pb-6">
                          <p className="text-[17px] leading-relaxed text-fog">{s.plainText}</p>
                          {s.note && <p className="mt-3 text-sm leading-relaxed text-fog">{s.note}</p>}
                          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                            <Link href={servicePagePath(s.id)} className="text-[15px] font-bold text-sky-deep underline-offset-4 hover:underline">
                              Tout savoir sur ce service →
                            </Link>
                            <span className="text-sm text-fog">Terme technique : {s.label}</span>
                          </div>
                          {open && (
                            <div className="mt-6 lg:hidden">
                              <VisualPanel service={s} />
                            </div>
                          )}
                        </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={current.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease }}>
                  <VisualPanel service={current} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
