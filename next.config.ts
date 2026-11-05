import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Disque limité sur ce poste : pas de cache de compilation persistant en développement.
  experimental: { turbopackFileSystemCacheForDev: false },
  // Les anciennes pages Secteurs renvoient vers Services, pour ne pas créer de pages d'erreur.
  async redirects() {
    return [
      { source: "/secteurs", destination: "/services", permanent: true },
      { source: "/secteurs/:slug", destination: "/services", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
