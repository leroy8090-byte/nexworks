import type { Metadata } from "next";
import { getServicePage, servicePages } from "@/data/service-pages";
import { buildMetadata } from "@/lib/seo";
import { ServiceDetailView } from "@/views/ServiceDetailView";

type Params = { slug: string };

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = getServicePage((await params).slug);
  if (!page) return {};
  return buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/services/${page.slug}`, absoluteTitle: true });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  return <ServiceDetailView lang="fr" slug={(await params).slug} />;
}
