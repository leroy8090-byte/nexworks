/** Les photos existent déjà en 640, 1280 et 1920 px : le navigateur reçoit un fichier statique, sans calcul. */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/photos/") || !src.endsWith(".webp")) return `${src}?w=${width}`;
  const target = width <= 640 ? 640 : width <= 1280 ? 1280 : width <= 1920 ? 1920 : null;
  return `${target ? src.replace(/\.webp$/, `-${target}.webp`) : src}?w=${width}`;
}
