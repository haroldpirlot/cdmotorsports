// Construit les JSON de carte pour chaque raid.
//
// Source de vérité :
//  - src/content/raids/*.md → stages (from → to → km) validés client
//  - CITIES ci-dessous       → coordonnées lat/lon des villes-étapes
//  - _gpx_private/*.gpx      → tracé réel (raids 1-3 uniquement), git-ignoré
//
// Stratégie :
//  - Marqueurs (départ, étapes 1..N, arrivée) : toujours calés sur CITIES.
//  - Tracé :
//     • raids "exact"  (odyssee, boucle-anti-atlas, cap-merzouga) → GPX réel
//       stitché dans l'ordre des étapes.
//     • raids "approx" (ocean-atlas, escapade-draa, echappee-atl., immersion-erg)
//       → polyline lissée entre villes (bezier + Chaikin).
//
// Sortie : src/data/gpx/{slug}.json (commit dans le repo — Vercel n'a pas
// accès aux GPX bruts).

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { XMLParser } from 'fast-xml-parser';
import { parse as parseYaml } from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'src/content/raids');
const GPX_DIR = join(ROOT, '_gpx_private');
const OUT_DIR = join(ROOT, 'src/data/gpx');

// -- Coordonnées des villes-étapes (lon, lat) ----------------------------
// Vérifiées manuellement contre OSM / Google Maps.
const CITIES = {
  'Agadir':          [-9.5981, 30.4278],
  'Sidi Ifni':       [-10.1720, 29.3810],
  'Ksar Tafnidilt':  [-11.1273, 28.5007], // proche Tan-Tan
  'Icht':            [-8.8556, 29.0641],
  'Tissint':         [-7.3132, 29.9027],
  "M'hamid":         [-5.7213, 29.8286],
  'Zagora':          [-5.8306, 30.3325],
  'Boumalne Dadès':  [-5.9885, 31.3618],
  'Ouarzazate':      [-6.9091, 30.9189],
  'Foum Zguid':      [-6.8651, 30.0700],
  'Tagounite':       [-5.5885, 29.9789],
  'Alnif':           [-5.1746, 31.1093],
  'Merzouga':        [-4.0134, 31.0996],
  'Ouzina':          [-4.1958, 30.7503],
  'Khemliya':        [-3.9989, 31.0455],
  'Guelmim':         [-10.0574, 28.9840],
  'Mirleft':         [-10.0328, 29.5809],
  'Essaouira':       [-9.7595, 31.5085],
  'Marrakech':       [-7.9811, 31.6295],
  'Errachidia':      [-4.4243, 31.9314],
};

// -- Métadonnées par raid --------------------------------------------------
// mode "exact" = polyline dérivée du GPX réel
// mode "approx" = polyline lissée entre villes-étapes
const RAIDS = {
  'odyssee-du-sud':      { announcedKm: 1486, mode: 'exact'  },
  'boucle-anti-atlas':   { announcedKm: 930,  mode: 'exact'  },
  'cap-merzouga':        { announcedKm: 1130, mode: 'exact'  },
  'ocean-atlas':         { announcedKm: 1280, mode: 'approx' },
  'escapade-draa':       { announcedKm: 800,  mode: 'approx' },
  'echappee-atlantique': { announcedKm: 665,  mode: 'approx' },
  'immersion-erg':       { announcedKm: 460,  mode: 'approx' },
};

// ------------- utilitaires géo -------------------------------------------
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
const distKm = (p1, p2) => haversineKm(p1[1], p1[0], p2[1], p2[0]);
const asArray = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);

// ------------- polyline lissée entre villes ------------------------------
// Bezier quadratique avec point de contrôle décalé perpendiculairement
// au segment (bulge léger, alterné à chaque étape pour éviter l'aspect droit).
function bezierLeg(a, b, bulgeSign = 1) {
  const steps = 24;
  const [ax, ay] = a;
  const [bx, by] = b;
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  // Perpendiculaire, décalage = 8% de la longueur du segment
  const nx = -dy / len;
  const ny = dx / len;
  const bulge = len * 0.08 * bulgeSign;
  const cx = mx + nx * bulge;
  const cy = my + ny * bulge;
  const out = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const omt = 1 - t;
    const x = omt * omt * ax + 2 * omt * t * cx + t * t * bx;
    const y = omt * omt * ay + 2 * omt * t * cy + t * t * by;
    out.push([x, y]);
  }
  return out;
}

// Chaikin smoothing (arrondit les angles aux villes-étapes)
function chaikin(points, iters = 2) {
  let pts = points;
  for (let k = 0; k < iters; k++) {
    if (pts.length < 3) break;
    const next = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      next.push([0.75 * p0[0] + 0.25 * p1[0], 0.75 * p0[1] + 0.25 * p1[1]]);
      next.push([0.25 * p0[0] + 0.75 * p1[0], 0.25 * p0[1] + 0.75 * p1[1]]);
    }
    next.push(pts[pts.length - 1]);
    pts = next;
  }
  return pts;
}

