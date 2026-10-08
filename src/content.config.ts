import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

// ─────────────────────────────────────────────────────────────────────────
// Raids (FR / EN) — schéma partagé
// ─────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────
// Globals (FR / EN)
// ─────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────
// Blog (FR / EN) — schéma partagé
// ─────────────────────────────────────────────────────────────────────────
// Les champs `heroTitle`, `bigTitle` et le corps markdown autorisent du HTML
// (ex. <em>, <br />, <a>) pour préserver exactement le rendu actuel.
const blogSchema = z.object({
  order: z.number().int().min(1),
  title: z.string(),              // meta <title>
  description: z.string(),         // meta description
  hero: z.string(),               // image hero (background phero)
  heroEyebrow: z.string(),        // "Coulisses", "Conseils", etc.
  heroTitle: z.string(),          // h1 (HTML autorisé)
  meta: z.string(),               // ligne "Coulisses · 4 min de lecture"
  bigTitle: z.string(),           // gros titre d'article (HTML autorisé)
  cardTag: z.string(),            // tag affiché sur la carte du blog
  cardTitle: z.string(),          // titre affiché sur la carte (texte brut)
  cardExcerpt: z.string(),        // extrait affiché sur la carte
  ctaIntro: z.string(),           // petit teaser avant le bouton CTA
  ctaLabel: z.string(),           // libellé du bouton CTA
  ctaHref: z.string(),            // lien du bouton CTA
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: blogSchema,
});

const blogEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog-en' }),
  schema: blogSchema,
});

// ─────────────────────────────────────────────────────────────────────────
// Culture / "Le Maroc" (FR / EN) — schéma partagé
// ─────────────────────────────────────────────────────────────────────────
const cultureSchema = z.object({
  order: z.number().int().min(1),
  caption: z.string(),             // légende courte sur la vignette home
  title: z.string(),               // h1 de la page
  keyword: z.string(),             // mot-clé SEO
  description: z.string(),         // meta description
  imageAlt: z.string(),
  image: z.string(),
  imageBase: z.string().optional(),// base sans extension pour WebP srcset
  showVisitMorocco: z.boolean().default(false),
  ctaLabel: z.string(),
  ctaHref: z.string(),
  // corps markdown : paragraphes, liens markdown [texte](url)
});

const culture = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/culture' }),
  schema: cultureSchema,
});

const cultureEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/culture-en' }),
  schema: cultureSchema,
});

// ─────────────────────────────────────────────────────────────────────────
// Pages singleton (FR / EN) — Qui suis-je (edouard-de-moor)
// ─────────────────────────────────────────────────────────────────────────
const pressItemSchema = z.object({
  title: z.string(),
  source: z.string(),
  date: z.string(),              // "Mars 2026" / "March 2026"
  datePublished: z.string(),     // "2026-03"
  url: z.string(),
  image: z.string(),             // base sans extension
  imageAlt: z.string(),
  credit: z.string().optional(),
  publisherUrl: z.string(),
});

const pageSchema = z.object({
  seoTitle: z.string(),
  seoDescription: z.string(),
  heroPhoto: z.string(),
  heroEyebrow: z.string(),
  heroTitle: z.string(),         // HTML
  sections: z.array(z.object({
    meta: z.string(),
    bigTitle: z.string(),        // HTML
    paragraphs: z.array(z.string()).min(1),  // HTML autorisé par paragraphe
  })).min(1),
  pressEyebrow: z.string(),
  pressTitle: z.string(),        // HTML
  pressReadLabel: z.string(),    // "Lire l'article" / "Read the article"
  pressAriaNewTab: z.string(),   // "(nouvelle fenêtre)" / "(opens in a new tab)"
  press: z.array(pressItemSchema),
  pressFooterNote: z.string().optional(),
  galleryEyebrow: z.string(),
  galleryTitle: z.string(),      // HTML
  galleryPhotos: z.array(z.string()),
  galleryAltPrefix: z.string(),  // "Edouard De Moor en action, photo" (préfixe)
  galleryAriaPrefix: z.string(), // "Photo X d'Edouard De Moor" (template avec {n})
  ctaEyebrow: z.string(),
  ctaTitle: z.string(),          // HTML
  ctaButtons: z.array(z.object({ label: z.string(), href: z.string() })),
  jsonLd: z.object({
    jobTitle: z.string(),
    nationality: z.string().default('BE'),
    knowsAbout: z.array(z.string()),
    inLanguage: z.string(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: pageSchema,
});

const pagesEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages-en' }),
  schema: pageSchema,
});

export const collections = {
  raids, raidsEn,
  globals, globalsEn,
  blog, blogEn,
  culture, cultureEn,
  pages, pagesEn,
};
