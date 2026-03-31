import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const moodboards = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/moodboards' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      lang: z.enum(['fr', 'en']),
      description: z.string(),
      date: z.coerce.date(),
      cover: image(),
      images: z.array(image()).optional(),
      tags: z.array(z.string()).optional(),
    }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      lang: z.enum(['fr', 'en']),
      description: z.string(),
      price: z.number(),
      currency: z.enum(['EUR', 'USD']).default('EUR'),
      category: z.enum(['painting', 'vintage']),
      sold: z.boolean().default(false),
      date: z.coerce.date(),
      cover: image(),
      images: z.array(image()).optional(),
      dimensions: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = { moodboards, products };