function buildSmoothedTrace(stages) {
  const legs = [];
  for (let i = 0; i < stages.length; i++) {
    const from = CITIES[stages[i].from];
    const to = CITIES[stages[i].to];
    if (!from || !to) {
      throw new Error(`Ville manquante dans CITIES: ${stages[i].from} ou ${stages[i].to}`);
    }
    // Sens du bulge alterné + petit "shake" en fonction de l'index
    // pour éviter des courbes trop répétitives.
    const sign = i % 2 === 0 ? 1 : -1;
    legs.push(bezierLeg(from, to, sign));
  }
  // Concatener toutes les jambes (le dernier point d'une jambe = premier de la suivante)
  const merged = [];
  for (let i = 0; i < legs.length; i++) {
    const leg = legs[i];
    merged.push(...(i === 0 ? leg : leg.slice(1)));
  }
  return chaikin(merged, 2);
}

// ------------- parsing GPX ------------------------------------------------
function parseGpxFile(filePath) {
  const xml = readFileSync(filePath, 'utf-8');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    parseAttributeValue: true,
    trimValues: true,
  });
  const doc = parser.parse(xml);
  const gpx = doc.gpx || {};
  const trks = asArray(gpx.trk);
  const tracks = trks.map((trk) => {
    const name = typeof trk.name === 'string' ? trk.name : trk.name?.['#text'] ?? '';
    const segs = asArray(trk.trkseg);
    const points = [];
    for (const seg of segs) {
      for (const pt of asArray(seg.trkpt)) {
        const lat = Number(pt.lat);
        const lon = Number(pt.lon);
        const ele = pt.ele != null ? Number(pt.ele) : null;
        if (Number.isFinite(lat) && Number.isFinite(lon)) points.push([lon, lat, ele]);
      }
    }
    return { name: String(name).trim(), points };
  });
  return tracks;
}

// Extrait (major, minor) d'un nom de track pour trier :
//  - "ETAPE 3 / ICHT (288KM)"      → (3, 0)
//  - "3.1-KASBAH OUZINA-MERZOUGA"  → (3, 1)
//  - "6-DADES-OUARZAZATE"          → (6, 0)
function stageSortKey(name) {
  const m = String(name).match(/(\d+)(?:\.(\d+))?/);
  if (!m) return [999, 999];
  return [Number(m[1]), Number(m[2] ?? 0)];
}

// Découpe un point-list aux gaps > GAP_KM_MAX (retire les téléportations)
function splitGaps(points, gapKm = 5) {
  const segs = [];
  let cur = [];
  for (const p of points) {
    if (cur.length === 0) {
      cur.push(p);
      continue;
    }
    const prev = cur[cur.length - 1];
    if (haversineKm(prev[1], prev[0], p[1], p[0]) > gapKm) {
      if (cur.length >= 2) segs.push(cur);
      cur = [p];
    } else {
      cur.push(p);
    }
  }
  if (cur.length >= 2) segs.push(cur);
  return segs;
}

// Décime un tableau pour cible ~500 points max
function decimate(points, targetMax = 500) {
  if (points.length <= targetMax) return points;
  const keep = Math.ceil(points.length / targetMax);
  const out = [];
  for (let i = 0; i < points.length; i += keep) out.push(points[i]);
  if (out[out.length - 1] !== points[points.length - 1]) out.push(points[points.length - 1]);
  return out;
}

// Construit un tracé réel continu à partir des tracks GPX :
//  1. Tri par étape (major, minor)
//  2. Sépare chaque track en sous-segments (retire téléportations internes)
//  3. Oriente chaque bout pour chaîner : bout suivant démarre près du bout précédent
//  4. Concatène tout dans une seule polyline (comblant les petits trous par ligne droite)
function buildExactTrace(gpxTracks, firstFromCity) {
  const sorted = [...gpxTracks].sort((a, b) => {
    const ka = stageSortKey(a.name);
    const kb = stageSortKey(b.name);
    return ka[0] - kb[0] || ka[1] - kb[1];
  });

  // Chaque track → liste de sous-segments
  const chunks = [];
  for (const trk of sorted) {
    if (trk.points.length < 5) continue; // ignore les tracks quasi-vides
    const segs = splitGaps(trk.points, 5);
    for (const seg of segs) {
      if (seg.length >= 5) chunks.push(seg);
    }
  }
  if (chunks.length === 0) return { line: [], elevation: [] };

  // Oriente le premier chunk : son start doit être le plus proche de firstFromCity
  const orient = (seg, anchor) => {
    const dStart = distKm(seg[0], anchor);
    const dEnd = distKm(seg[seg.length - 1], anchor);
    return dEnd < dStart ? seg.slice().reverse() : seg;
  };

  let line = orient(chunks[0], firstFromCity);
  for (let i = 1; i < chunks.length; i++) {
    const prevEnd = line[line.length - 1];
    line = line.concat(orient(chunks[i], prevEnd));
  }

  // Elevation series : [cumulKm, altitude] tous les ~200m de trace, décimé
  const elevation = [];
  let cum = 0;
  const eKeep = Math.max(1, Math.floor(line.length / 250));
  for (let i = 0; i < line.length; i++) {
    if (i > 0) {
      cum += haversineKm(line[i - 1][1], line[i - 1][0], line[i][1], line[i][0]);
    }
    if (i % eKeep === 0 && line[i][2] != null && Number.isFinite(line[i][2])) {
      elevation.push([Number(cum.toFixed(2)), Math.round(line[i][2])]);
    }
  }

  // On retire la 3e composante (elevation) du tracé rendu (pas utile côté carte)
  const line2d = line.map(([lon, lat]) => [lon, lat]);
  return { line: line2d, elevation };
}

