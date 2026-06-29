// One-off: rasterize the Halfcourt brand mark into favicon.ico + apple-icon.png.
import fs from "fs";
import sharp from "sharp";

const svg = fs.readFileSync("public/brand/brand-mark.svg");

async function png(size) {
  return sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();
}

// Assemble a PNG-based .ico (supported by all modern browsers + Windows).
function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  const data = [];
  let offset = 6 + count * 16;
  for (const { size, buf } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    data.push(buf);
    offset += buf.length;
  }
  return Buffer.concat([header, ...entries, ...data]);
}

const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(async (size) => ({ size, buf: await png(size) })));
fs.writeFileSync("src/app/favicon.ico", buildIco(images));
fs.writeFileSync("src/app/apple-icon.png", await png(180));

console.log("Wrote src/app/favicon.ico (16/32/48) and src/app/apple-icon.png (180)");
