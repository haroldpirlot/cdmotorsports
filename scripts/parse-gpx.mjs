// Parse les 7 GPX bruts (source privée) et génère un JSON structuré par raid
// dans src/data/gpx/{slug}.json. Lancé au prebuild + predev via npm scripts.
//
// ⚠ CONFIDENTIALITÉ : les GPX bruts sont propriété du client et NE DOIVENT
// PAS être exposés publiquement. Ils vivent dans _gpx_private/ (git-ignoré),
// jamais dans public/. Ce script ne génère que des JSON dérivés (destinés à
// l'affichage carte), qui sont commit et servis avec le site.
//
// Règles :
//  - Coupe la trace quand deux points consécutifs sont à + GAP_KM_MAX km
//  - Raid 6 : dédup des tracks par nom (case-insensitive, trimmed)
//  - Raid 7 : marqué provisoire (tracé incomplet)
//  - Distances annoncées prioritaires sur la somme calculée

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { XMLParser } from 'fast-xml-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const GPX_DIR = join(ROOT, '_gpx_private');
const OUT_DIR = join(ROOT, 'src/data/gpx');

const GAP_KM_MAX = 2;

// Métadonnées client par slug — source de vérité pour l'affichage
const RAIDS = {
  'odyssee-du-sud':        { announcedKm: 1486, provisional: false, dedupTracks: false },
  'boucle-anti-atlas':     { announcedKm: 930,  provisional: false, dedupTracks: false },
  'cap-merzouga':          { announcedKm: 1130, provisional: false, dedupTracks: false },
  'ocean-atlas':           { announcedKm: 1280, provisional: false, dedupTracks: false },
  'escapade-draa':         { announcedKm: 800,  provisional: false, dedupTracks: false },
  'echappee-atlantique':   { announcedKm: 665,  provisional: false, dedupTracks: true  },
  'immersion-erg':         { announcedKm: 460,  provisional: true,  dedupTracks: false },
};

// Haversine en km
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

function asArray(x) {
  if (x == null) return [];
  return Array.isArray(x) ? x : [x];
}

// Split un tableau de points [lon, lat, ele] aux gaps > GAP_KM_MAX
function splitByGaps(points) {
  const segments = [];
  let current = [];
  for (let i = 0; i < points.length; i++) {
    if (current.length === 0) {
      current.push(points[i]);
      continue;
    }
    const [lonA, latA] = current[current.length - 1];
    const [lonB, latB] = points[i];
    if (haversineKm(latA, lonA, latB, lonB) > GAP_KM_MAX) {
      if (current.length >= 2) segments.push(current);
      current = [points[i]];
    } else {
      current.push(points[i]);
    }
  }
  if (current.length >= 2) segments.push(current);
  return segments;
}

// Distance cumulée d'un tableau de points
function totalDistanceKm(points) {
  let d = 0;
  for (let i = 1; i < points.length; i++) {
    const [lonA, latA] = points[i - 1];
    const [lonB, latB] = points[i];
    d += haversineKm(latA, lonA, latB, lonB);
  }
  return d;
}

// Simplification Douglas-Peucker light : garde 1 point sur N pour alléger le JSON
function decimate(points, keepEvery) {
  if (points.length <= 100 || keepEvery <= 1) return points;
  const out = [];
  for (let i = 0; i < points.length; i += keepEvery) out.push(points[i]);
  // Garder toujours le dernier point pour ne pas tronquer la trace
  if (out[out.length - 1] !== points[points.length - 1]) out.push(points[points.length - 1]);
  return out;
}

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
  const meta = gpx.metadata || {};

  const metaName = typeof meta.name === 'string' ? meta.name : meta.name?.['#text'] ?? '';
  const metaDesc = typeof meta.desc === 'string' ? meta.desc : meta.desc?.['#text'] ?? '';

  const trks = asArray(gpx.trk);
  const wpts = asArray(gpx.wpt);

  const tracks = trks.map((trk) => {
    const name = typeof trk.name === 'string' ? trk.name : trk.name?.['#text'] ?? '';
    const segs = asArray(trk.trkseg);
    const points = [];
    for (const seg of segs) {
      const trkpts = asArray(seg.trkpt);
      for (const pt of trkpts) {
        const lat = Number(pt.lat);
        const lon = Number(pt.lon);
        const ele = pt.ele != null ? Number(pt.ele) : null;
        if (Number.isFinite(lat) && Number.isFinite(lon)) points.push([lon, lat, ele]);
      }
    }
    return { name: String(name).trim(), points };
  });

  const waypoints = wpts.map((w) => ({
    name: typeof w.name === 'string' ? w.name : w.name?.['#text'] ?? '',
    type: typeof w.type === 'string' ? w.type : w.type?.['#text'] ?? '',
    lat: Number(w.lat),
    lon: Number(w.lon),
    ele: w.ele != null ? Number(w.ele) : null,
  }));

  return { metaName, metaDesc, tracks, waypoints };
}

