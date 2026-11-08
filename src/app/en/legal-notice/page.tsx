import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalView } from "@/views/LegalView";

export const metadata: Metadata = buildMetadata({
  title: "Legal notice",
  description: "Legal notice for the NEXWORKS AGENCY website: publisher, hosting provider, intellectual property and personal data.",
  path: "/en/legal-notice",
  lang: "en",
});

export default function LegalNoticePage() {
  return <LegalView lang="en" />;
}
