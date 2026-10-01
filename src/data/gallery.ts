// Source unique de la galerie : nouvelles photos (gallery_new) + photos existantes.
// Utilisée par la home (Gallery.astro, 9 premières) et par /galerie (toutes).

import type { Lang } from '../i18n';
import { strings } from '../i18n/strings';

export interface Tile {
  base: string;       // ex. '/img/gallery/gallery-01' (sans extension)
  src: string;        // fallback JPG complet
  alt: string;
}

const legacyBases = [
  '/img/g4', '/img/g1', '/img/g3', '/img/g2', '/img/g9',
  '/img/g5', '/img/g10', '/img/infos', '/img/g6',
];

export function getGalleryTiles(lang: Lang): Tile[] {
  const T = strings[lang].gallery;
  const newTiles: Tile[] = Array.from({ length: 21 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return {
      base: `/img/gallery/gallery-${n}`,
      src: `/img/gallery/gallery-${n}.jpg`,
      alt: `${T.pageAltBase} ${i + 1}`,
    };
  });
  const legacyTiles: Tile[] = legacyBases.map((base, i) => ({
    base,
    src: base + (base === '/img/infos' ? '.jpg' : '.jpg'),
    alt: T.legacyAlts[i] ?? 'CDM Motorsport',
  }));
  return [...newTiles, ...legacyTiles];
}

// Export FR par défaut (back-compat).
export const galleryTiles: Tile[] = getGalleryTiles('fr');
