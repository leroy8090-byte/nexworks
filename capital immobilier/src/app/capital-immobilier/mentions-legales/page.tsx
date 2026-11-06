import { ToComplete } from "@/components/capital/Blocks";
import { capitalMeta } from "@/components/capital/seo";
import { PageIntro, Wrap } from "@/components/capital/ui";
import { capital } from "@/data/capital";

export const metadata = capitalMeta("Mentions légales", "Mentions légales du concept de refonte CAPITAL IMMOBILIER réalisé par NEXWORKS AGENCY.", "/mentions-legales");

export default function Mentions() {
  const rows: [string, React.ReactNode][] = [
    ["Nature du site", "Concept de refonte (démonstration) réalisé par NEXWORKS AGENCY. Ce n'est pas le site officiel de l'agence."],
    ["Site officiel de l'agence", <a key="s" href={capital.publicSite} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">capitalimmobilier.fr</a>],
    ["Dénomination", capital.name],
    ["Adresse", `${capital.address.street}, ${capital.address.postalCode} ${capital.address.city}`],
    ["Téléphone / e-mail", `${capital.phone} · ${capital.email}`],
    ["Forme juridique, capital, RCS / SIRET", <ToComplete key="a">à compléter par l&apos;agence</ToComplete>],
    ["Carte professionnelle, garantie financière, assurance RCP", <ToComplete key="b">à compléter par l&apos;agence</ToComplete>],
    ["Médiateur de la consommation", <ToComplete key="c">à compléter par l&apos;agence</ToComplete>],
    ["Directeur de la publication", <ToComplete key="d">à compléter par l&apos;agence</ToComplete>],
    ["Hébergeur", <ToComplete key="e">à compléter lors d&apos;une mise en ligne</ToComplete>],
    ["Photographies", "Images d'illustration libres de droits : voir la page Crédits photos."],
  ];
  return (
    <>
      <PageIntro eyebrow="Informations" title="Mentions légales." />
      <section className="py-14 sm:py-20">
        <Wrap>
          <dl className="max-w-3xl border-t border-[#0E4F68]/20">
            {rows.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-[#0E4F68]/20 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0E4F68]/70">{k}</dt>
                <dd className="text-[15.5px] leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </Wrap>
      </section>
    </>
  );
}
