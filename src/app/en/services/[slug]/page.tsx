import type { Metadata } from "next";
import { getServicePageFor, servicePagesFor } from "@/data/localized";
import { buildMetadata } from "@/lib/seo";
import { ServiceDetailView } from "@/views/ServiceDetailView";

type Params = { slug: string };

export function generateStaticParams() {
  return servicePagesFor("en").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = getServicePageFor("en", (await params).slug);
  if (!page) return {};
  return buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/en/services/${page.slug}`, absoluteTitle: true, lang: "en" });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  return <ServiceDetailView lang="en" slug={(await params).slug} />;
}
