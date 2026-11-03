import type { Metadata } from "next";
import { volt } from "@/data/volt";
import { ContactForm } from "@/components/volt/Forms";
import { ContactHint, PageIntro, Wrap } from "@/components/volt/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter VOLT FITNESS CLUB — formulaire de démonstration (club fictif).",
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const cours = one(sp.cours)?.slice(0, 60);
  const formule = one(sp.formule)?.slice(0, 30);

  return (
    <>
      <PageIntro eyebrow="Contact" title="Parlons de votre séance d'essai." text="Une question, un essai, une formule : le formulaire ci-dessous est une démonstration." />
      <section className="py-16 sm:py-24">
        <Wrap className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <div className="space-y-6">
            <h2 className="font-[family-name:var(--font-volt-display)] text-[2.6rem] uppercase leading-none">Coordonnées</h2>
            <ul className="space-y-2 text-[15.5px] text-[#F5F5F0]/85">
              <li>
                {volt.location}, {volt.region} (fictif)
              </li>
              {volt.phone && (
                <li>
                  <a href={`tel:${volt.phone.replace(/\s/g, "")}`} className="underline underline-offset-4 hover:text-[#C6FF3D]">
                    {volt.phone}
                  </a>
                </li>
              )}
              {volt.email && (
                <li>
                  <a href={`mailto:${volt.email}`} className="underline underline-offset-4 hover:text-[#C6FF3D]">
                    {volt.email}
                  </a>
                </li>
              )}
            </ul>
            <ContactHint />
          </div>
          <div className="border border-[#F5F5F0]/12 bg-[#1B1B1B] p-7 sm:p-10">
            <ContactForm cours={cours} formule={formule} />
          </div>
        </Wrap>
      </section>
    </>
  );
}
