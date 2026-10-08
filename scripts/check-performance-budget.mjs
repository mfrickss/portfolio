import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { resolve } from "node:path";

const output = resolve(process.argv[2] || "docs");
const html = await readFile(resolve(output, "index.html"), "utf8");
const initial = [...html.matchAll(/(?:src|href)="\/portfolio\/(assets\/[^"]+\.(?:js|css))"/g)].map((match) => match[1]);
let javascript = 0;
let css = 0;
for (const file of new Set(initial)) {
  const bytes = await readFile(resolve(output, file));
  if (file.endsWith(".js")) javascript += gzipSync(bytes).length;
  else css += bytes.length;
}
assert.ok(javascript > 0 && javascript <= 180_000, `Initial JavaScript gzip: ${javascript} bytes, budget 180000`);
assert.ok(css <= 60_000, `CSS: ${css} bytes, budget 60000`);
let hero = 0;
for (const name of ["coding-pov", "mountain-1", "mountain-2", "mountain-3", "sky", "planets"]) hero += (await stat(resolve(output, `assets/${name}.webp`))).size;
assert.ok(hero <= 700_000, `Hero and About media: ${hero}, budget 700000`);
const model = (await stat(resolve(output, "assets/models/tenhun_falling_spaceman_fanart.glb"))).size;
assert.ok(model <= 2_700_000, `GLB: ${model}, budget 2700000`);
console.log(JSON.stringify({ initialJavaScriptGzip: javascript, css, heroAndAbout: hero, model }, null, 2));
