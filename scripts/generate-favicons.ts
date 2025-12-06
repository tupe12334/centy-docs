import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pngToIco from "png-to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SVG_SOURCE = path.join(__dirname, "../static/img/favicon.svg");
const OUTPUT_DIR = path.join(__dirname, "../static/img");

const sizes = [16, 32, 48, 180, 192, 512];

async function generate() {
  const svg = readFileSync(SVG_SOURCE);

  // Generate PNGs
  for (const size of sizes) {
    const filename =
      size === 180 ? "apple-touch-icon.png" : `favicon-${size}x${size}.png`;

    await sharp(svg).resize(size, size).png().toFile(path.join(OUTPUT_DIR, filename));

    console.log(`Generated ${filename}`);
  }

  // Generate ICO from 32x32 PNG
  const png32 = await sharp(svg).resize(32, 32).png().toBuffer();
  const ico = await pngToIco(png32);
  writeFileSync(path.join(OUTPUT_DIR, "favicon.ico"), ico);

  console.log("Generated favicon.ico");
  console.log("\nAll favicons generated successfully!");
}

generate();
