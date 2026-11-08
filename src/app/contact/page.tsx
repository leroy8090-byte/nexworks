import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ContactView } from "@/views/ContactView";

export const metadata: Metadata = buildMetadata({
  title: "Demander un devis pour votre site web | NEXWORKS AGENCY",
  description:
    "Création de site, refonte, SEO ou GEO : décrivez votre besoin à NEXWORKS AGENCY en quelques lignes et recevez un devis clair, adapté à votre projet.",
  path: "/contact",
  absoluteTitle: true,
});

// Le mode démo dépend des variables d'environnement du serveur : on évalue à chaque requête.
export const dynamic = "force-dynamic";

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  return <ContactView lang="fr" projet={typeof sp.projet === "string" ? sp.projet : ""} />;
}
