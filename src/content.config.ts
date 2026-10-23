import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const schema = z.object({
  title: z.string(),
  description: z.string(),
  locale: z.enum(['en', 'zh']),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  translationKey: z.string(),
  date: z.coerce.date(),
  draft: z.boolean().default(true),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
}).refine(data => !data.image || Boolean(data.imageAlt), { message: 'An image needs imageAlt.' });

export const collections = {
  blogs: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/blogs', generateId: ({ entry }) => entry.replace(/\.md$/, '') }), schema }),
  projects: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/projects', generateId: ({ entry }) => entry.replace(/\.md$/, '') }), schema }),
};
