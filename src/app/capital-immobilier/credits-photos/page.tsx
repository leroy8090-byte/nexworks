import { capitalMeta } from "@/components/capital/seo";
import { PageIntro, Wrap } from "@/components/capital/ui";
import { communes } from "@/data/capital";

export const metadata = capitalMeta("Crédits photos", "Sources et licences des photographies d'illustration du concept CAPITAL IMMOBILIER.", "/credits-photos");

const unsplash: [string, string, string][] = [
  ["Alejandra Cifre González", "ylyn5r4vxcA", "Villa contemporaine et piscine"],
  ["Bernard Hermant", "nM5-mS5eA8I", "Piscine et jardin"],
  ["Alexey Aladashvili", "5aJpyxXaCyA", "Cuisines (5aJpyxXaCyA et Fgo8WHmi5T0)"],
  ["Gábor Szűts", "N1DlQkl2V2c", "Fenêtre sur la mer"],
  ["Margo Evardson", "eoMSMXXNT5E", "Piscine face à la mer (image d'en-tête)"],
  ["Renaldo Kodra", "Co9RbdUgGX4", "Balcon sur les collines"],
  ["Vita Vilcina", "KtOid0FLjqU", "Maison à arcades et piscine"],
  ["Julia", "aX1TTOuq83M", "Séjour avec buffet en bois"],
  ["Julia", "ABohRftG_Os", "Chambre claire"],
  ["Danilo Rios", "AgK_XAqSbfk", "Salon ensoleillé"],
  ["Jonathan Phelps", "36A2xCeauxU", "Maison à toit de tuiles"],
  ["Tim Schmidbauer", "_tEBCVrEnyo", "Villa contemporaine et palmiers"],
  ["Bernd Dittrich", "u7LnnKsrZ8s", "Façade blanche"],
  ["Theo Maroulis", "7jXvvEMNTkc", "Piscine et terrasse blanche"],
];

export default function Credits() {
  return (
    <>
      <PageIntro eyebrow="Informations" title="Crédits photos." text="Toutes les photographies de ce concept sont des images d'illustration : elles ne représentent pas de biens réellement commercialisés par l'agence et n'ont pas toutes été prises dans le Var." />
      <section className="py-14 sm:py-20">
        <Wrap className="grid max-w-4xl gap-14">
          <div>
            <h2 className="font-[family-name:var(--font-cap-serif)] text-[1.9rem]">Wikimedia Commons (secteurs)</h2>
            <ul className="mt-5 divide-y divide-[#183B50]/15 border-y border-[#183B50]/15 text-[15px]">
              {communes.map((c) => (
                <li key={c.slug} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
                  <span>
                    {c.name} — {c.credit.author}, {c.credit.license}
                  </span>
                  <a href={c.credit.source} target="_blank" rel="noopener noreferrer" className="text-[#183B50] underline underline-offset-4">
                    Source
                  </a>
                </li>
              ))}
              <li className="py-3">Port de Saint-Raphaël (page Vendre) — Txllxt TxllxT, CC BY-SA 4.0, Wikimedia Commons.</li>
            </ul>
            <p className="mt-4 text-[13.5px] text-[#252A2D]/65">Les images ont été recadrées et recompressées. Licences : CC0 (domaine public), CC BY 4.0, CC BY-SA 4.0 (partage dans les mêmes conditions pour les adaptations de ces images).</p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-cap-serif)] text-[1.9rem]">Unsplash (biens et ambiances)</h2>
            <p className="mt-3 text-[14.5px] text-[#252A2D]/70">Licence Unsplash : usage libre, attribution non obligatoire mais indiquée ici.</p>
            <ul className="mt-5 divide-y divide-[#183B50]/15 border-y border-[#183B50]/15 text-[15px]">
              {unsplash.map(([a, id, d]) => (
                <li key={id} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
                  <span>
                    {a} — {d}
                  </span>
                  <a href={`https://unsplash.com/photos/${id}`} target="_blank" rel="noopener noreferrer" className="text-[#183B50] underline underline-offset-4">
                    unsplash.com
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Wrap>
      </section>
    </>
  );
}
