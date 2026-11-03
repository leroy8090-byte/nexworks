// Prépare les visuels des projets à partir des captures des sites réels (D:/tmp/cap -> public/projects).
// Usage : node scripts/process-projects.mjs <dossier-des-captures>
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const src = process.argv[2] || "D:/tmp/cap";
const out = "public/projects";
mkdirSync(out, { recursive: true });

for (const id of ["solea", "calyra"]) {
  // Couverture (hero du site)
  await sharp(`${src}/${id}-desktop-fold.png`).resize({ width: 1400 }).webp({ quality: 78 }).toFile(`${out}/${id}-cover.webp`);
  // Page d'accueil complète (défile au survol) : premiers ~9000 px de la page
  const d = await sharp(`${src}/${id}-desktop-full.png`).metadata();
  const cropH = Math.min(d.height, 9000);
  await sharp(`${src}/${id}-desktop-full.png`)
    .extract({ left: 0, top: 0, width: d.width, height: cropH })
    .resize({ width: 1100 })
    .webp({ quality: 68 })
    .toFile(`${out}/${id}-desktop.webp`);
  // Mobile : premiers ~3600 px CSS (dsf 2)
  const m = await sharp(`${src}/${id}-mobile-full.png`).metadata();
  await sharp(`${src}/${id}-mobile-full.png`)
    .extract({ left: 0, top: 0, width: m.width, height: Math.min(m.height, 3600 * 2) })
    .resize({ width: 390 })
    .webp({ quality: 70 })
    .toFile(`${out}/${id}-mobile.webp`);
  const info = await sharp(`${out}/${id}-desktop.webp`).metadata();
  const info2 = await sharp(`${out}/${id}-mobile.webp`).metadata();
  console.log(id, "desktop", info.width, info.height, "mobile", info2.width, info2.height);
}
