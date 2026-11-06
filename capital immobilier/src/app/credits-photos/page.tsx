import { Container, Crumbs } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { photoCredits } from "@/data/photo-credits";

export const metadata = pageMeta({ title: "Crédits photos", description: "Les sources et les licences des photographies du site de CAPITAL IMMOBILIER : annonces de l’agence et paysages de Saint-Raphaël issus de Wikimedia Commons.", path: "/credits-photos" });

export default function Credits() {
  return (
    <section className="pb-24 pt-44 sm:pt-52">
      <Container className="!max-w-4xl">
        <Crumbs items={[{ name: "Crédits photos", path: "/credits-photos" }]} className="mb-6" />
        <h1 className="title-in text-[3.1rem] leading-[1.03] text-night sm:text-[4.6rem]">Crédits photos</h1>
        <p className="mt-5 text-[17px] leading-relaxed text-muted">Les photos des annonces appartiennent à CAPITAL IMMOBILIER et sont reprises de ses annonces publiées. Les paysages de Saint-Raphaël et de ses environs viennent de Wikimedia Commons, réduits et convertis, avec les licences ci-dessous.</p>
        <ul className="mt-8 border-t border-rule">
          {photoCredits.map((c) => (
            <li key={c.file} className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-rule py-3 text-[15.5px] text-ink">
              <span>{c.title} : {c.author}</span>
              <span className="flex gap-4">
                {c.licenseUrl ? <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline underline-offset-4">{c.license}</a> : <span>{c.license}</span>}
                <a href={c.page} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Source</a>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
