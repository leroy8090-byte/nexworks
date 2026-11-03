import { readFileSync, writeFileSync } from "node:fs";

const path = "src/data/projects.ts";
let t = readFileSync(path, "utf8");
const start = t.indexOf('{\n    slug: "sierra-immobilier"');
if (start < 0) {
  console.log("not found");
  process.exit(0);
}
// include leading comma
let from = start;
while (from > 0 && t[from - 1] !== ",") from--;
if (t[from - 1] === ",") from -= 1;
const endMarker = 'alt: "Site VOLT'; // noop
let end = t.indexOf("\n  },\n];", start);
// find closing of this object: next \n  }, after start that closes sierra block
end = t.indexOf("\n  },\n];", start);
// better: find the alt line then closing
const alt = t.indexOf('alt: "Proposition Sierra Immobilier', start);
const close = t.indexOf("\n  }", alt);
const after = close + "\n  }".length;
t = t.slice(0, from) + t.slice(after);
writeFileSync(path, t);
console.log("removed", !t.includes("sierra-immobilier"));
