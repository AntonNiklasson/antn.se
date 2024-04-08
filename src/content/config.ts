import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	schema: z.object({
		title: z.string(),
		summary: z.string().optional(),
		date: z.coerce.date(),
		lastUpdate: z.coerce.date().optional(),
		hero: z.string().optional(),
	}),
});

export const collections = { blog };
