import Image from "next/image";
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
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-3 transition-colors hover:border-sky/60"
              >
                <span className="relative block aspect-[16/10] overflow-hidden">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 768px) 92vw, 420px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="flex flex-1 items-center justify-between gap-4 p-5">
                  <span>
                    <span className="block font-display text-xl font-bold text-white">{s.title}</span>
                    <span className="mt-1.5 block text-[15px] leading-relaxed text-mist">{s.short}</span>
                  </span>
                  <ArrowRight className="size-5 shrink-0 text-sky transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
