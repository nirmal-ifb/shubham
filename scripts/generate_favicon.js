import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Design the 512x512 SVG for S&S Royal Favicon
const svg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient: Deep Royal Obsidian -->
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#182030" />
      <stop offset="60%" stop-color="#0f1522" />
      <stop offset="100%" stop-color="#07090e" />
    </radialGradient>

    <!-- Rich Polished Gold Gradient -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faecc5" />
      <stop offset="30%" stop-color="#dfb76c" />
      <stop offset="70%" stop-color="#b8860b" />
      <stop offset="100%" stop-color="#f5da8a" />
    </linearGradient>

    <!-- Warm Rose-Gold Accent Gradient -->
    <linearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffd5dc" />
      <stop offset="50%" stop-color="#f07d92" />
      <stop offset="100%" stop-color="#d4546a" />
    </linearGradient>

    <!-- Soft Glow Filter -->
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Circular background badge -->
  <circle cx="256" cy="256" r="250" fill="url(#bgGrad)" />

  <!-- Outer royal golden ring -->
  <circle cx="256" cy="256" r="236" fill="none" stroke="url(#goldGrad)" stroke-width="14" filter="url(#goldGlow)" />

  <!-- Delicate inner ornamental dashed ring -->
  <circle cx="256" cy="256" r="216" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-dasharray="10 8" opacity="0.8" />
  <circle cx="256" cy="256" r="202" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" opacity="0.5" />

  <!-- Accent star diamonds -->
  <path d="M 256 24 L 261 38 L 275 43 L 261 48 L 256 62 L 251 48 L 237 43 L 251 38 Z" fill="url(#goldGrad)" />
  <path d="M 256 450 L 261 464 L 275 469 L 261 474 L 256 488 L 251 474 L 237 469 L 251 464 Z" fill="url(#goldGrad)" />
  <path d="M 43 256 L 48 242 L 62 237 L 48 232 L 43 218 L 38 232 L 24 237 L 38 242 Z" fill="url(#goldGrad)" />
  <path d="M 469 256 L 474 242 L 488 237 L 474 232 L 469 218 L 464 232 L 450 237 L 464 242 Z" fill="url(#goldGrad)" />

  <!-- Interlocking S & S Monogram -->
  <g font-family="'Playfair Display', Georgia, 'Times New Roman', serif" font-weight="bold" text-anchor="middle" dominant-baseline="central">
    <!-- First 'S' -->
    <text x="160" y="254" font-size="205" fill="url(#goldGrad)" filter="url(#goldGlow)" letter-spacing="-5">S</text>
    
    <!-- Central Ampersand '&' with heart flourish -->
    <text x="256" y="256" font-family="'Cormorant Garamond', 'Great Vibes', Georgia, serif" font-style="italic" font-size="140" font-weight="normal" fill="url(#roseGold)" filter="url(#goldGlow)">&amp;</text>
    
    <!-- Second 'S' -->
    <text x="352" y="254" font-size="205" fill="url(#goldGrad)" filter="url(#goldGlow)" letter-spacing="-5">S</text>
  </g>

  <!-- Tiny golden crown / crest above center -->
  <path d="M 238 128 L 246 142 L 256 122 L 266 142 L 274 128 L 271 154 L 241 154 Z" fill="url(#goldGrad)" opacity="0.9" />
  <circle cx="256" cy="116" r="3.5" fill="url(#goldGrad)" />
  <circle cx="236" cy="122" r="2.8" fill="url(#goldGrad)" />
  <circle cx="276" cy="122" r="2.8" fill="url(#goldGrad)" />
</svg>
`;

async function main() {
  const staticDir = path.join(__dirname, '..', 'static');
  
  // 1. Save SVG
  fs.writeFileSync(path.join(staticDir, 'favicon.svg'), svg.trim());
  console.log('Saved favicon.svg');

  // 2. Render sizes
  const sizes = [16, 32, 48, 64, 180, 512];
  const pngBuffers = {};

  for (const s of sizes) {
    const buf = await sharp(Buffer.from(svg))
      .resize(s, s)
      .png()
      .toBuffer();
    pngBuffers[s] = buf;
    
    if (s === 180) {
      fs.writeFileSync(path.join(staticDir, 'apple-touch-icon.png'), buf);
    } else if (s === 32) {
      fs.writeFileSync(path.join(staticDir, 'favicon-32x32.png'), buf);
    } else if (s === 16) {
      fs.writeFileSync(path.join(staticDir, 'favicon-16x16.png'), buf);
    }
  }

  // 3. Assemble Windows ICO containing 16x16, 32x32, 48x48 PNGs
  const icoSizes = [16, 32, 48];
  const count = icoSizes.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Icon type = 1
  header.writeUInt16LE(count, 4); // Number of images

  const dirEntries = [];
  const imageBuffers = [];

  for (const s of icoSizes) {
    const buf = pngBuffers[s];
    imageBuffers.push(buf);

    const dir = Buffer.alloc(dirEntrySize);
    dir.writeUInt8(s === 256 ? 0 : s, 0); // Width
    dir.writeUInt8(s === 256 ? 0 : s, 1); // Height
    dir.writeUInt8(0, 2); // Color palette
    dir.writeUInt8(0, 3); // Reserved
    dir.writeUInt16LE(1, 4); // Color planes
    dir.writeUInt16LE(32, 6); // Bits per pixel
    dir.writeUInt32LE(buf.length, 8); // Size of image data
    dir.writeUInt32LE(offset, 12); // Offset
    dirEntries.push(dir);

    offset += buf.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...imageBuffers]);
  fs.writeFileSync(path.join(staticDir, 'favicon.ico'), icoBuffer);
  console.log('Saved favicon.ico, size:', icoBuffer.length);
}

main().catch(console.error);
