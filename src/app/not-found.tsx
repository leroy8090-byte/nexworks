import type { Metadata } from "next";
import { NotFoundContent } from "@/views/NotFoundContent";

export const metadata: Metadata = { title: "Page introuvable / Page not found", robots: { index: false } };

export default function NotFound() {
  return <NotFoundContent />;
}