// ------------- lecture des content stages --------------------------------
function loadContentStages(slug) {
  const path = join(CONTENT_DIR, `${slug}.md`);
  const raw = readFileSync(path, 'utf-8');
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) throw new Error(`Frontmatter introuvable: ${path}`);
  const data = parseYaml(m[1]);
  return data.stages;
}

// ------------- construction du JSON par raid -----------------------------
function buildRaidJson(slug) {
  const meta = RAIDS[slug];
  if (!meta) throw new Error(`Raid inconnu: ${slug}`);
  const stages = loadContentStages(slug);

  // Vérifie que toutes les villes sont dans CITIES
  for (const s of stages) {
    if (!CITIES[s.from]) throw new Error(`[${slug}] ville manquante: ${s.from}`);
    if (!CITIES[s.to]) throw new Error(`[${slug}] ville manquante: ${s.to}`);
  }

  // Tracé
  let polyline;
  let elevation = [];
  if (meta.mode === 'exact' && existsSync(join(GPX_DIR, `${slug}.gpx`))) {
    const tracks = parseGpxFile(join(GPX_DIR, `${slug}.gpx`));
    const firstFrom = CITIES[stages[0].from];
    const built = buildExactTrace(tracks, firstFrom);
    if (built.line.length < 10) {
      // fallback si GPX inutilisable
      polyline = buildSmoothedTrace(stages);
    } else {
      polyline = built.line;
      elevation = built.elevation;
    }
  } else {
    polyline = buildSmoothedTrace(stages);
  }

  // Décime et arrondit
  polyline = decimate(polyline, 900).map(([lon, lat]) => [
    Number(lon.toFixed(5)),
    Number(lat.toFixed(5)),
  ]);

  // Bounds
  let minLat = 90, maxLat = -90, minLon = 180, maxLon = -180;
  for (const [lon, lat] of polyline) {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
  }
  // Elargit légèrement pour laisser respirer
  const padLat = (maxLat - minLat) * 0.05;
  const padLon = (maxLon - minLon) * 0.05;
  minLat -= padLat; maxLat += padLat;
  minLon -= padLon; maxLon += padLon;

  // km mesurés (approximatif si mode approx)
  let measuredKm = 0;
  for (let i = 1; i < polyline.length; i++) {
    measuredKm += haversineKm(polyline[i - 1][1], polyline[i - 1][0], polyline[i][1], polyline[i][0]);
  }

  // Étapes : marqueur numéroté à CITIES[from], étoile à CITIES[to] du dernier
  const stageOut = stages.map((s, i) => ({
    day: i + 1,
    name: s.to,
    from: s.from,
    km: s.km,
    start: CITIES[s.from].map((n) => Number(n.toFixed(5))),
    end: CITIES[s.to].map((n) => Number(n.toFixed(5))),
  }));

  return {
    slug,
    announcedKm: meta.announcedKm,
    measuredKm: Math.round(measuredKm),
    approximate: meta.mode === 'approx',
    bounds: [
      [Number(minLat.toFixed(5)), Number(minLon.toFixed(5))],
      [Number(maxLat.toFixed(5)), Number(maxLon.toFixed(5))],
    ],
    tracks: [
      {
        name: 'trace',
        stageDay: null,
        stageDestination: null,
        stageKm: 0,
        km: Math.round(measuredKm),
        segments: [polyline],
      },
    ],
    stages: stageOut,
    elevation,
  };
}

// ------------- main ------------------------------------------------------
mkdirSync(OUT_DIR, { recursive: true });

const slugs = Object.keys(RAIDS);
const summary = [];
for (const slug of slugs) {
  try {
    const out = buildRaidJson(slug);
    writeFileSync(join(OUT_DIR, `${slug}.json`), JSON.stringify(out, null, 0));
    summary.push({
      slug,
      mode: RAIDS[slug].mode,
      stages: out.stages.length,
      points: out.tracks[0].segments[0].length,
      measuredKm: out.measuredKm,
      announcedKm: out.announcedKm,
      elev: out.elevation.length,
    });
  } catch (err) {
    console.error(`[build-raid-maps] ERROR sur ${slug}:`, err.message);
    process.exit(1);
  }
}
console.log(`[build-raid-maps] ${summary.length} raids générés →`);
console.table(summary);
