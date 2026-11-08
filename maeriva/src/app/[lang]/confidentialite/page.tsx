import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { asLang } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang);
  return lang === "fr"
    ? pageMeta({ lang, title: "Confidentialité", path: "/confidentialite", description: "Utilisation des données personnelles sur le site MAÉRIVA." })
    : pageMeta({ lang, title: "Privacy", path: "/confidentialite", description: "Use of personal data on the MAÉRIVA website." });
}

export default async function PrivacyPage({ params }: Props) {
  const lang = asLang((await params).lang);
  if (lang === "en") {
    return (
      <Legal lang="en" title="Privacy">
        <div><h2>Forms</h2><p>The information entered in a form (name, email, phone, message, project details) is used solely to respond to your request. It is never sold or used for marketing without your consent.</p></div>
        <div><h2>My selection</h2><p>The properties you set aside are saved in your browser, on your device. Nothing is sent to the agency until you make a request.</p></div>
        <div><h2>Analytics and cookies</h2><p>This website sets no advertising cookies and uses no audience measurement tool.</p></div>
        <div><h2>Your rights</h2><p>You may request access to, correction or deletion of your data by writing to the agency. On this demonstration website, forms send no data until sending is configured.</p></div>
      </Legal>
    );
  }
  return (
    <Legal title="Confidentialité">
      <div><h2>Les formulaires</h2><p>Les informations saisies dans un formulaire (nom, email, téléphone, message, détails du projet) servent uniquement à répondre à votre demande. Elles ne sont ni revendues ni utilisées pour de la prospection sans votre accord.</p></div>
      <div><h2>Ma sélection</h2><p>Les propriétés que vous mettez de côté sont enregistrées dans votre navigateur, sur votre appareil. Rien n&apos;est envoyé à l&apos;agence tant que vous ne faites pas de demande.</p></div>
      <div><h2>Mesure d&apos;audience et cookies</h2><p>Ce site ne dépose aucun cookie publicitaire et n&apos;utilise pas d&apos;outil de mesure d&apos;audience.</p></div>
      <div><h2>Vos droits</h2><p>Vous pouvez demander l&apos;accès, la correction ou la suppression de vos données en écrivant à l&apos;agence. Sur ce site de démonstration, les formulaires n&apos;envoient aucune donnée tant que l&apos;envoi n&apos;est pas configuré.</p></div>
    </Legal>
  );
}
