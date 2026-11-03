import sharp from "sharp";
import fs from "fs";
import path from "path";
const dir = "D:/nexworks-agency/public/volt";
for (const f of fs.readdirSync(dir).filter((x) => x.toLowerCase().endsWith(".jpg"))) {
  const input = path.join(dir, f);
  const out = path.join(dir, f.replace(/\.jpg$/i, ".webp"));
  const st = fs.statSync(input);
  if (st.size < 1000) {
    console.log("skip tiny", f);
    continue;
  }
  await sharp(input).webp({ quality: 78 }).toFile(out);
  console.log("ok", path.basename(out), st.size);
}
