import { lang as rootLang } from "next/root-params";
import { Btn } from "@/components/ui";
import { asLang } from "@/i18n/config";

const C = {
  fr: { kicker: "Page introuvable", title: "Cette adresse n'existe pas.", text: "La propriété a peut-être été vendue, ou le lien est incomplet.", props: "Voir les propriétés", home: "Retour à l'accueil" },
  en: { kicker: "Page not found", title: "This address does not exist.", text: "The property may have been sold, or the link may be incomplete.", props: "View properties", home: "Back to home" },
};

export default async function NotFound() {
  const lang = asLang((await rootLang()) ?? "fr");
  const c = C[lang];
  return (
    <section className="grid min-h-[90svh] place-items-center bg-white px-6 pt-32 text-center">
      <div>
        <p className="kicker justify-center">{c.kicker}</p>
        <h1 className="mt-6 text-[3.4rem] text-ink sm:text-[5.4rem]">{c.title}</h1>
        <p className="mx-auto mt-5 max-w-md text-[16.5px] leading-relaxed text-muted">{c.text}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"><Btn lang={lang} href="/proprietes" arrow>{c.props}</Btn><Btn lang={lang} href="/" variant="outline">{c.home}</Btn></div>
      </div>
    </section>
  );
}
