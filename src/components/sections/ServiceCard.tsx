import Link from "next/link";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ServiceVisual, serviceVisualCaption } from "@/components/visuals/ServiceVisuals";

/**
 * Grande carte de service. `detailed` ajoute présentation, bénéfices et devis (page Services).
 * Le service « Design & UX » affiche sa comparaison avant / après en pleine largeur pour rester lisible.
 */
export function ServiceCard({ service, index, detailed }: { service: Service; index: number; detailed?: boolean }) {
  const wide = service.id === "design-ux";
  const flip = !wide && index % 2 === 1;
  const n = String(index + 1).padStart(2, "0");

  const head = (
    <div>
      <div className="flex items-center gap-4">
        <span className="font-display text-sm font-semibold text-sky">{n}</span>
        <span className="h-px w-10 bg-gradient-to-r from-sky/60 to-transparent" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mist">{service.label}</span>
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-white sm:text-[2rem]">
        {detailed ? (
          <span id={service.id} className="scroll-mt-32">
            {service.title}
          </span>
        ) : (
          service.title
        )}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-mist">{service.description}</p>
      {detailed && (
        <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-mist/90">
          {service.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}
      {service.note && (
        <p className="mt-6 rounded-xl border border-sky/20 bg-sky/[0.06] px-4 py-3 text-[13px] leading-relaxed text-sky/90">
          {service.note}
        </p>
      )}
    </div>
  );

  const lists = (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
        {detailed ? "Prestations incluses" : "Prestations"}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {service.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[15px] text-white/85">
            <span className="mt-1 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-sky/15 text-sky">
              <Check className="size-3" strokeWidth={2.2} />
            </span>
            {item}
          </li>
        ))}
      </ul>

      {detailed && (
        <>
          <h4 className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Ce que cela vous apporte</h4>
          <ul className="mt-4 space-y-2.5">
            {service.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] text-mist">
                <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-sky" />
                {b}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {detailed ? (
          <Button href={`/contact?projet=${encodeURIComponent(service.projectType)}#formulaire`} arrow>
            Demander un devis
          </Button>
        ) : (
          <Link
            href={`/services#${service.id}`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-sky transition-colors hover:text-white"
          >
            En savoir plus
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>
    </div>
  );

  const visual = (
    <figure className={cn("relative", flip && "lg:order-1")}>
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-ink/60 p-3 sm:p-6">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="relative">
          <ServiceVisual id={service.id} />
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-mist/70">{serviceVisualCaption[service.id]}</figcaption>
    </figure>
  );

  return (
    <Reveal>
      <SpotlightCard as="article" className="p-6 sm:p-8 lg:p-12">
        {wide ? (
          <div className="space-y-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
              {head}
              {lists}
            </div>
            {visual}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className={cn(flip && "lg:order-2")}>
              {head}
              <div className="mt-7">{lists}</div>
            </div>
            {visual}
          </div>
        )}
      </SpotlightCard>
    </Reveal>
  );
}
