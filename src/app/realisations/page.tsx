import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { WorkView } from "@/views/WorkView";

export const metadata: Metadata = buildMetadata({
  title: "Exemples de sites web créés par NEXWORKS AGENCY",
  description:
    "Sites de démonstration créés par NEXWORKS AGENCY : restaurant, hôtel, artisan, immobilier et salle de sport. Découvrez notre façon de concevoir un site web.",
  path: "/realisations",
  absoluteTitle: true,
});

export default function RealisationsPage() {
  return <WorkView lang="fr" />;
}
