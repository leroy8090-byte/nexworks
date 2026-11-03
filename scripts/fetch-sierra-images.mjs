import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

mkdirSync("public/sierra-immobilier", { recursive: true });

const shots = {
  hero: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80",
  about: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
  "service-acheter": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80",
  "service-vendre": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  "service-louer": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
  "service-gerer": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
  "sector-saint-raphael": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=80",
  "sector-frejus": "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1400&q=80",
  "sector-puget": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=80",
  "appartement-t4-centre-saint-raphael-1": "https://images.unsplash.com/photo-1502672023489-bf0a748892f4?auto=format&fit=crop&w=1400&q=80",
  "appartement-t4-centre-saint-raphael-2": "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1400&q=80",
  "appartement-t4-centre-saint-raphael-3": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
  "villa-vue-mer-frejus-1": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
  "villa-vue-mer-frejus-2": "https://images.unsplash.com/photo-1600607687939-ce8a79db47e1?auto=format&fit=crop&w=1400&q=80",
  "villa-vue-mer-frejus-3": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  "maison-familiale-puget-1": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80",
  "maison-familiale-puget-2": "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1400&q=80",
  "maison-familiale-puget-3": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
  "appartement-location-saint-raphael-1": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
  "appartement-location-saint-raphael-2": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80",
  "appartement-location-saint-raphael-3": "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1400&q=80",
  "appartement-t3-frejus-plage-1": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
  "appartement-t3-frejus-plage-2": "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1400&q=80",
  "appartement-t3-frejus-plage-3": "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=80",
  "villa-contemporaine-saint-raphael-1": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80",
  "villa-contemporaine-saint-raphael-2": "https://images.unsplash.com/photo-1600573472592-401b489a3cd8?auto=format&fit=crop&w=1400&q=80",
  "villa-contemporaine-saint-raphael-3": "https://images.unsplash.com/photo-1600047509358-9dc7556c519d?auto=format&fit=crop&w=1400&q=80",
};

let ok = 0, fail = 0;
for (const [name, url] of Object.entries(shots)) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", Accept: "image/*" }, redirect: "follow" });
    if (!res.ok) { console.log("fail", name, res.status); fail++; continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1000) { console.log("tiny", name); fail++; continue; }
    await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(join("public/sierra-immobilier", `${name}.webp`));
    ok++; console.log("ok", name);
  } catch (e) {
    console.log("err", name, e.message); fail++;
  }
}
console.log({ ok, fail });
