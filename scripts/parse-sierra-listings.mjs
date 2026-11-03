import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

function decode(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&eacute;/g, "é")
    .replace(/&egrave;/g, "è")
    .replace(/&Eacute;/g, "É")
    .replace(/&agrave;/g, "à")
    .replace(/&ocirc;/g, "ô")
    .replace(/&ccedil;/g, "ç")
    .replace(/&ucirc;/g, "û")
    .replace(/&euro;/g, "€")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/Â/g, "")
    .replace(/€/g, "€")
    .replace(/–|—|â€“|â€”/g, "–")
    .replace(/Â²|Â°/g, "²")
    .replace(/Ã©/g, "é")
    .replace(/Ã¨/g, "è")
    .replace(/Ã /g, "à")
    .replace(/Ã´/g, "ô")
    .replace(/Ã®/g, "î")
    .replace(/Ã§/g, "ç")
    .replace(/Ã‰/g, "É")
    .replace(/ÃŽ/g, "Î")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCards(source, kind) {
  const blocks = source.split(/listing-v3__item item/i).slice(1);
  const items = [];
  for (const block of blocks) {
    const href = block.match(new RegExp(`href="(/${kind}/83-var/[^"]+)"`, "i"))?.[1];
    if (!href) continue;
    const path = href.replace(/\/$/, "") + "/";
    const slug = path.split("/").filter(Boolean).pop() || "";
    const title =
      decode(block.match(/title-subtitle__content[^>]*>\s*<span>([^<]+)<\/span>/i)?.[1] || "") ||
      decode(block.match(/title="Voir le bien - ([^"]+)"/i)?.[1] || "") ||
      slug;
    const cityRaw =
      block.match(/title-subtitle__subtitle">([^<]+)</i)?.[1] ||
      block.match(/Saint[\s\-]?Rapha./i)?.[0] ||
      "";
    const city = decode(cityRaw.replace(/<br\s*\/?>/gi, " ").replace(/\(.*?\)/g, "")).replace(/\s+/g, " ") || "Saint-Raphaël";
    const priceRaw = block.match(/__price-value">\s*([\d\s.]+)/i)?.[1] || "";
    const price = Number(priceRaw.replace(/[^\d]/g, "")) || 0;
    const surface = Number(String(block.match(/(\d+(?:[.,]\d+)?)\s*m/i)?.[1] || "").replace(",", ".")) || 0;
    const rooms =
      Number(path.match(/\/t(\d)\//i)?.[1] || 0) ||
      Number(block.match(/(\d+)\s*pi/i)?.[1] || 0) ||
      0;
    const type = path.includes("appartement")
      ? "appartement"
      : path.includes("maison")
        ? "maison"
        : path.includes("villa")
          ? "villa"
          : path.includes("terrain")
            ? "terrain"
            : path.includes("studio")
              ? "appartement"
              : "appartement";
    let image =
      block.match(/data-src="(\/\/[^"]+)"/i)?.[1] ||
      block.match(/data-src="(https?:\/\/[^"]+)"/i)?.[1] ||
      "";
    if (image.startsWith("//")) image = `https:${image}`;
    const exclusif = /Exclusif/i.test(block);
    const coupDeCoeur = /Coup de c/i.test(block);
    items.push({
      href: `https://www.sierra-immo.fr${path}`,
      path,
      slug,
      title: title.replace(/\.\.\.$/, "").trim(),
      price,
      surface,
      rooms,
      city: /rapha/i.test(city) ? "Saint-Raphaël" : /fr.?jus/i.test(city) ? "Fréjus" : /puget/i.test(city) ? "Puget-sur-Argens" : city,
      type,
      image,
      exclusif,
      coupDeCoeur,
      transaction: kind === "vente" ? "achat" : "location",
      source: "sierra-immo.fr",
    });
  }
  // dedupe by slug
  const map = new Map();
  for (const it of items) if (!map.has(it.slug)) map.set(it.slug, it);
  return [...map.values()];
}

const ventesHtml = readFileSync("D:/tmp/sierra-https-www-sierra-immo-fr-vente.html", "utf8");
const locsHtml = readFileSync("D:/tmp/sierra-https-www-sierra-immo-fr-location.html", "utf8");
const ventes = parseCards(ventesHtml, "vente");
const locs = parseCards(locsHtml, "location");

mkdirSync("public/sierra-immobilier/biens", { recursive: true });

async function fetchImg(item, i) {
  if (!item.image) return null;
  try {
    const res = await fetch(item.image, {
      headers: { "User-Agent": "Mozilla/5.0", Accept: "image/*", Referer: "https://www.sierra-immo.fr/" },
      redirect: "follow",
    });
    if (!res.ok) {
      console.log("img fail", item.slug, res.status);
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const local = `/sierra-immobilier/biens/${String(i).padStart(2, "0")}-${item.slug.slice(0, 40)}.webp`;
    await sharp(buf).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(join("public", local));
    console.log("img ok", local);
    return local;
  } catch (e) {
    console.log("img err", item.slug, e.message);
    return null;
  }
}

const all = [...ventes, ...locs];
for (let i = 0; i < all.length; i++) {
  const local = await fetchImg(all[i], i + 1);
  all[i].localImage = local || "/sierra-immobilier/agency.webp";
}

writeFileSync("D:/tmp/sierra-listings.json", JSON.stringify({ ventes: all.filter((x) => x.transaction === "achat"), locs: all.filter((x) => x.transaction === "location") }, null, 2));
console.log(
  JSON.stringify(
    {
      ventes: ventes.length,
      locs: locs.length,
      sample: all.slice(0, 12).map((v) => ({
        title: v.title,
        price: v.price,
        surface: v.surface,
        rooms: v.rooms,
        city: v.city,
        type: v.type,
        local: v.localImage,
        exclusif: v.exclusif,
      })),
    },
    null,
    2,
  ),
);
