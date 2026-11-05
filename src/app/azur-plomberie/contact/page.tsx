import type { Metadata } from "next";
import { QuoteWizard } from "@/components/azur/QuoteWizard";
import { Check, PageTop, PhoneLine, Wrap } from "@/components/azur/ui";
import { azur, reflexSteps } from "@/data/azur";

export const metadata: Metadata = { title: "Votre demande" };

type Props = { searchParams: Promise<{ prestation?: string | string[]; urgence?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const q = await searchParams;
  const prestation = typeof q.prestation === "string" ? q.prestation : undefined;
  const urgent = q.urgence === "1";

  return (
    <>
      <PageTop compact sign={urgent ? "C'est urgent" : "Votre demande"} title={urgent ? "On vous écoute. Commençons par couper l'eau." : "Dites-nous tout, en deux minutes."} text={urgent ? "Fermez le robinet d'arrêt le plus proche si l'eau coule, puis décrivez ce que vous voyez." : "Trois étapes courtes. Une photo suffit souvent à nous mettre sur la bonne piste."} />
      <section className="bg-az-tile py-8 sm:py-10">
        <Wrap className="grid items-start gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-10">
          <QuoteWizard prestation={prestation} urgent={urgent} />
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl bg-az-hot-deep p-6 text-white">
              <h2 className="text-[2.1rem]">Le bon réflexe</h2>
              <ul className="mt-3 space-y-2.5 text-[16px] leading-relaxed">
                {reflexSteps.slice(0, 2).map((s) => <li key={s.title} className="flex gap-2.5"><Check className="mt-0.5" />{s.text}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-az-ink bg-white p-6">
              <h2 className="text-[2.1rem]">Nous joindre</h2>
              <p className="mt-3 text-[16px]">{azur.hours}</p>
              <PhoneLine className="mt-1 block text-xl font-bold" />
              <p className="mt-2 text-[15px] text-az-ink/75">Numéro masqué : ce site est une démonstration.</p>
            </div>
          </aside>
        </Wrap>
      </section>
    </>
  );
}
