import type { Metadata } from "next";
import { SelectionList } from "@/components/SelectionList";
import { Container } from "@/components/ui";
import { asLang } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const C = {
  fr: { title: "Ma sélection", description: "Les propriétés que vous avez mises de côté.", h1: "Les maisons que vous avez gardées.", text: "Elles restent enregistrées dans ce navigateur, rien n'est envoyé. Demandez une visite groupée pour toutes à la fois." },
  en: { title: "My selection", description: "The properties you have set aside.", h1: "The homes you have kept.", text: "They are saved in this browser only, nothing is sent. Request a combined viewing for all of them at once." },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return { ...pageMeta({ lang, title: C[lang].title, path: "/selection", description: C[lang].description }), robots: { index: false, follow: true } };
}

export default async function SelectionPage({ params }: Props) {
  const lang = asLang((await params).lang);
  const c = C[lang];
  return (
    <section className="min-h-[80svh] bg-white pt-44 pb-28 sm:pt-52">
      <Container>
        <p className="rise kicker">{c.title}</p>
        <h1 className="rise mt-6 text-[3rem] text-ink sm:text-[5rem]" style={{ animationDelay: "120ms" }}>{c.h1}</h1>
        <p className="rise mt-5 max-w-xl text-[16.5px] leading-[1.75] text-muted" style={{ animationDelay: "240ms" }}>{c.text}</p>
        <SelectionList lang={lang} />
      </Container>
    </section>
  );
}
