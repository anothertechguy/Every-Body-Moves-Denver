// One-time image pipeline: emits responsive AVIF variants + a compressed JPEG
// fallback for every source photo into public/images/.
// Usage: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdirSync } from "node:fs";
import { join, parse } from "node:path";

const SRC = "src/assets";
const OUT = "public/images";
const WIDTHS = [480, 800, 1200, 1600];

for (const file of readdirSync(SRC).filter((f) => f.endsWith(".jpg"))) {
  const name = parse(file).name;
  const input = sharp(join(SRC, file));
  const { width: srcW } = await input.metadata();
  for (const w of WIDTHS.filter((w) => w <= srcW)) {
    await input.clone().resize(w).avif({ quality: 55 }).toFile(join(OUT, `${name}-${w}.avif`));
  }
  await input.clone().resize(Math.min(1600, srcW)).jpeg({ quality: 74, mozjpeg: true }).toFile(join(OUT, `${name}.jpg`));
  console.log("done:", name);
}
