import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalView } from "@/views/LegalView";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site NEXWORKS AGENCY : éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return <LegalView lang="fr" />;
}
