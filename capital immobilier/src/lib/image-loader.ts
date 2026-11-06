/**
 * Les photos sont préparées à l'avance en plusieurs tailles (640, 1280, 1920 px) : le navigateur reçoit directement
 * un fichier statique, sans aucun calcul au moment de la visite. La largeur demandée reste dans l'adresse pour Next.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const isListing = src.startsWith("/biens/");
  const isMedia = src.startsWith("/media/");
  if ((!isListing && !isMedia) || !src.endsWith(".webp")) return `${src}?w=${width}`;
  const target = width <= 640 ? 640 : width <= 1280 ? 1280 : isMedia && width <= 1920 ? 1920 : null;
  return `${target ? src.replace(/\.webp$/, `-${target}.webp`) : src}?w=${width}`;
}
