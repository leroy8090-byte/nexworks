import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PrivacyView } from "@/views/PrivacyView";

export const metadata: Metadata = buildMetadata({
  title: "Privacy policy",
  description: "How NEXWORKS AGENCY handles the information submitted through its contact form: data collected, use, retention and your rights.",
  path: "/en/privacy",
  lang: "en",
});

export default function PrivacyPage() {
  return <PrivacyView lang="en" />;
}
