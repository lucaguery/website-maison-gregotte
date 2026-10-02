import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      lang: z.enum(['fr', 'en']),
      description: z.string(),
      price: z.number().optional(),
      currency: z.enum(['EUR', 'USD']).default('EUR'),
      category: z.enum(['pastel', 'watercolor', 'collage']),
      sold: z.boolean().default(false),
      date: z.coerce.date(),
      cover: image(),
      images: z.array(image()).optional(),
      dimensions: z.string().optional(),
      framed: z.boolean().default(true),
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = { products };
