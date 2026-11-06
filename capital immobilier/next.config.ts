import { readFileSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

/** Les annonces gardent leur référencement : chaque ancienne adresse mène à sa nouvelle fiche. */
const snapshot = JSON.parse(readFileSync("src/data/listings.snapshot.json", "utf8")) as { listings: { slug: string; sourceUrl: string }[] };
const go = (source: string, destination: string) => ({ source, destination, statusCode: 301 as const });

const nextConfig: NextConfig = {
  // En local, ce projet réutilise les dépendances du dossier parent : la racine doit les inclure.
  // Pour le déployer seul : retirer cette ligne et lancer npm install dans ce dossier.
  turbopack: { root: path.resolve("..") },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { turbopackFileSystemCacheForDev: false },
  images: {
    // Toutes les tailles sont préparées à l'avance dans public/ : aucun calcul à la visite.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 1280, 1920, 2560],
    imageSizes: [320],
  },
  async redirects() {
    const search = "/:s(0-acheter-.*)";
    return [
      ...snapshot.listings.map((l) => go(new URL(l.sourceUrl).pathname, `/biens/${l.slug}`)),
      // Une annonce retirée depuis mène à la liste, plutôt qu'à une erreur.
      go("/:old(\\d+-[^/]*\\.html)", "/biens"),
      go("/toutes-nos-annonces.html", "/biens"),
      go("/a-vendre/:p*", "/biens?transaction=vente"),
      go("/a-louer/:p*", "/biens?transaction=location"),
      go("/a-louer-vacances/:p*", "/location-vacances"),
      go("/syndic.html", "/syndic"),
      go("/gestion-locative.html", "/gestion-locative"),
      go("/mentions-legales.html", "/mentions-legales"),
      go("/contact.html", "/contact"),
      go("/nos-liens.html", "/agence"),
      go("/selection.html", "/favoris"),
      go("/alerte-email.html", "/acheter#demande"),
      go("/plan-du-site.html", "/plan-du-site"),
      go("/i/redac/honoraires", "/honoraires"),
      go(`${search}/:v(1-une.*)/:p`, "/annonces/maisons-a-vendre-saint-raphael"),
      go(`${search}/:v(2-un.*)/:p`, "/annonces/appartements-a-vendre-saint-raphael"),
      go(`${search}/:v(5-un.*)/:p`, "/biens?transaction=vente&type=Terrain"),
      go(`${search}/:n(\\d)-pieces/:p`, "/biens?transaction=vente&commune=Saint-Rapha%C3%ABl&pieces=:n"),
      go(`${search}/:v(centre.*)/:p`, "/secteurs/saint-raphael"),
      go(`${search}/:v(santa.*)/:p`, "/secteurs/santa-lucia"),
      go(`${search}/:v(.*boulouris.*)/:p`, "/secteurs/boulouris"),
      go(`${search}/:v(.*valescure.*)/:p`, "/secteurs/valescure"),
      go(`${search}/:p*`, "/annonces/appartements-a-vendre-saint-raphael"),
    ];
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
