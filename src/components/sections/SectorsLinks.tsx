import Link from "next/link";
import type { Sector } from "@/data/content";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";

/** Maillage interne : liens vers les pages dédiées aux secteurs. */
export function SectorsLinks({ sectors }: { sectors: Sector[] }) {
  return (
    <section className="relative border-t border-white/[0.06] bg-ink-2 py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Selon votre activité" title="Des services adaptés à *votre secteur.*" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {sectors.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link
                href={`/secteurs/${s.slug}`}
                className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-sky/50 hover:bg-white/[0.05]"
              >
                <span>
                  <span className="block font-display text-lg font-semibold text-white">{s.title}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-mist">{s.short}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-sky transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
