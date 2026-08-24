import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const raids = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/raids' }),
  schema: z.object({
    n: z.number().int().min(1).max(99),
    name: z.string(),
    itin: z.string(),
    days: z.number().int().min(1),
    level: z.enum(['Découverte', 'Intermédiaire', 'Confirmé']),
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
  }),
});

const globals = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/globals' }),
  schema: z.object({
    title: z.string(),
    items: z.array(z.string()).optional(),
    specs: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  }),
});

export const collections = { raids, globals };
