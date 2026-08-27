// Génère des variantes WebP (2 tailles) pour toutes les photos de la galerie.
// Idempotent : ne régénère pas si la sortie existe déjà et est plus récente que
// la source. Sortie côte à côte avec l'original.
//
// Sources :
//  - public/img/gallery/gallery-*.jpg (21 nouvelles)
//  - public/img/g1..g10.jpg, infos.jpg (photos existantes, si présentes)
//
// Sorties (par source X.jpg) : X-800.webp et X-1400.webp

import { readdirSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, basename } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const IMG_DIR = join(ROOT, 'public/img');
const GAL_DIR = join(IMG_DIR, 'gallery');

const WIDTHS = [800, 1400];
const QUALITY = 78;

const sources = [];

// 21 nouvelles photos
if (existsSync(GAL_DIR)) {
  for (const f of readdirSync(GAL_DIR)) {
    if (/^gallery-\d+\.jpe?g$/i.test(f)) {
      sources.push({ path: join(GAL_DIR, f), outDir: GAL_DIR, name: basename(f, extname(f)) });
    }
  }
}

// Photos existantes toujours présentes
for (const f of readdirSync(IMG_DIR)) {
  if (/^(g\d+|infos)\.jpe?g$/i.test(f)) {
    sources.push({ path: join(IMG_DIR, f), outDir: IMG_DIR, name: basename(f, extname(f)) });
  }
}

mkdirSync(GAL_DIR, { recursive: true });

let generated = 0;
let skipped = 0;

for (const src of sources) {
  const srcMtime = statSync(src.path).mtimeMs;
  for (const w of WIDTHS) {
    const outFile = join(src.outDir, `${src.name}-${w}.webp`);
    if (existsSync(outFile) && statSync(outFile).mtimeMs >= srcMtime) {
      skipped++;
      continue;
    }
    await sharp(src.path)
      .rotate() // respect EXIF orientation
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outFile);
    generated++;
  }
}

console.log(`[build-gallery] ${sources.length} sources, ${generated} variantes générées, ${skipped} déjà à jour`);
