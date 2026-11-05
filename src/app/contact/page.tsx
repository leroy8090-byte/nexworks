import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { projectTypes } from "@/lib/validation";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail } from "@/components/ui/Icons";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Eyebrow, Glow, JsonLd } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "Contact : parlons de votre projet web",
  description:
    "Création de site, refonte, SEO ou GEO : décrivez votre besoin à NEXWORKS AGENCY via le formulaire de contact pour demander un devis.",
  path: "/contact",
});

// Le mode démo dépend des variables d'environnement du serveur : on évalue à chaque requête.
export const dynamic = "force-dynamic";

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const projet = typeof sp.projet === "string" ? sp.projet : "";
  const defaultProjectType = (projectTypes as readonly string[]).includes(projet) ? projet : "";
  const demoMode = !(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Contact", path: "/contact" }]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: `Contact — ${siteConfig.name}`,
            url: `${siteConfig.url}/contact`,
            inLanguage: siteConfig.language,
          },
        ]}
      />
      <section className="relative overflow-hidden pb-24 pt-36 sm:pt-44 sm:pb-32">
        <Glow className="-top-40 left-1/4 h-[560px] w-[900px] -translate-x-1/2" />
        <Glow className="-right-40 bottom-0 h-[600px] w-[600px]" tone="deep" />
        <Container className="relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:pt-4">
            <Reveal immediate>
              <Eyebrow>Contact</Eyebrow>
            </Reveal>
            <AnimatedHeading
              as="h1"
              immediate
              text="Parlons de votre *projet.*"
              className="mt-6 font-display text-[clamp(2.4rem,5.4vw,4.2rem)] font-semibold leading-[1.05] tracking-tight"
            />
            <Reveal immediate delay={0.4}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">
                Un site à créer, un site à moderniser, ou simplement une question ? Dites-nous où vous en êtes. Vous n'avez pas besoin de tout savoir à l'avance.
              </p>
            </Reveal>

            <Reveal immediate delay={0.55}>
              <h2 className="mt-12 font-display text-2xl font-bold text-white">Ce qui se passe ensuite</h2>
              <ol className="mt-5 space-y-5">
                {[
                  ["Vous nous décrivez votre besoin", "Quelques lignes suffisent : votre activité et ce que vous aimeriez améliorer."],
                  ["On échange ensemble", "On vous répond pour préciser votre projet et vous dire ce qui est vraiment utile."],
                  ["Vous recevez un devis", "Un document clair, adapté à votre projet, avant de décider quoi que ce soit."],
                ].map(([title, text], i) => (
                  <li key={title} className="flex items-start gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky font-display text-base font-bold text-ink">{i + 1}</span>
                    <span>
                      <span className="block text-base font-bold text-white">{title}</span>
                      <span className="text-[15px] leading-relaxed text-mist">{text}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm leading-relaxed text-mist">Vos données servent uniquement à répondre à votre demande.</p>
              <ul className="mt-6 space-y-5">
                {siteConfig.contactEmail && (
                  <li className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-sky/25 bg-sky/10 text-sky">
                      <Mail className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">E-mail</span>
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
