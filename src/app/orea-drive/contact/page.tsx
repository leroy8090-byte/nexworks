import type { Metadata } from "next";
import { ContactForm } from "@/components/orea/ContactForm";
import { PageTop, Wrap } from "@/components/orea/ui";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageTop sign="Contact" title="Une question ?" text="Écrivez-nous. Ce formulaire est une démonstration : ORÉA DRIVE est une entreprise fictive." />
      <section className="bg-or-sand py-16 text-or-ink sm:py-24">
        <Wrap className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-5xl">Le plus rapide</h2>
            <p className="mt-3 text-lg leading-relaxed text-or-ink/80">La plupart des réponses se trouvent déjà sur le site : les documents à présenter, l&apos;âge minimum, le kilométrage et l&apos;annulation sont expliqués dans la foire aux questions de l&apos;accueil.</p>
            <p className="mt-4 text-lg leading-relaxed text-or-ink/80">Aucune coordonnée réelle n&apos;est affichée, car cette entreprise n&apos;existe pas.</p>
          </div>
          <ContactForm />
        </Wrap>
      </section>
    </>
  );
}
