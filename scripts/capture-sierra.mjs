import { chromium } from "playwright-core";
import sharp from "sharp";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = process.env.SIERRA_URL || "http://localhost:3000/sierra-immobilier";
mkdirSync("_shots", { recursive: true });
mkdirSync("public/projects", { recursive: true });
const b = await chromium.launch({ executablePath: EDGE });
const errs = [];

async function preparePage(p) {
  await p
    .addStyleTag({
      content: `
      nextjs-portal,.fixed.inset-x-0.bottom-0{display:none!important}
      * { animation: none !important; transition: none !important; }
      [style*="opacity"] { opacity: 1 !important; transform: none !important; filter: none !important; }
      img { opacity: 1 !important; visibility: visible !important; }
    `,
    })
    .catch(() => {});

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
    });
    const total = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 280) {
      window.scrollTo(0, y);
      forceVisible();
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });
  await p.waitForTimeout(400);
}

async function full(name, vp) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1, isMobile: vp.width < 600, hasTouch: vp.width < 600 });
  const p = await ctx.newPage();
  p.on("console", (m) => m.type() === "error" && errs.push(`${name}: ${m.text()}`));
  await p.goto(BASE, { waitUntil: "networkidle", timeout: 90000 });
  await preparePage(p);
  const buf = await p.screenshot({ fullPage: true, animations: "disabled" });
  await ctx.close();
  return buf;
}

const desktop = await full("d", { width: 1100, height: 800 });
const mobile = await full("m", { width: 390, height: 844 });
const dm = await sharp(desktop).metadata();
const mm = await sharp(mobile).metadata();
await sharp(desktop).webp({ quality: 82 }).toFile("public/projects/sierra-desktop.webp");
await sharp(mobile).resize({ width: 390 }).webp({ quality: 82 }).toFile("public/projects/sierra-mobile-tmp.webp");
const { renameSync, unlinkSync, existsSync } = await import("node:fs");
if (existsSync("public/projects/sierra-mobile.webp")) {
  try {
    unlinkSync("public/projects/sierra-mobile.webp");
  } catch {
    /* locked */
  }
}
renameSync("public/projects/sierra-mobile-tmp.webp", "public/projects/sierra-mobile.webp");
const mm2 = await sharp("public/projects/sierra-mobile.webp").metadata();
await sharp(desktop)
  .extract({ left: 0, top: 0, width: 1100, height: Math.min(700, dm.height) })
  .resize(1400)
  .webp({ quality: 84 })
  .toFile("public/projects/sierra-cover.webp");

let src = readFileSync("src/data/projects.ts", "utf8");
src = src.replace(
  /desktop: \{ src: "\/projects\/sierra-desktop\.webp", width: \d+, height: \d+ \}/,
  `desktop: { src: "/projects/sierra-desktop.webp", width: ${dm.width}, height: ${dm.height} }`,
);
src = src.replace(
  /mobile: \{ src: "\/projects\/sierra-mobile\.webp", width: \d+, height: \d+ \}/,
  `mobile: { src: "/projects/sierra-mobile.webp", width: ${mm2.width}, height: ${mm2.height} }`,
);
writeFileSync("src/data/projects.ts", src);
console.log(JSON.stringify({ desktop: { w: dm.width, h: dm.height }, mobile: { w: mm2.width, h: mm2.height }, errors: errs }));
await b.close();
