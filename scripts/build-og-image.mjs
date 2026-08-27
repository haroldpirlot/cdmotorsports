// Génère public/img/og-cover.png (1200×630) : logo blanc centré sur fond sombre.
// Utilisé comme og:image par défaut au niveau du site.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const LOGO_SRC = join(ROOT, 'public/img/logo-cdm.svg');
const OG_OUT = join(ROOT, 'public/img/og-cover.png');

const W = 1200;
const H = 630;
const BG = '#141008';
const FG = '#f2eadb';

// Charge le SVG et remplace currentColor par la couleur claire.
const rawSvg = readFileSync(LOGO_SRC, 'utf-8');
const coloredSvg = rawSvg.replace(/currentColor/g, FG);

// Le viewBox du SVG source est "733.8 447.9 445.2 197.3" (ratio ~2.257).
// On veut occuper ~50% de la largeur de l'aperçu, centré verticalement.
const logoWidth = 720;
const logoHeight = Math.round(logoWidth * (197.3 / 445.2));

// Composer : fond sombre + logo centré.
const bg = sharp({
  create: {
    width: W,
    height: H,
    channels: 4,
    background: BG,
  },
});

const logoBuf = await sharp(Buffer.from(coloredSvg))
  .resize(logoWidth, logoHeight, { fit: 'contain' })
  .png()
  .toBuffer();

const out = await bg
  .composite([
    {
      input: logoBuf,
      top: Math.round((H - logoHeight) / 2),
      left: Math.round((W - logoWidth) / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toBuffer();

writeFileSync(OG_OUT, out);
console.log(`[build-og-image] écrit ${OG_OUT} (${out.length} octets)`);
