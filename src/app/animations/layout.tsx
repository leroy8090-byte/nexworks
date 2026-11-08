import type { Metadata } from "next";
import { anxSerif } from "@/components/animations/font";
import "@/components/animations/animations.css";

// Démonstrations plein écran, présentées depuis la page du service Design & UX/UI : jamais référencées.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AnimationsLayout({ children }: { children: React.ReactNode }) {
  return <div className={anxSerif.variable}>{children}</div>;
}
