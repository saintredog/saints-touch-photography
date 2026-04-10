#!/usr/bin/env node
/**
 * Saint's Touch Photography — Photo Admin CLI
 * 
 * Usage:
 *   node scripts/add-photos.mjs <category> <photo1.jpg> [photo2.jpg ...]
 * 
 * Categories: portraits, events, fashion, couples, hospitality
 * 
 * Example:
 *   node scripts/add-photos.mjs portraits ~/Desktop/shoot1.jpg ~/Desktop/shoot2.jpg
 * 
 * What it does:
 *   1. Compresses each photo (max 2000px, ~600KB target)
 *   2. Copies it to public/images/
 *   3. Adds it to portfolio.ts under the right category
 *   4. Prints the next deploy command
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync, copyFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORTFOLIO_FILE = path.join(ROOT, 'src/data/portfolio.ts');
const IMAGES_DIR = path.join(ROOT, 'public/images');

const VALID_CATEGORIES = ['portraits', 'events', 'fashion', 'couples', 'hospitality'];
const CATEGORY_PREFIX = { portraits: 'p', events: 'e', fashion: 'f', couples: 'c', hospitality: 'h' };

const [,, category, ...files] = process.argv;

if (!category || !VALID_CATEGORIES.includes(category)) {
  console.error(`\n❌ Invalid or missing category.\n\nUsage: node scripts/add-photos.mjs <category> <photo.jpg> ...\nCategories: ${VALID_CATEGORIES.join(', ')}\n`);
  process.exit(1);
}

if (files.length === 0) {
  console.error('\n❌ No photos provided.\n');
  process.exit(1);
}

let portfolioSource = readFileSync(PORTFOLIO_FILE, 'utf8');

// Find highest existing ID for this category
const prefix = CATEGORY_PREFIX[category];
const idMatches = [...portfolioSource.matchAll(new RegExp(`id: '${prefix}-(\\d+)'`, 'g'))];
let nextId = idMatches.length > 0 ? Math.max(...idMatches.map(m => parseInt(m[1]))) + 1 : 1;

const newEntries = [];

for (const rawFile of files) {
  const filePath = rawFile.replace(/^~/, process.env.HOME);

  if (!existsSync(filePath)) {
    console.warn(`⚠️  Skipping (not found): ${filePath}`);
    continue;
  }

  const filename = path.basename(filePath);
  const dest = path.join(IMAGES_DIR, filename);

  // Compress with sips (built-in macOS, no dependencies)
  console.log(`📸 Compressing ${filename}...`);
  try {
    execSync(`sips -s format jpeg -s formatOptions 75 -Z 2000 "${filePath}" --out "${dest}"`, { stdio: 'pipe' });
    const origSize = Math.round(execSync(`stat -f%z "${filePath}"`).toString().trim() / 1024);
    const newSize = Math.round(execSync(`stat -f%z "${dest}"`).toString().trim() / 1024);
    console.log(`   ✅ ${origSize}KB → ${newSize}KB → public/images/${filename}`);
  } catch (e) {
    console.error(`   ❌ Compression failed, copying as-is`);
    copyFileSync(filePath, dest);
  }

  // Build the portfolio entry
  const id = `${prefix}-${nextId++}`;
  const entry = `  { id: '${id}', src: '/images/${filename}', alt: '${category.charAt(0).toUpperCase() + category.slice(1)}', category: '${category}', featured: false },`;
  newEntries.push({ filename, entry, id });
}

if (newEntries.length === 0) {
  console.error('\n❌ No valid photos were processed.\n');
  process.exit(1);
}

// Find the last entry for this category and insert after it
const categoryComment = `// ${category.charAt(0).toUpperCase() + category.slice(1)}`;
// Find the last matching entry for this category
const lastEntryRegex = new RegExp(`(\\{ id: '${prefix}-\\d+'.+?category: '${category}'.+?\\},?)`, 'g');
const allMatches = [...portfolioSource.matchAll(lastEntryRegex)];

if (allMatches.length === 0) {
  console.error(`\n❌ Could not find existing ${category} entries in portfolio.ts\n`);
  process.exit(1);
}

const lastMatch = allMatches[allMatches.length - 1];
const insertAfter = lastMatch[0];
const insertionBlock = newEntries.map(e => e.entry).join('\n');

portfolioSource = portfolioSource.replace(
  insertAfter,
  insertAfter + '\n' + insertionBlock
);

writeFileSync(PORTFOLIO_FILE, portfolioSource, 'utf8');

console.log(`\n✅ Added ${newEntries.length} photo(s) to ${category}:`);
newEntries.forEach(e => console.log(`   → ${e.id}: /images/${e.filename}`));

console.log(`\n📦 Next steps:`);
console.log(`   1. Preview:  cd ${ROOT} && npm run dev`);
console.log(`   2. Build:    npm run build`);
console.log(`   3. Deploy:   npx wrangler pages deploy dist --project-name saintstouch-photography`);
console.log(`\n`);
