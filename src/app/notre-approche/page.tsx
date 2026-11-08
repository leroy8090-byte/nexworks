import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ApproachView } from "@/views/ApproachView";

export const metadata: Metadata = buildMetadata({
  title: "Notre méthode de création de site web | NEXWORKS AGENCY",
  description:
    "Comment NEXWORKS AGENCY crée votre site en quatre étapes : écouter, dessiner, construire et rendre visible, avec des validations claires et un devis avant de démarrer.",
  path: "/notre-approche",
  absoluteTitle: true,
});

export default function ApprochePage() {
  return <ApproachView lang="fr" />;
}
