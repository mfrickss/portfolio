import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const assets = resolve(root, "public/assets");
await mkdir(assets, { recursive: true });
for (const name of ["coding-pov.png", "mountain-1.png", "mountain-2.png", "mountain-3.png", "sky.jpg", "planets.png"]) {
  const original = await readFile(resolve(root, "assets-source/hero", name));
  const optimized = await sharp(original).webp({ quality: 85, effort: 6 }).toBuffer();
  await writeFile(resolve(assets, name.replace(/\.(png|jpg)$/, ".webp")), optimized);
  console.log(`${name}: ${original.length} → ${optimized.length} bytes`);
}

// Repack buffer views with a lossless WebP texture. Meshes, joints and animations
// retain their original bytes and names, so the generated JSX remains valid.
const name = "tenhun_falling_spaceman_fanart.glb";
const original = await readFile(resolve(root, "assets-source/models", name));
const jsonLength = original.readUInt32LE(12);
const document = JSON.parse(original.subarray(20, 20 + jsonLength).toString());
const binary = original.subarray(28 + jsonLength);
const images = new Map(document.images.map((image, index) => [image.bufferView, { image, index }]));
const parts = [];
let offset = 0;
for (const [index, view] of document.bufferViews.entries()) {
  let data = binary.subarray(view.byteOffset || 0, (view.byteOffset || 0) + view.byteLength);
  if (images.has(index)) {
    const { image, index: imageIndex } = images.get(index);
    data = await sharp(data).webp({ lossless: true, effort: 6 }).toBuffer();
    image.mimeType = "image/webp";
    for (const texture of document.textures) {
      if (texture.source === imageIndex) {
        texture.extensions = { ...texture.extensions, EXT_texture_webp: { source: imageIndex } };
        delete texture.source;
      }
    }
  }
  view.byteOffset = offset;
  view.byteLength = data.length;
  parts.push(data);
  const padding = (4 - data.length % 4) % 4;
  if (padding) parts.push(Buffer.alloc(padding));
  offset += data.length + padding;
}
document.extensionsUsed = [...new Set([...(document.extensionsUsed || []), "EXT_texture_webp"])];
document.extensionsRequired = [...new Set([...(document.extensionsRequired || []), "EXT_texture_webp"])];
document.buffers[0].byteLength = offset;
const json = Buffer.from(JSON.stringify(document));
const jsonPadding = Buffer.alloc((4 - json.length % 4) % 4, 0x20);
const jsonChunk = Buffer.concat([json, jsonPadding]);
const binChunk = Buffer.concat(parts);
const header = Buffer.alloc(20);
header.writeUInt32LE(0x46546c67, 0);
header.writeUInt32LE(2, 4);
header.writeUInt32LE(28 + jsonChunk.length + binChunk.length, 8);
header.writeUInt32LE(jsonChunk.length, 12);
header.writeUInt32LE(0x4e4f534a, 16);
const binHeader = Buffer.alloc(8);
binHeader.writeUInt32LE(binChunk.length, 0);
binHeader.writeUInt32LE(0x004e4942, 4);
const optimized = Buffer.concat([header, jsonChunk, binHeader, binChunk]);
await mkdir(resolve(assets, "models"), { recursive: true });
await writeFile(resolve(assets, "models", name), optimized);
console.log(`${name}: ${original.length} → ${optimized.length} bytes (lossless texture)`);
