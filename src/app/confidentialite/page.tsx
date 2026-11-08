import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PrivacyView } from "@/views/PrivacyView";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: "Comment NEXWORKS AGENCY traite les informations transmises via son formulaire de contact : données recueillies, utilisation, conservation et droits.",
  path: "/confidentialite",
});

export default function PrivacyPage() {
  return <PrivacyView lang="fr" />;
}
