import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { HomeView } from "@/views/HomeView";

export const metadata: Metadata = buildMetadata({
  title: "Website creation, SEO and GEO | NEXWORKS AGENCY",
  description:
    "Web agency: custom website creation, redesign, SEO and GEO so you are found on Google and understood by AI assistants. Personalised quote.",
  path: "/en",
  absoluteTitle: true,
  lang: "en",
});

export default function HomePage() {
  return <HomeView lang="en" />;
}
