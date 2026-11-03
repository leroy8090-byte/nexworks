import type { Metadata } from "next";
import { getProperty, riviera } from "@/data/riviera";
import { ContactForm } from "@/components/riviera/Forms";
import { ContactHint, PageIntro, Wrap } from "@/components/riviera/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter MAISON RIVIERA — formulaire de démonstration (agence fictive).",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.bien) ? sp.bien[0] : sp.bien;
  const prop = raw ? getProperty(raw) : undefined;
  const bien = prop ? `${prop.title} — ${prop.city}` : undefined;

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Confiez-nous votre projet."
        text={bien ? `Votre demande concerne : ${bien}.` : "Achat, vente, visite : décrivez votre projet, nous imaginons la suite."}
      />
      <section className="py-16 sm:py-24">
        <Wrap className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div className="space-y-6">
            <h2 className="font-[family-name:var(--font-riviera-display)] text-[2rem] font-light">Coordonnées</h2>
            <ul className="space-y-2 text-[15.5px]">
              <li>{riviera.location}, {riviera.region} (fictif)</li>
              {riviera.phone && (
                <li>
                  <a href={`tel:${riviera.phone.replace(/\s/g, "")}`} className="underline underline-offset-4">{riviera.phone}</a>
                </li>
              )}
              {riviera.email && (
                <li>
                  <a href={`mailto:${riviera.email}`} className="underline underline-offset-4">{riviera.email}</a>
                </li>
              )}
            </ul>
            <ContactHint />
          </div>
          <div className="border border-[#D9CBB7] bg-[#FFFEFA] p-7 sm:p-10">
            <ContactForm bien={bien} />
          </div>
        </Wrap>
      </section>
    </>
  );
}
