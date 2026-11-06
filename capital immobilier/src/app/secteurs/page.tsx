import Link from "next/link";
import { Reveal, ImageReveal } from "@/components/Motion";
import { Photo } from "@/components/Photo";
import { ScrollText } from "@/components/ScrollFx";
import { RedBand } from "@/components/Sections";
import { Container, PageHero } from "@/components/ui";
import { sectors } from "@/data/agency";
import { sectorMatches } from "@/lib/filter";
import { getCards } from "@/lib/listings";
import { pageMeta } from "@/lib/seo";

const DESC = "Saint-Raphaël, Fréjus, Boulouris, Valescure, Santa Lucia, Agay, Anthéor et le pays de Fayence : les secteurs où intervient CAPITAL IMMOBILIER, et leurs annonces.";
export const metadata = pageMeta({ title: "Nos secteurs autour de Saint-Raphaël", description: DESC, path: "/secteurs", image: "/media/massif-esterel.webp" });

export default function Secteurs() {
  const cards = getCards();
  return (
    <>
      <PageHero crumbs={[{ name: "Nos secteurs", path: "/secteurs" }]} eyebrow="Nos secteurs" title="De la mer à l’arrière-pays." text="Chaque secteur a son caractère : voici ce qu’il faut en savoir, et les annonces de l’agence." image="/media/massif-esterel.webp" alt="Le massif de l’Estérel, ses sommets rouges et les villas de Saint-Raphaël face à la mer" />
      <section className="bg-white py-20 sm:py-32">
        <Container>
          <p className="max-w-6xl text-[2rem] font-semibold leading-[1.14] tracking-[-0.02em] [font-family:var(--font-display)] sm:text-[3.4rem]"><ScrollText text="Installée au cœur de Saint-Raphaël, l’agence propose des biens sur le littoral, de Fréjus aux roches rouges d’Anthéor, et dans l’arrière-pays varois." /></p>
        </Container>
      </section>
      <section className="bg-white pb-24 sm:pb-36">
        <Container>
          <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {sectors.map((s, i) => {
              const count = cards.filter((c) => sectorMatches(c, s.match)).length;
              return (
                <li key={s.slug} className={`scale-in ${i % 2 === 1 ? "md:mt-24" : ""}`}>
                  <Link href={`/secteurs/${s.slug}`} className="group block">
                    <ImageReveal delay={(i % 2) * 0.1} className="relative aspect-[4/3] overflow-hidden bg-sand"><div className="depth"><span className="zoom absolute inset-0 block"><Photo src={s.image} alt={s.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" /></span></div></ImageReveal>
                    <Reveal className="mt-5 flex items-baseline justify-between gap-5">
                      <h2 className="text-[2.2rem] leading-none text-night transition-colors duration-300 group-hover:text-sea sm:text-[3.2rem]">{s.name}</h2>
                      <span className="shrink-0 text-[14.5px] text-muted">{count > 0 ? `${count} ${count > 1 ? "annonces" : "annonce"}` : "Découvrir"} <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span></span>
                    </Reveal>
                    <p className="mt-3 max-w-xl text-[17px] leading-[1.55] text-muted">{s.text}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
      <RedBand title="Votre secteur n’est pas dans la liste ?" text="Présentez votre projet : l’agence vous dira si elle peut vous accompagner." primary={{ label: "Contacter l’agence", href: "/contact" }} secondary={{ label: "Toutes les annonces", href: "/biens" }} />
    </>
  );
}
