"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { servicePagePathFor, servicesFor } from "@/data/localized";
import type { Service } from "@/data/services";
import { useLang } from "@/i18n/use-lang";
import { Plus } from "@/components/ui/Icons";
import { Container, SectionHeading } from "@/components/ui/Section";
import { LiveService } from "@/components/visuals/LiveVisuals";
import { useCalmMotion } from "@/lib/useCalmMotion";
import { cn, ease } from "@/lib/utils";

function VisualPanel({ service }: { service: Service }) {
  return (
    <div className="rounded-3xl bg-graphite p-4 text-white sm:p-6">
      <LiveService id={service.id} />
    </div>
  );
}

const AUTO_MS = 11000;

/**
 * Quatre besoins dits simplement : on en choisit un, la démonstration suit.
 * Sur grand écran, les services défilent seuls tant que le visiteur n'a pas choisi.
 */
export function ServicesExplorer() {
  const lang = useLang();
  const services = servicesFor(lang);
  const [active, setActive] = useState(0);
  const [chosen, setChosen] = useState(false);
  const [wide, setWide] = useState(false);
  const zone = useRef<HTMLDivElement>(null);
  const seen = useInView(zone, { amount: 0.5 });
  const calm = useCalmMotion();
  const current = services[active];
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const auto = wide && seen && !chosen && !calm;
  useEffect(() => {
    if (!auto) return;
    const id = setTimeout(() => setActive((v) => (v + 1) % services.length), AUTO_MS);
    return () => clearTimeout(id);
  }, [auto, active]);

  return (
    <section id="services" className="paper scroll-mt-24 pb-20 sm:pb-32">
      <Container>
        <SectionHeading tone="light" eyebrow={lang === "en" ? "What we do for you" : "Ce qu'on fait pour vous"} title={lang === "en" ? "Four ways we *can help.*" : "Quatre façons de *vous aider.*"} />

        <div ref={zone} onPointerEnter={() => setChosen(true)} className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <ul className="border-t border-graphite/15">
            {services.map((s, i) => {
              const open = i === active;
              return (
                <li key={s.id} className="border-b border-graphite/15">
                  <h3>
                    <button
                      type="button"
                      onClick={() => { setChosen(true); setActive(i); }}
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
                  {open && auto && (
                    <motion.span key={active} aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: AUTO_MS / 1000, ease: "linear" }} className="-mt-px mb-px block h-0.5 origin-left bg-sky-deep" />
                  )}
                  {/* Toujours présent dans la page : les robots d'IA lisent le texte sans exécuter le JavaScript. */}
                  <div className={cn("grid transition-[grid-template-rows] duration-500 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="overflow-hidden" inert={!open}>
                        <div className="pb-6">
                          <p className="text-[17px] leading-relaxed text-fog">{s.plainText}</p>
                          {s.note && <p className="mt-3 text-sm leading-relaxed text-fog">{s.note}</p>}
                          <div className="mt-2 flex flex-wrap items-center gap-x-5">
                            <Link href={servicePagePathFor(lang, s.id)} className="inline-flex min-h-11 items-center text-[15px] font-bold text-sky-deep underline-offset-4 hover:underline">
                              {lang === "en" ? "Learn more about this service →" : "Tout savoir sur ce service →"}
                            </Link>
                            <span className="text-sm text-fog">{lang === "en" ? `Technical term: ${s.label}` : `Terme technique : ${s.label}`}</span>
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
