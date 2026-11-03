import Link from "next/link";
import { sectors, type Sector } from "@/data/content";
import { Business, Hotel, Restaurant } from "@/components/ui/Icons";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const icons = { hotel: Hotel, restaurant: Restaurant, business: Business };

/** Illustration abstraite propre à chaque secteur. */
export function SectorArt({ type, className }: { type: Sector["icon"]; className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" aria-hidden preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`sa-${type}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#55BDF2" stopOpacity=".5" />
          <stop offset="100%" stopColor="#55BDF2" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="rgba(255,255,255,0.015)" />
      {type === "hotel" && (
        <g stroke="rgba(85,189,242,.5)" strokeWidth="1.2">
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${112 + i * 46} 200 V${96 - (i % 2) * 10} a23 23 0 0 1 46 0 V200`} />
          ))}
          <path d="M90 200h220" />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={135 + i * 46} cy={104 - (i % 2) * 10} r="3" fill="#55BDF2" stroke="none" opacity={i === 1 ? 1 : 0.4} />
          ))}
        </g>
      )}
      {type === "restaurant" && (
        <g stroke="rgba(85,189,242,.5)" strokeWidth="1.2">
          <circle cx="200" cy="100" r="78" />
          <circle cx="200" cy="100" r="58" strokeDasharray="2 6" />
          <circle cx="200" cy="100" r="36" />
          <circle cx="200" cy="100" r="10" fill="url(#sa-restaurant)" stroke="none" />
          <path d="M96 24v60M86 24v22a10 10 0 0 0 20 0V24M312 24c-12 10-16 26-16 42 0 6 4 10 10 10h6v44" />
        </g>
      )}
      {type === "business" && (
        <g stroke="rgba(85,189,242,.5)" strokeWidth="1.2">
          <path d="M70 160h260" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={96 + i * 46} y={160 - (30 + i * 18)} width="28" height={30 + i * 18} rx="4" fill="url(#sa-business)" />
          ))}
          <path d="M96 118 L142 96 L188 104 L234 66 L280 44" />
          <circle cx="280" cy="44" r="4" fill="#55BDF2" stroke="none" />
        </g>
      )}
    </svg>
  );
}

export function SectorsSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container className="relative">
        <SectionHeading eyebrow="Secteurs d'activité" title="Des solutions adaptées à *votre activité.*" />
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3" gap={0.12}>
          {sectors.map((s) => {
            const Icon = icons[s.icon];
            return (
              <StaggerItem key={s.slug} className="h-full">
                <SpotlightCard
                  as="article"
                  className="group flex h-full flex-col transition-transform duration-500 hover:-translate-y-1.5"
                >
                  <div className="relative h-44 overflow-hidden border-b border-white/[0.07] bg-gradient-to-b from-ink-3 to-ink-2">
                    <SectorArt
                      type={s.icon}
                      className="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute left-6 top-6 flex size-12 items-center justify-center rounded-2xl border border-sky/30 bg-ink/70 text-sky backdrop-blur">
                      <Icon className="size-6" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-mist">{s.short}</p>
                    <Link
                      href={`/secteurs/${s.slug}`}
                      className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-sky transition-colors after:absolute after:inset-0 after:content-[''] hover:text-white"
                    >
                      Découvrir
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-relaxed text-mist">
            Ces secteurs sont des exemples, pas des limites : nos services s&apos;adaptent à toutes les entreprises, aux
            indépendants et aux associations.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
