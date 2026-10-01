import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

// Schéma raid partagé entre FR et EN. `level` et `lodging` sont des strings
// libres (traduites selon la collection).
const raidSchema = z.object({
  n: z.number().int().min(1).max(99),
  name: z.string(),
  itin: z.string(),
  days: z.number().int().min(1),
  level: z.string(),
  pricePerPerson: z.number().int().min(0).optional(),
  status: z.enum(['live', 'coming-soon']).default('live'),
  hero: z.string(),
  map: z.string(),
  gallery: z.array(z.string()).min(1),
  stages: z.array(
    z.object({
      from: z.string(),
      to: z.string(),
      km: z.number().int().min(1),
      lodging: z.string().default('hôtel / bivouac'),
    })
  ).min(1),
  highlights: z.array(z.string()).min(1),
});

const raids = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/raids' }),
  schema: raidSchema,
});

const raidsEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/raids-en' }),
  schema: raidSchema,
});

const globalSchema = z.object({
  title: z.string(),
  items: z.array(z.string()).optional(),
  specs: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
});

const globals = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/globals' }),
  schema: globalSchema,
});

const globalsEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/globals-en' }),
  schema: globalSchema,
});

export const collections = { raids, raidsEn, globals, globalsEn };
