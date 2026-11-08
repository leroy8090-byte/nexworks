import { NextResponse, type NextRequest } from "next/server";
import { internalEnPath } from "@/i18n/config";

/**
 * Langues : le français reste à la racine (sans préfixe), l'anglais vit sous /en avec des adresses traduites.
 * - /proprietes        → réécrit en interne vers /fr/proprietes
 * - /en/properties     → réécrit en interne vers /en/proprietes
 * - /fr/...            → redirigé vers l'adresse sans préfixe (une seule adresse par page)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const internal = internalEnPath(pathname);
    if (internal === pathname) return NextResponse.next();
    url.pathname = internal;
    return NextResponse.rewrite(url);
  }
  url.pathname = `/fr${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Ni les fichiers internes de Next, ni les fichiers statiques (photos, logo, vidéo, icônes, robots, sitemap).
  matcher: ["/((?!_next/|.*\\.[a-zA-Z0-9]+$).*)"],
};
