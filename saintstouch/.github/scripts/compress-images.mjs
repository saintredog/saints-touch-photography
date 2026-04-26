/**
 * Auto-compress images in public/images/ before deploy.
 * - Max 2000px wide
 * - JPEG quality 78 (~400-700KB target)
 * - Skips already-compressed files (under 800KB)
 * - Skips non-image files
 */

import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, '../../public/images');
const MAX_SIZE_BYTES = 800 * 1024; // Only compress files over 800KB
const MAX_WIDTH = 2000;
const QUALITY = 78;
const SUPPORTED = ['.jpg', '.jpeg', '.png', '.webp'];

let compressed = 0;
let skipped = 0;

async function processDir(dir) {
  let files;
  try {
    files = readdirSync(dir);
  } catch {
    console.log(`No images dir found at ${dir}, skipping.`);
    return;
  }

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      await processDir(filePath);
      continue;
    }

    const ext = extname(file).toLowerCase();
    if (!SUPPORTED.includes(ext)) continue;

    // Skip if already small enough
    if (stat.size <= MAX_SIZE_BYTES) {
      skipped++;
      continue;
    }

    const sizeBefore = Math.round(stat.size / 1024);

    try {
      const buffer = await sharp(filePath)
        .resize(MAX_WIDTH, MAX_WIDTH, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: QUALITY, progressive: true })
        .toBuffer();

      // Only write if we actually made it smaller
      if (buffer.length < stat.size) {
        const { writeFileSync } = await import('fs');
        writeFileSync(filePath, buffer);
        const sizeAfter = Math.round(buffer.length / 1024);
        console.log(`✅ ${file}: ${sizeBefore}KB → ${sizeAfter}KB`);
        compressed++;
      } else {
        skipped++;
      }
    } catch (err) {
      console.warn(`⚠️  Skipped ${file}: ${err.message}`);
      skipped++;
    }
  }
}

await processDir(IMAGES_DIR);
console.log(`\nDone: ${compressed} compressed, ${skipped} skipped.`);
