import Link from "next/link";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { servicePagePathFor } from "@/data/localized";
import { pagePath, type Lang } from "@/i18n/lang";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { LiveService } from "@/components/visuals/LiveVisuals";

/**
 * Grande carte de service. `detailed` ajoute présentation, bénéfices et devis (page Services).
 * Le service « Design & UX » affiche sa comparaison avant / après en pleine largeur pour rester lisible.
 */
const T = {
  fr: { included: "Ce qui est inclus", offer: "Prestations", benefits: "Ce que cela vous apporte", all: "Tout savoir sur ce service", quote: "Demander un devis", more: "En savoir plus" },
  en: { included: "What's included", offer: "What we do", benefits: "What it brings you", all: "Everything about this service", quote: "Request a quote", more: "Learn more" },
};

export function ServiceCard({ service, index, detailed, lang = "fr" }: { service: Service; index: number; detailed?: boolean; lang?: Lang }) {
  const t = T[lang];
  const wide = service.id === "design-ux";
  const flip = !wide && index % 2 === 1;
  const n = String(index + 1).padStart(2, "0");

  const head = (
    <div>
      <p className="text-sm font-semibold text-sky">{n} · {service.label}</p>
      <h3 className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.05] text-white">
        {detailed ? (
          <span id={service.id} data-service={service.id} className="scroll-mt-56">
            {service.plainTitle}
          </span>
        ) : (
          service.plainTitle
        )}
      </h3>
      <p className="mt-4 text-lg leading-relaxed text-white/85">{service.plainText}</p>
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
      <h4 className="text-base font-bold text-white">
        {detailed ? t.included : t.offer}
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
          <h4 className="mt-7 text-base font-bold text-white">{t.benefits}</h4>
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

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {detailed && (
          <Link href={servicePagePathFor(lang, service.id)} className="order-2 inline-flex min-h-11 items-center text-[15px] font-bold text-sky underline-offset-4 hover:underline">
            {t.all} →
          </Link>
        )}
        {detailed ? (
          <Button href={`${pagePath(lang, "contact")}?projet=${encodeURIComponent(service.projectType)}#formulaire`} arrow>
            {t.quote}
          </Button>
        ) : (
          <Link
            href={`${pagePath(lang, "services")}#${service.id}`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-sky transition-colors hover:text-white"
          >
            {t.more}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>
    </div>
  );

  const visual = (
    <div className={cn("relative rounded-3xl bg-ink-2 p-4 sm:p-6", flip && "lg:order-1")}>
      <LiveService id={service.id} />
    </div>
  );

  return (
    <Reveal>
      <article className="border-t border-white/15 pt-10 sm:pt-14">
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
      </article>
    </Reveal>
  );
}
