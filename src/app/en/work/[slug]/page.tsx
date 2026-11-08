import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import { ProjectView, projectMetadataParts } from "@/views/ProjectView";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const parts = projectMetadataParts("en", (await params).slug);
  return parts ? buildMetadata({ ...parts, lang: "en" }) : {};
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  return <ProjectView lang="en" slug={(await params).slug} />;
}
