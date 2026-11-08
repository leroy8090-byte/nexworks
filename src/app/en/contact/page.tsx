import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ContactView } from "@/views/ContactView";

export const metadata: Metadata = buildMetadata({
  title: "Request a quote for your website | NEXWORKS AGENCY",
  description:
    "Website creation, redesign, SEO or GEO: describe your needs to NEXWORKS AGENCY in a few lines and receive a clear quote tailored to your project.",
  path: "/en/contact",
  absoluteTitle: true,
  lang: "en",
});

// Le mode démo dépend des variables d'environnement du serveur : on évalue à chaque requête.
export const dynamic = "force-dynamic";

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  return <ContactView lang="en" projet={typeof sp.projet === "string" ? sp.projet : ""} />;
}
