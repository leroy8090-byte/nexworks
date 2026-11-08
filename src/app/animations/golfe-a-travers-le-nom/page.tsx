import type { Metadata } from "next";
import { animationBySlug } from "@/components/animations/data";
import { Player } from "@/components/animations/Player";

const a = animationBySlug("golfe-a-travers-le-nom")!;

export const metadata: Metadata = { title: `${a.name} — animation d'entrée`, robots: { index: false, follow: false } };

export default function Page() {
  return <Player slug="golfe-a-travers-le-nom" name={a.name} />;
}
