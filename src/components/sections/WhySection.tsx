import { whyItems } from "@/data/content";
import { Gauge, Infinity as InfinityIcon, Layers, Target } from "@/components/ui/Icons";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const icons = { target: Target, layers: Layers, gauge: Gauge, infinity: InfinityIcon };

export function WhySection() {
  return (
    <section className="relative border-t border-white/[0.06] bg-ink-2 py-24 sm:py-32">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow="Pourquoi NEXWORKS"
          title="Le digital ne doit pas simplement être *beau.* Il doit être *utile.*"
        />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
          {whyItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <StaggerItem key={item.title} className="h-full">
                <SpotlightCard className="group h-full p-7 transition-transform duration-500 hover:-translate-y-1.5">
                  <div className="relative flex size-12 items-center justify-center rounded-2xl border border-sky/25 bg-sky/10 text-sky transition-all duration-500 group-hover:border-sky/60 group-hover:bg-sky/15 group-hover:shadow-[0_0_30px_-4px_rgba(85,189,242,0.6)]">
                    <Icon className="size-6 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-white">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist">{item.text}</p>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
