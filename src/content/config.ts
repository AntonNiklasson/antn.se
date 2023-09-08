import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		summary: z.string().optional(),
		date: z.coerce.date(),
		hero: z.string().optional(),
	}),
});

export const collections = { blog };
