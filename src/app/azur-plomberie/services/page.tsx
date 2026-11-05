import type { Metadata } from "next";
import { TileServices } from "@/components/azur/TileServices";
import { Btn, EndCta, PageTop, Wrap } from "@/components/azur/ui";

export const metadata: Metadata = { title: "Nos services" };

export default function ServicesPage() {
  return (
    <>
      <PageTop sign="Services" title="Ce qu'on fait pour vous." text="Six métiers, une même façon de travailler : on explique, on annonce le prix, puis on intervient." />
      <section className="bg-az-tile py-16 sm:py-24">
        <Wrap>
          <TileServices />
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border-2 border-az-ink bg-white p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="text-[2.4rem]">Vous ne savez pas ce que c&apos;est ?</h2>
              <p className="mt-2 text-lg text-az-ink/80">Montrez-nous où ça se passe sur la maison en coupe.</p>
            </div>
            <Btn href="/azur-plomberie#probleme" variant="cobalt" className="shrink-0" arrow>Voir la maison</Btn>
          </div>
        </Wrap>
      </section>
      <EndCta />
    </>
  );
}
