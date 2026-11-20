// Regenerates the favicon, Apple touch icon and PWA icons from public/logo/shield.svg.
//   node scripts/make-icons.mjs
import sharp from "sharp";
import { copyFileSync } from "node:fs";

const SRC = "public/logo/shield.svg";
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

// Square canvas with the shield centred; `pad` is the fraction left empty around it.
async function square(size, out, { pad = 0.1, background = { r: 0, g: 0, b: 0, alpha: 0 } } = {}) {
  const h = Math.round(size * (1 - pad * 2));
  const shield = await sharp(SRC, { density: 600 }).resize({ height: h }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: shield, gravity: "center" }])
    .png()
    .toFile(out);
  console.log("wrote", out);
}

copyFileSync(SRC, "src/app/icon.svg"); // modern browsers
console.log("wrote src/app/icon.svg");
await square(32, "src/app/icon.png", { pad: 0.02 }); // fallback favicon
await square(180, "src/app/apple-icon.png", { pad: 0.12, background: WHITE }); // iOS home screen
await square(192, "public/icon-192.png", { pad: 0.1, background: WHITE });
await square(512, "public/icon-512.png", { pad: 0.1, background: WHITE });
await sharp(SRC, { density: 600 }).resize({ width: 512 }).png().toFile("public/logo/shield.png"); // JSON-LD logo
console.log("wrote public/logo/shield.png");
