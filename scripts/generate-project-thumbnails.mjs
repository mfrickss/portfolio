import { mkdir, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { myProjects, projectThumbnailWidths } from "../src/components/constants/index.js";

const root = fileURLToPath(new URL("../", import.meta.url));

for (const project of myProjects) {
  const source = resolve(root, "public", project.image);
  const { width, height } = await sharp(source).metadata();
  if (width !== project.imageWidth || height !== project.imageHeight) {
    throw new Error(`${project.key}: source dimensions ${width} × ${height} differ from the catalog`);
  }
  const outputs = await Promise.all(projectThumbnailWidths.map(async (width) => {
    const output = resolve(root, "public", `${project.cardImage}-${width}.webp`);
    await mkdir(dirname(output), { recursive: true });
    await sharp(source).resize({ width, height: width * 9 / 16, fit: project.imageFit, background: "#06091f" })
      .webp({ quality: 82, effort: 6 }).toFile(output);
    return `${width}w: ${(await stat(output)).size} bytes`;
  }));
  console.log(`${project.key}: ${outputs.join(", ")}`);
}
