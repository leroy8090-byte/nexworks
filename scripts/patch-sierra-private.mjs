import { readFileSync, writeFileSync, readdirSync, renameSync, existsSync } from "node:fs";
import { join } from "node:path";

// Replace framed images
const dir = "public/sierra-immobilier/biens";
for (const f of readdirSync(dir)) {
  if (!f.endsWith("-framed.webp")) continue;
  const dest = join(dir, f.replace("-framed.webp", ".webp"));
  renameSync(join(dir, f), dest);
  console.log("framed ->", dest);
}

// Remove sierra portfolio project
let projects = readFileSync("src/data/projects.ts", "utf8");
const before = projects.includes('slug: "sierra-immobilier"');
projects = projects.replace(/,\s*\{\s*slug: "sierra-immobilier"[\s\S]*?alt: "Proposition Sierra Immobilier[^"]*"\s*\}/, "");
writeFileSync("src/data/projects.ts", projects);
console.log("portfolio removed:", before, "->", projects.includes('slug: "sierra-immobilier"'));

// Delete public portfolio captures if present
for (const f of ["sierra-cover.webp", "sierra-desktop.webp", "sierra-mobile.webp"]) {
  const p = join("public/projects", f);
  if (existsSync(p)) {
    // keep files but unused is fine; optional delete
  }
}
