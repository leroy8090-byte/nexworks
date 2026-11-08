import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { photoCredits } from "@/data/photo-credits";
import { asLang } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const C = {
  fr: { title: "Crédits photos", description: "Auteurs et licences des photographies utilisées sur le site MAÉRIVA.", intro: "Toutes les photographies proviennent de Wikimedia Commons, sous licence libre. Elles illustrent le golfe de Saint-Tropez et des types de propriétés ; elles ne montrent pas les biens fictifs présentés sur ce site." },
  en: { title: "Photo credits", description: "Authors and licences of the photographs used on the MAÉRIVA website.", intro: "All photographs come from Wikimedia Commons, under free licences. They illustrate the Gulf of Saint-Tropez and types of properties; they do not show the fictional properties presented on this website." },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return pageMeta({ lang, title: C[lang].title, path: "/credits-photos", description: C[lang].description });
}

export default async function CreditsPage({ params }: Props) {
  const lang = asLang((await params).lang);
  return (
    <Legal lang={lang} title={C[lang].title}>
      <p>{C[lang].intro}</p>
      <ul className="divide-y divide-line border-y border-line text-[14.5px]">
        {photoCredits.map((c) => (
          <li key={c.file} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
            <span><a href={c.page} target="_blank" rel="noopener noreferrer">{c.title}</a><span className="text-muted"> · {c.author}</span></span>
            <span className="text-muted">{c.licenseUrl ? <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer">{c.license}</a> : c.license}</span>
          </li>
        ))}
      </ul>
    </Legal>
  );
}
