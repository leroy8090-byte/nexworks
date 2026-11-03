import { chromium } from "playwright-core";
import sharp from "sharp";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const exe = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = process.env.RIVIERA_URL || "http://localhost:3000/maison-riviera";
mkdirSync("_shots", { recursive: true });
mkdirSync("public/projects", { recursive: true });
const b = await chromium.launch({ executablePath: exe });
const errs = [];

async function preparePage(p) {
  await p.addStyleTag({
    content: `
      nextjs-portal,.fixed.inset-x-0.bottom-0{display:none!important}
      * { animation: none !important; transition: none !important; }
      [style*="opacity"] { opacity: 1 !important; transform: none !important; filter: none !important; }
      img { opacity: 1 !important; visibility: visible !important; }
    `,
  }).catch(() => {});

  // Remplace les URL Next/Image lazy par les fichiers publics + charge tout
  await p.evaluate(async () => {
    const forceVisible = () => {
      document.querySelectorAll("[style]").forEach((el) => {
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("transform", "none", "important");
        el.style.setProperty("visibility", "visible", "important");
      });
    };
    forceVisible();

    document.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
      img.decoding = "sync";
      img.removeAttribute("loading");
      try {
        const u = new URL(img.currentSrc || img.src, location.origin);
        const raw = u.searchParams.get("url");
        if (raw) {
          img.src = decodeURIComponent(raw);
          img.removeAttribute("srcset");
          img.sizes = "";
        }
      } catch {
        /* ignore */
      }
      img.style.setProperty("opacity", "1", "important");
    });

    const total = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 280) {
      window.scrollTo(0, y);
      forceVisible();
      await new Promise((r) => setTimeout(r, 100));
    }

    // Scroll chaque image individuellement
    for (const img of [...document.images]) {
      img.scrollIntoView({ block: "center" });
      forceVisible();
      await new Promise((r) => {
        if (img.complete && img.naturalWidth > 0) return r();
        const done = () => r();
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
        setTimeout(done, 5000);
      });
    }

    window.scrollTo(0, 0);
    forceVisible();
    await new Promise((r) => setTimeout(r, 300));
  });

  // Attendre qu'aucune image azur ne soit vide
  await p.waitForFunction(
    () => {
      const imgs = [...document.images].filter((i) => (i.currentSrc || i.src).includes("/maison-riviera/"));
      return imgs.length > 0 && imgs.every((i) => i.complete && i.naturalWidth > 0);
    },
    { timeout: 20000 },
  ).catch(() => {});

  await p.waitForTimeout(400);
}

async function full(name, vp) {
  const ctx = await b.newContext({ viewport: vp, isMobile: vp.width < 600, hasTouch: vp.width < 600 });
  const p = await ctx.newPage();
  p.on("console", (m) => m.type() === "error" && errs.push(`${name}: ${m.text()}`));
  p.on("pageerror", (e) => errs.push(`${name}: ${e.message}`));
  await p.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await preparePage(p);
  const buf = await p.screenshot({ fullPage: true, animations: "disabled" });
  await p.screenshot({ path: `_shots/maison-riviera-${name}-fold.png`, animations: "disabled" });
  await ctx.close();
  return buf;
}

const desktop = await full("d", { width: 1100, height: 800 });
const mobile = await full("m", { width: 390, height: 844 });
await sharp(desktop).png().toFile("_shots/maison-riviera-desktop.png");
await sharp(mobile).png().toFile("_shots/maison-riviera-mobile.png");

const dm = await sharp(desktop).metadata();
const mm = await sharp(mobile).metadata();
await sharp(desktop).webp({ quality: 82 }).toFile("public/projects/maison-riviera-desktop.webp");
await sharp(mobile).webp({ quality: 82 }).toFile("public/projects/maison-riviera-mobile.webp");
await sharp(desktop)
  .extract({ left: 0, top: 0, width: 1100, height: Math.min(700, dm.height) })
  .resize(1400)
  .webp({ quality: 84 })
  .toFile("public/projects/maison-riviera-cover.webp");

const projectsPath = "src/data/projects.ts";
let src = readFileSync(projectsPath, "utf8");
src = src.replace(
  /desktop: \{ src: "\/projects\/maison-riviera-desktop\.webp", width: \d+, height: \d+ \}/,
  `desktop: { src: "/projects/maison-riviera-desktop.webp", width: ${dm.width}, height: ${dm.height} }`,
);
src = src.replace(
  /mobile: \{ src: "\/projects\/maison-riviera-mobile\.webp", width: \d+, height: \d+ \}/,
  `mobile: { src: "/projects/maison-riviera-mobile.webp", width: ${mm.width}, height: ${mm.height} }`,
);
writeFileSync(projectsPath, src);

console.log(JSON.stringify({ desktop: { w: dm.width, h: dm.height }, mobile: { w: mm.width, h: mm.height }, errors: errs }));
await b.close();
