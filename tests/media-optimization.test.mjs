import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import sharp from "sharp";

function parse(bytes) {
  assert.equal(bytes.readUInt32LE(0), 0x46546c67);
  assert.equal(bytes.readUInt32LE(8), bytes.length);
  const length = bytes.readUInt32LE(12);
  return { json: JSON.parse(bytes.subarray(20, 20 + length)), binary: bytes.subarray(28 + length) };
}

test("optimized GLB preserves geometry, joints, animations and texture pixels", async () => {
  const filename = "tenhun_falling_spaceman_fanart.glb";
  const source = parse(await readFile(`assets-source/models/${filename}`));
  const output = parse(await readFile(`public/assets/models/${filename}`));
  // JSON serialization normalizes negative zero, with no effect on transforms.
  for (const field of ["nodes", "meshes", "skins", "animations", "accessors", "materials"]) assert.deepEqual(output.json[field], JSON.parse(JSON.stringify(source.json[field])), field);
  const imageViews = new Set(source.json.images.map((image) => image.bufferView));
  const slice = (model, index) => { const view = model.json.bufferViews[index]; return model.binary.subarray(view.byteOffset || 0, (view.byteOffset || 0) + view.byteLength); };
  for (const [index] of source.json.bufferViews.entries()) {
    if (imageViews.has(index)) {
      const before = await sharp(slice(source, index)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const after = await sharp(slice(output, index)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      assert.deepEqual(after.info, before.info);
      assert.deepEqual(after.data, before.data, "lossless texture pixels");
    } else assert.deepEqual(slice(output, index), slice(source, index), `buffer view ${index}`);
  }
  assert.ok(output.json.extensionsRequired.includes("EXT_texture_webp"));
});
