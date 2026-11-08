import { existsSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // En local, ce projet réutilise les dépendances du dossier parent. Déployé seul, il n'a besoin de rien.
  ...(existsSync("node_modules/next") ? {} : { turbopack: { root: path.resolve("..") } }),
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { turbopackFileSystemCacheForDev: false },
  images: {
    // Toutes les tailles sont préparées à l'avance dans public/photos : aucun calcul à la visite.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 1280, 1920, 2560],
    imageSizes: [320],
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
