import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ApproachView } from "@/views/ApproachView";

export const metadata: Metadata = buildMetadata({
  title: "Our website creation method | NEXWORKS AGENCY",
  description:
    "How NEXWORKS AGENCY builds your website in four steps: listen, design, build and make you visible, with clear sign-offs and a quote before we start.",
  path: "/en/approach",
  absoluteTitle: true,
  lang: "en",
});

export default function ApproachPage() {
  return <ApproachView lang="en" />;
}
