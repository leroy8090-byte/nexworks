import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { WorkView } from "@/views/WorkView";

export const metadata: Metadata = buildMetadata({
  title: "Examples of websites created by NEXWORKS AGENCY",
  description:
    "Demonstration websites created by NEXWORKS AGENCY: restaurant, hotel, tradesperson, real estate, fitness club and car rental. See how we design a website.",
  path: "/en/work",
  absoluteTitle: true,
  lang: "en",
});

export default function WorkPage() {
  return <WorkView lang="en" />;
}
