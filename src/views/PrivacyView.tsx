import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pagePath, type Lang } from "@/i18n/lang";
import { Container, PageHero } from "@/components/ui/Section";

const T = {
  fr: {
    eyebrow: "Confidentialité",
    title: "Vos données, *simplement.*",
    text: "Cette page décrit les informations collectées par ce site et l'usage qui en est fait.",
    collected: "Informations collectées",
    collectedText:
      "Lorsque vous utilisez le formulaire de contact, nous recueillons les informations que vous saisissez : nom, entreprise, adresse e-mail, téléphone (facultatif), type de projet et description de votre besoin.",
    purpose: "Finalité",
    purposeText:
      "Ces informations servent uniquement à répondre à votre demande et à échanger sur votre projet. Elles ne sont ni vendues ni utilisées à des fins publicitaires.",
    protection: "Protection et anti-spam",
    protectionText:
      "Les échanges avec le formulaire sont validés côté serveur. Des mesures anti-spam (champ invisible, délai minimal, limitation du nombre d'envois) protègent le formulaire sans collecter de données supplémentaires.",
    turnstile: "Vérification anti-robot (Cloudflare Turnstile)",
    turnstileText:
      "Le formulaire de devis est protégé par Cloudflare Turnstile, un service de Cloudflare, Inc. Il analyse le navigateur du visiteur pour distinguer un humain d'un robot, sans suivi publicitaire. Il ne sert qu'à protéger le formulaire.",
    cookies: "Cookies et stockage local",
    cookiesText:
      "Ce site n'utilise aucun cookie de suivi, aucun outil de mesure d'audience et aucune publicité. Votre choix de langue (français ou anglais) et la fermeture de l'information sur les cookies sont mémorisés dans le stockage local de votre navigateur : ces informations restent sur votre appareil et ne sont envoyées à personne.",
    rights: "Vos droits",
    rightsText: "Conformément au RGPD, vous pouvez demander l'accès, la rectification ou la suppression de vos données.",
    writeUs: "Écrivez-nous à",
    noEmail: "Les coordonnées de contact seront indiquées ici dès leur configuration.",
    footBefore: "L'éditeur du site et son hébergeur sont indiqués dans les ",
    footLink: "mentions légales",
  },
  en: {
    eyebrow: "Privacy",
    title: "Your data, *simply.*",
    text: "This page describes the information collected by this website and how it is used.",
    collected: "Information collected",
    collectedText:
      "When you use the contact form, we collect the information you enter: name, company, email address, telephone number (optional), type of project and a description of your needs.",
    purpose: "Purpose",
    purposeText:
      "This information is used only to reply to your request and to discuss your project. It is neither sold nor used for advertising.",
    protection: "Protection and anti-spam",
    protectionText:
      "Messages sent through the form are validated on the server. Anti-spam measures (a hidden field, a minimum completion time and a limit on the number of submissions) protect the form without collecting any additional data.",
    turnstile: "Anti-robot check (Cloudflare Turnstile)",
    turnstileText:
      "The quote form is protected by Cloudflare Turnstile, a service provided by Cloudflare, Inc. It analyses the visitor's browser to tell a human from a robot, without advertising tracking. It is used only to protect the form.",
    cookies: "Cookies and local storage",
    cookiesText:
      "This website uses no tracking cookies, no audience measurement tools and no advertising. Your language choice (French or English) and the dismissal of the cookie notice are remembered in your browser's local storage: this information stays on your device and is not sent to anyone.",
    rights: "Your rights",
    rightsText: "Under the GDPR, you may ask for access to, correction of or deletion of your data.",
    writeUs: "Write to us at",
    noEmail: "Contact details will be shown here once they are set up.",
    footBefore: "The publisher of this website and its host are listed in the ",
    footLink: "legal notice",
  },
} as const;

export function PrivacyView({ lang }: { lang: Lang }) {
  const t = T[lang];
  const h2 = "mt-10 font-display text-xl font-semibold text-white";
  const p = "mt-3 text-[15px] leading-relaxed text-mist";
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} text={t.text} />
      <section className="pb-24">
        <Container className="max-w-3xl">
          <h2 className={h2}>{t.collected}</h2>
          <p className={p}>{t.collectedText}</p>
          <h2 className={h2}>{t.purpose}</h2>
          <p className={p}>{t.purposeText}</p>
          <h2 className={h2}>{t.protection}</h2>
          <p className={p}>{t.protectionText}</p>
          <h2 className={h2}>{t.turnstile}</h2>
          <p className={p}>{t.turnstileText}</p>
          <h2 className={h2}>{t.cookies}</h2>
          <p className={p}>{t.cookiesText}</p>
          <h2 className={h2}>{t.rights}</h2>
          <p className={p}>
            {t.rightsText}
            {siteConfig.contactEmail ? (
              <>
                {" "}{t.writeUs}{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-sky underline-offset-4 hover:underline">
                  {siteConfig.contactEmail}
                </a>
                .
              </>
            ) : (
              ` ${t.noEmail}`
            )}
          </p>
          <p className="mt-10 text-[15px] leading-relaxed text-mist">
            {t.footBefore}
            <Link href={pagePath(lang, "legal")} className="font-bold text-white underline-offset-4 hover:underline">
              {t.footLink}
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
