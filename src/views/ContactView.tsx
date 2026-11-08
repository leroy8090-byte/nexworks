import { siteConfig } from "@/config/site";
import { pagePath, type Lang } from "@/i18n/lang";
import { projectTypes } from "@/lib/validation";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail } from "@/components/ui/Icons";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Eyebrow, Glow, JsonLd } from "@/components/ui/Section";

const T = {
  fr: {
    home: "Accueil",
    crumb: "Contact",
    pageName: `Contact — ${siteConfig.name}`,
    eyebrow: "Contact",
    title: "Parlons de votre *projet.*",
    text: "Un site à créer, un site à moderniser, ou simplement une question ? Dites-nous où vous en êtes. Vous n'avez pas besoin de tout savoir à l'avance.",
    next: "Ce qui se passe ensuite",
    steps: [
      ["Vous nous décrivez votre besoin", "Quelques lignes suffisent : votre activité et ce que vous aimeriez améliorer."],
      ["On échange ensemble", "On vous répond pour préciser votre projet et vous dire ce qui est vraiment utile."],
      ["Vous recevez un devis", "Un document clair, adapté à votre projet, avant de décider quoi que ce soit."],
    ],
    data: "Vos données servent uniquement à répondre à votre demande.",
    email: "E-mail",
  },
  en: {
    home: "Home",
    crumb: "Contact",
    pageName: `Contact — ${siteConfig.name}`,
    eyebrow: "Contact",
    title: "Let's talk about *your project.*",
    text: "A website to create, a website to modernise, or simply a question? Tell us where you are. You don't need to know everything in advance.",
    next: "What happens next",
    steps: [
      ["You describe what you need", "A few lines are enough: your business and what you would like to improve."],
      ["We talk it through", "We reply to clarify your project and tell you what is genuinely useful."],
      ["You receive a quote", "A clear document tailored to your project, before you decide anything."],
    ],
    data: "Your details are used only to reply to your request.",
    email: "Email",
  },
} as const;

export function ContactView({ lang, projet }: { lang: Lang; projet: string }) {
  const t = T[lang];
  // La liste des types de projet est commune aux deux langues (valeurs françaises)
  const defaultProjectType = (projectTypes as readonly string[]).includes(projet) ? projet : "";
  const demoMode = !(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
  const contactPath = pagePath(lang, "contact");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: t.home, path: pagePath(lang, "home") }, { name: t.crumb, path: contactPath }]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: t.pageName,
            url: `${siteConfig.url}${contactPath}`,
            inLanguage: lang,
          },
        ]}
      />
      <section className="relative overflow-hidden pb-24 pt-36 sm:pt-44 sm:pb-32">
        <Glow className="-top-40 left-1/4 h-[560px] w-[900px] -translate-x-1/2" />
        <Glow className="-right-40 bottom-0 h-[600px] w-[600px]" tone="deep" />
        <Container className="relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:pt-4">
            <Reveal immediate>
              <Eyebrow>{t.eyebrow}</Eyebrow>
            </Reveal>
            <AnimatedHeading
              as="h1"
              immediate
              text={t.title}
              className="mt-6 font-display text-[clamp(2.4rem,5.4vw,4.2rem)] font-semibold leading-[1.05] tracking-tight"
            />
            <Reveal immediate visible y={16} delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">{t.text}</p>
            </Reveal>

            <Reveal immediate delay={0.55}>
              <h2 className="mt-12 font-display text-2xl font-bold text-white">{t.next}</h2>
              <ol className="mt-5 space-y-5">
                {t.steps.map(([title, text], i) => (
                  <li key={title} className="flex items-start gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky font-display text-base font-bold text-ink">{i + 1}</span>
                    <span>
                      <span className="block text-base font-bold text-white">{title}</span>
                      <span className="text-[15px] leading-relaxed text-mist">{text}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm leading-relaxed text-mist">{t.data}</p>
              <ul className="mt-6 space-y-5">
                {siteConfig.contactEmail && (
                  <li className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-sky/25 bg-sky/10 text-sky">
                      <Mail className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{t.email}</span>
                      <a href={`mailto:${siteConfig.contactEmail}`} className="text-[15px] text-mist transition-colors hover:text-sky">
                        {siteConfig.contactEmail}
                      </a>
                    </span>
                  </li>
                )}
              </ul>
            </Reveal>
          </div>

          <Reveal immediate delay={0.3}>
            <div id="formulaire" className="glass-strong scroll-mt-28 rounded-[1.75rem] p-6 sm:p-10">
              <ContactForm demoMode={demoMode} defaultProjectType={defaultProjectType} />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
