import type { Metadata } from "next";
import { PageTop, Wrap } from "@/components/orea/ui";
import { photoCredits } from "@/data/orea-credits";

export const metadata: Metadata = { title: "Crédits photos" };

const groups = [
  { title: "Villes et destinations", prefix: "villes/" },
  { title: "Véhicules", prefix: "catalogue/" },
];

export default function PhotoCreditsPage() {
  const entries = Object.entries(photoCredits);
  const others = entries.filter(([k]) => !groups.some((g) => k.startsWith(g.prefix)));
  const list = (items: typeof entries) => (
    <ul className="mt-4 divide-y divide-or-ink/10 border-y-2 border-or-ink/15">
      {items.map(([key, c]) => (
        <li key={key} className="grid gap-x-6 gap-y-0.5 py-3 text-[15px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto]">
          <span className="font-bold">{c.label}</span>
          <span className="text-or-ink/80">{c.author}</span>
          <span className="flex flex-wrap gap-x-3">
            {c.licenseUrl ? <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline underline-offset-2">{c.license}</a> : <span>{c.license}</span>}
            <a href={c.page} target="_blank" rel="noopener noreferrer" className="font-semibold text-or-flame-deep underline underline-offset-2">Source</a>
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <>
      <PageTop sign="Informations" title="Crédits photos" text="Les photos viennent de Wikimedia Commons, sous licence libre, et d'Unsplash, sous licence Unsplash. Elles ont été redimensionnées, recadrées et converties en WebP." />
      <section className="bg-or-sand py-14 text-or-ink sm:py-20">
        <Wrap className="space-y-12">
          <p className="max-w-3xl text-lg leading-relaxed">Les photographes n&apos;ont aucun lien avec ORÉA DRIVE ou NEXWORKS AGENCY et n&apos;approuvent pas ce site. Les marques et modèles cités appartiennent à leurs propriétaires.</p>
          {groups.map((g) => (
            <div key={g.prefix}>
              <h2 className="text-5xl">{g.title}</h2>
              {list(entries.filter(([k]) => k.startsWith(g.prefix)))}
            </div>
          ))}
          <div>
            <h2 className="text-5xl">Accueil</h2>
            {list(others)}
          </div>
        </Wrap>
      </section>
    </>
  );
}
