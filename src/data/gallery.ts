// Source unique de la galerie : nouvelles photos (gallery_new) + photos existantes.
// Utilisée par la home (Gallery.astro, 9 premières) et par /galerie (toutes).

export interface Tile {
  base: string;       // ex. '/img/gallery/gallery-01' (sans extension)
  src: string;        // fallback JPG complet
  alt: string;
}

const newTiles: Tile[] = Array.from({ length: 21 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    base: `/img/gallery/gallery-${n}`,
    src: `/img/gallery/gallery-${n}.jpg`,
    alt: `Raid CDM Motorsport, photo ${i + 1}`,
  };
});

const legacyTiles: Tile[] = [
  { base: '/img/g4',    src: '/img/g4.jpg',    alt: 'Sur la piste, plateau' },
  { base: '/img/g1',    src: '/img/g1.jpg',    alt: 'Groupe en bivouac' },
  { base: '/img/g3',    src: '/img/g3.jpg',    alt: 'Traversée de dune' },
  { base: '/img/g2',    src: '/img/g2.jpg',    alt: 'Piste rocailleuse' },
  { base: '/img/g9',    src: '/img/g9.jpg',    alt: 'Côte atlantique' },
  { base: '/img/g5',    src: '/img/g5.jpg',    alt: 'Passage technique' },
  { base: '/img/g10',   src: '/img/g10.jpg',   alt: 'Coucher de soleil' },
  { base: '/img/infos', src: '/img/infos.jpg', alt: 'Assistance logistique' },
  { base: '/img/g6',    src: '/img/g6.jpg',    alt: 'Bivouac étoilé' },
];

export const galleryTiles: Tile[] = [...newTiles, ...legacyTiles];
