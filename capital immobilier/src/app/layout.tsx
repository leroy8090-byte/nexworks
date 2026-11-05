import type { Metadata, Viewport } from "next";
import { MotionConfig } from "framer-motion";
import { siteUrl } from "@/components/capital/seo";
import "./globals.css";

export const metadata: Metadata = { metadataBase: new URL(siteUrl) };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh antialiased">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
