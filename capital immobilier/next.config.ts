import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // En local, ce projet réutilise les dépendances du dossier parent : la racine doit les inclure.
  // Pour le déployer seul : retirer cette ligne et lancer npm install dans ce dossier.
  turbopack: { root: path.resolve("..") },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { turbopackFileSystemCacheForDev: false },
  images: {
    formats: ["image/avif", "image/webp"],
    // Photos des biens : stockage du logiciel NEXWORKS ESTATE (Supabase en production, émulateur en local).
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/estate-media/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "54321", pathname: "/storage/v1/object/public/estate-media/**" },
    ],
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
  },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};

export default nextConfig;