// Extrait "ETAPE X / DESTINATION (KM)" ou variantes
function parseStageMeta(trackName) {
  const clean = trackName.replace(/\s+/g, ' ').trim();
  // ex. "ETAPE 3 / ICHT (288KM)" ou "ETAPE 4 / TISSINT ( 289 KM )"
  const m1 = clean.match(/ETAPE\s*(\d+)\s*\/\s*([^(]+?)\s*\(\s*(\d+)\s*KM\s*\)/i);
  if (m1) return { day: Number(m1[1]), destination: m1[2].trim(), km: Number(m1[3]) };
  // ex. "3.1-KASBAH OUZINA-MERZOUGA"
  return null;
}

function parseGpxToOutput(slug, filePath) {
  const meta = RAIDS[slug];
  const { metaName, metaDesc, tracks: rawTracks, waypoints } = parseGpxFile(filePath);

  // Dédup optionnelle (raid 6 : beaucoup de doublons par nom)
  let tracks = rawTracks;
  if (meta.dedupTracks) {
    const seen = new Set();
    tracks = rawTracks.filter((t) => {
      const key = t.name.toLowerCase().replace(/\s+/g, ' ').trim();
      if (!key) return true;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // Traiter chaque track : split aux gaps, calcul km, décimation légère, stage info
  const processedTracks = [];
  const stageWaypoints = [];
  let minLat = 90, maxLat = -90, minLon = 180, maxLon = -180;
  let totalMeasuredKm = 0;
  const elevationSeries = [];
  let cumKm = 0;

  for (const trk of tracks) {
    if (trk.points.length < 2) continue;
    const segments = splitByGaps(trk.points);
    if (segments.length === 0) continue;

    // km de ce track = somme des segments valides
    let trackKm = 0;
    const outSegments = [];
    for (const seg of segments) {
      const segKm = totalDistanceKm(seg);
      trackKm += segKm;
      // Décimer : cible ~500 points max par segment pour la polyline
      const keepEvery = Math.max(1, Math.floor(seg.length / 500));
      const coords = decimate(seg, keepEvery).map(([lon, lat]) => [
        Number(lon.toFixed(5)),
        Number(lat.toFixed(5)),
      ]);
      outSegments.push(coords);

      // Bounds
      for (const [lon, lat] of seg) {
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
        if (lon < minLon) minLon = lon;
        if (lon > maxLon) maxLon = lon;
      }

      // Elevation series (décimée à ~200 points par segment)
      const eKeep = Math.max(1, Math.floor(seg.length / 200));
      let localKm = 0;
      for (let i = 0; i < seg.length; i++) {
        if (i > 0) {
          const [lonA, latA] = seg[i - 1];
          const [lonB, latB] = seg[i];
          localKm += haversineKm(latA, lonA, latB, lonB);
        }
        if (i % eKeep === 0 && seg[i][2] != null && Number.isFinite(seg[i][2])) {
          elevationSeries.push([Number((cumKm + localKm).toFixed(2)), Math.round(seg[i][2])]);
        }
      }
      cumKm += segKm;
    }

    const stage = parseStageMeta(trk.name);
    processedTracks.push({
      name: trk.name,
      stageDay: stage?.day ?? null,
      stageDestination: stage?.destination ?? null,
      stageKm: stage?.km ?? Math.round(trackKm),
      km: Math.round(trackKm),
      segments: outSegments,
    });

    // Waypoint = premier point du track (départ de l'étape)
    const first = segments[0][0];
    const last = segments[segments.length - 1][segments[segments.length - 1].length - 1];
    stageWaypoints.push({
      day: stage?.day ?? processedTracks.length,
      name: stage?.destination ?? trk.name,
      km: stage?.km ?? Math.round(trackKm),
      start: [Number(first[0].toFixed(5)), Number(first[1].toFixed(5))],
      end: [Number(last[0].toFixed(5)), Number(last[1].toFixed(5))],
    });

    totalMeasuredKm += trackKm;
  }

  // Si aucun bounds valide (pas de track), fallback
  if (minLat === 90) { minLat = 30; maxLat = 32; minLon = -10; maxLon = -5; }

  return {
    slug,
    // metaName/metaDesc omis : peuvent contenir des indications privées
    announcedKm: meta.announcedKm,
    measuredKm: Math.round(totalMeasuredKm),
    provisional: meta.provisional,
    bounds: [
      [Number(minLat.toFixed(5)), Number(minLon.toFixed(5))],
      [Number(maxLat.toFixed(5)), Number(maxLon.toFixed(5))],
    ],
    tracks: processedTracks,
    stages: stageWaypoints,
    elevation: elevationSeries,
  };
}

// ---- Main ----
mkdirSync(OUT_DIR, { recursive: true });

if (!existsSync(GPX_DIR)) {
  console.warn(
    `[parse-gpx] Dossier privé introuvable : ${GPX_DIR}\n` +
      `           JSON de sortie non regénérés (probablement CI sans accès aux sources).\n` +
      `           Les JSON déjà commit dans src/data/gpx/ sont utilisés tels quels.`
  );
  process.exit(0);
}

const gpxFiles = readdirSync(GPX_DIR).filter((f) => f.endsWith('.gpx'));
const summary = [];
for (const file of gpxFiles) {
  const slug = file.replace(/\.gpx$/, '');
  if (!RAIDS[slug]) {
    console.warn(`[parse-gpx] skip ${file} — pas dans la table RAIDS`);
    continue;
  }
  try {
    const out = parseGpxToOutput(slug, join(GPX_DIR, file));
    writeFileSync(join(OUT_DIR, `${slug}.json`), JSON.stringify(out, null, 0));
    const totalPoints = out.tracks.reduce((s, t) => s + t.segments.reduce((ss, seg) => ss + seg.length, 0), 0);
    summary.push({
      slug,
      tracks: out.tracks.length,
      stages: out.stages.length,
      points: totalPoints,
      measuredKm: out.measuredKm,
      announcedKm: out.announcedKm,
      elev: out.elevation.length,
      provisional: out.provisional,
    });
  } catch (err) {
    console.error(`[parse-gpx] ERROR on ${file}:`, err.message);
    process.exit(1);
  }
}

console.log(`[parse-gpx] ${summary.length} raids parsés →`);
console.table(summary);
