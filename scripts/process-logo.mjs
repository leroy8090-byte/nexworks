// Extrait le logo NEXWORKS fourni (fond noir) vers des PNG transparents, sans le redessiner.
// Technique "unmultiply from black" : alpha = max(r,g,b), couleur = c / alpha.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "public/brand/nexworks-logo-source.png";
const OUT = "public/brand";
mkdirSync(OUT, { recursive: true });

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// 1. Image RGBA transparente
const rgba = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) {
  const r = data[i * 4],
    g = data[i * 4 + 1],
    b = data[i * 4 + 2];
  const a = Math.max(r, g, b);
  if (a < 10) continue;
  rgba[i * 4] = Math.min(255, Math.round((r * 255) / a));
  rgba[i * 4 + 1] = Math.min(255, Math.round((g * 255) / a));
  rgba[i * 4 + 2] = Math.min(255, Math.round((b * 255) / a));
  rgba[i * 4 + 3] = a;
}

// 2. Profil des colonnes pour trouver les zones du logo
const colHas = new Array(W).fill(false);
const rowMin = new Array(W).fill(H);
const rowMax = new Array(W).fill(-1);
for (let x = 0; x < W; x++) {
  for (let y = 0; y < H; y++) {
    if (rgba[(y * W + x) * 4 + 3] > 40) {
      colHas[x] = true;
      rowMin[x] = Math.min(rowMin[x], y);
      rowMax[x] = Math.max(rowMax[x], y);
    }
  }
}
const segments = [];
let start = null;
for (let x = 0; x <= W; x++) {
  if (x < W && colHas[x]) {
    if (start === null) start = x;
  } else if (start !== null) {
    segments.push([start, x - 1]);
    start = null;
  }
}
console.log("segments (x):", segments);

const bbox = (x0, x1) => {
  let y0 = H,
    y1 = -1;
  for (let x = x0; x <= x1; x++) {
    y0 = Math.min(y0, rowMin[x]);
    y1 = Math.max(y1, rowMax[x]);
  }
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
};

const full = bbox(segments[0][0], segments[segments.length - 1][1]);
const symbolSeg = segments[0];
const symbol = bbox(symbolSeg[0], symbolSeg[1]);
console.log({ full, symbol });

const base = sharp(rgba, { raw: { width: W, height: H, channels: 4 } });
const pad = 6;
const padded = (b) => ({
  left: Math.max(0, b.left - pad),
  top: Math.max(0, b.top - pad),
  width: Math.min(W - Math.max(0, b.left - pad), b.width + pad * 2),
  height: Math.min(H - Math.max(0, b.top - pad), b.height + pad * 2),
});

await base.clone().extract(padded(full)).png({ compressionLevel: 9 }).toFile(`${OUT}/nexworks-logo.png`);
await base.clone().extract(padded(symbol)).png({ compressionLevel: 9 }).toFile(`${OUT}/nexworks-symbol.png`);

const sym = await sharp(`${OUT}/nexworks-symbol.png`).resize({ height: 300 }).toBuffer();
for (const [name, size] of [
  ["icon.png", 512],
  ["apple-icon.png", 180],
]) {
  const inner = await sharp(sym)
    .resize({ height: Math.round(size * 0.58), fit: "inside" })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: "#050505" } })
    .composite([{ input: inner, gravity: "center" }])
    .png()
    .toFile(`src/app/${name}`);
}
console.log("OK");
