const sharp = require('sharp');
const path = require('path');

const creamR = 248, creamG = 240, creamB = 227;
const brainDir = 'C:/Users/Nirmal/.gemini/antigravity-ide/brain/c2b4ff8e-51a7-4ff7-bb7c-7b83c52a4056';

async function processSeamless(inputPath, pngOutput) {
  console.log('Loading', inputPath);
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // 1. Tint all pixels with cream tone so the watercolor pigment blends naturally with #f8f0e3
  for (let i = 0; i < width * height; i++) {
    const p = i * channels;
    data[p]     = Math.round((data[p] / 255) * creamR);
    data[p + 1] = Math.round((data[p + 1] / 255) * creamG);
    data[p + 2] = Math.round((data[p + 2] / 255) * creamB);
  }

  // 2. Flood fill from borders to identify paper background
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isPaper(idx) {
    const p = idx * channels;
    // Cream paper has r >= 236, g >= 228, b >= 215
    return (data[p] >= 236 && data[p+1] >= 228 && data[p+2] >= 215);
  }

  // Seed all borders
  for (let x = 0; x < width; x++) {
    let idx = x;
    if (isPaper(idx)) { visited[idx] = 1; queue.push(idx); }
    idx = (height - 1) * width + x;
    if (isPaper(idx)) { visited[idx] = 1; queue.push(idx); }
  }
  for (let y = 0; y < height; y++) {
    let idx = y * width;
    if (!visited[idx] && isPaper(idx)) { visited[idx] = 1; queue.push(idx); }
    idx = y * width + (width - 1);
    if (!visited[idx] && isPaper(idx)) { visited[idx] = 1; queue.push(idx); }
  }

  // BFS
  let head = 0;
  while(head < queue.length) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    if (cx > 0) {
      const n = curr - 1;
      if (!visited[n] && isPaper(n)) { visited[n] = 1; queue.push(n); }
    }
    if (cx < width - 1) {
      const n = curr + 1;
      if (!visited[n] && isPaper(n)) { visited[n] = 1; queue.push(n); }
    }
    if (cy > 0) {
      const n = curr - width;
      if (!visited[n] && isPaper(n)) { visited[n] = 1; queue.push(n); }
    }
    if (cy < height - 1) {
      const n = curr + width;
      if (!visited[n] && isPaper(n)) { visited[n] = 1; queue.push(n); }
    }
  }

  // 3. Set alpha and cream background
  for (let i = 0; i < width * height; i++) {
    const p = i * channels;
    if (visited[i]) {
      // Paper background: 100% transparent, and color set to cream (#f8f0e3)
      data[p]     = creamR;
      data[p + 1] = creamG;
      data[p + 2] = creamB;
      data[p + 3] = 0;
    } else {
      // Artwork edge anti-aliasing
      const br = (data[p] + data[p+1] + data[p+2]) / 3;
      if (br > 234) {
        data[p + 3] = Math.max(0, Math.min(255, Math.round((242 - br) / 8 * 255)));
      } else {
        data[p + 3] = 255;
      }
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile(pngOutput);
  console.log('Saved seamless', pngOutput);
}

async function run() {
  await processSeamless(path.join(brainDir, 'floral_corner_tl_1792815740368.jpg'), 'static/floral_tl.png');
  await processSeamless(path.join(brainDir, 'floral_corner_br_1792815752156.jpg'), 'static/floral_br.png');
  console.log('Both floral assets perfectly processed!');
}

run().catch(console.error);
