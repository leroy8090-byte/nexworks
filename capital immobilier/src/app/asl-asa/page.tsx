import { Reveal } from "@/components/Motion";
import { RequestForm } from "@/components/RequestForm";
import { ScrollText } from "@/components/ScrollFx";
import { faqLd, FormBlock, Questions, WidePhoto, Further } from "@/components/Sections";
import { Btn, Container, JsonLd, PageHero, Title } from "@/components/ui";
import { pageMeta, serviceLd } from "@/lib/seo";

const DESC = "ASL et ASA expliquées simplement : ces associations de propriétaires, leurs différences et la gestion proposée par CAPITAL IMMOBILIER à Saint-Raphaël.";
export const metadata = pageMeta({ title: "Gestion d’ASL et d’ASA à Saint-Raphaël", description: DESC, path: "/asl-asa", image: "/media/cap-esterel.webp" });

const COMPARE: [string, string, string][] = [
  ["Nature", "Personne morale de droit privé", "Établissement public à caractère administratif"],
  ["Création", "À l’accord de tous les propriétaires concernés, souvent à la création d’un lotissement", "Autorisée par arrêté préfectoral, après enquête publique"],
  ["Adhésion", "Liée à la propriété des terrains ou des lots compris dans son périmètre", "Obligatoire pour les propriétaires inclus dans le périmètre"],
  ["Recettes", "Cotisations dues par les membres", "Redevances syndicales, recouvrées comme les créances publiques"],
];
const FAQ = [
  { q: "Qu’est-ce qu’une ASL ?", a: "Une association syndicale libre regroupe des propriétaires pour gérer et entretenir des équipements ou des espaces communs, par exemple les voies, les réseaux ou les espaces verts d’un lotissement." },
  { q: "Qu’est-ce qu’une ASA ?", a: "Une association syndicale autorisée a le même type de missions, mais c’est un établissement public, créé par arrêté préfectoral. Elle peut concerner par exemple des digues, des canaux ou des voies d’accès." },
  { q: "Quelle est la différence avec une copropriété ?", a: "Une copropriété répartit un immeuble en lots et parties communes. Une ASL ou une ASA réunit des propriétaires distincts autour d’équipements ou d’intérêts communs." },
  { q: "Comment les confier à l’agence ?", a: "Présentez votre association avec le formulaire ci-dessous, ou appelez l’agence au 04 94 40 86 44. Le périmètre de la mission se définit avec elle." },
];

export default function AslAsa() {
  return (
    <>
      <JsonLd data={serviceLd({ name: "Gestion d’associations syndicales de propriétaires (ASL et ASA)", description: DESC, path: "/asl-asa" })} />
      <JsonLd data={faqLd(FAQ)} />
      <PageHero crumbs={[{"name":"Syndic","path":"/syndic"},{"name":"ASL et ASA","path":"/asl-asa"}]} eyebrow="ASL et ASA" title="Les équipements communs, gérés simplement." text="Voies, réseaux, espaces verts : l’agence s’est spécialisée dans la gestion des associations syndicales de propriétaires." image="/media/cap-esterel.webp" alt="Cap Estérel et ses résidences, au pied du massif"><Btn href="#demande" arrow>Présenter mon association</Btn></PageHero>
      <section className="bg-white py-20 sm:py-32">
        <Container>
          <p className="max-w-6xl text-[2rem] font-semibold leading-[1.14] tracking-[-0.02em] [font-family:var(--font-display)] sm:text-[3.4rem]"><ScrollText text="Dans un lotissement ou un domaine, plusieurs propriétaires partagent parfois une route, un réseau ou un espace vert. L’ASL et l’ASA sont les structures qui permettent de les gérer ensemble." /></p>
        </Container>
      </section>
      <section className="bg-night py-20 text-white sm:py-32">
        <Container>
          <Title light eyebrow="En un coup d’œil" title="ASL ou ASA ?" text="Deux formes d’association syndicale, créées et gérées différemment." />
          <Reveal className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[16.5px]">
              <thead><tr className="border-b-2 border-sea"><td className="w-44 py-3" /><th scope="col" className="px-4 py-3 text-[1.7rem] font-bold [font-family:var(--font-display)]">ASL</th><th scope="col" className="px-4 py-3 text-[1.7rem] font-bold [font-family:var(--font-display)]">ASA</th></tr></thead>
              <tbody>{COMPARE.map(([k, a, b]) => <tr key={k} className="border-b border-white/20"><th scope="row" className="py-4 pr-4 align-top font-medium text-white/70">{k}</th><td className="px-4 py-4 align-top">{a}</td><td className="px-4 py-4 align-top">{b}</td></tr>)}</tbody>
            </table>
          </Reveal>
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-white/65">Informations générales, à vérifier selon les statuts de chaque association. Elles ne remplacent pas l’avis d’un professionnel du droit.</p>
        </Container>
      </section>
      <WidePhoto image="/media/agay.webp" alt="La rade d’Agay vue du Dramont" />
      <Questions items={FAQ} title="ASL et ASA, simplement." />
      <FormBlock eyebrow="Votre association" title="Parlons de votre ASL ou de votre ASA." text="Présentez votre association et ce que vous recherchez : l’agence vous répond.">
        <RequestForm id="asl" kind="Demande ASL ou ASA" message="Votre situation" fields={[
          { name: "nature", label: "Type d’association", type: "select", options: ["ASL", "ASA", "Je ne sais pas"], required: true },
          { name: "commune", label: "Commune", required: true },
          { name: "membres", label: "Nombre de propriétaires", type: "number" },
        ]} />
      </FormBlock>
      <Further items={[{ label: "ASL et ASA : quelles différences ?", href: "/conseils/asl-asa-differences" }, { label: "Le syndic de copropriété", href: "/syndic" }]} />
    </>
  );
}
