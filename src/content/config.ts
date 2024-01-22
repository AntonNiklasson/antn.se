import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	schema: z.object({
		title: z.string(),
		summary: z.string().optional(),
		date: z.coerce.date(),
		hero: z.string().optional(),
	}),
});

const experiences = defineCollection({
	schema: z.object({
		title: z.string(),
		organization: z.string(),
		description: z.string().optional(),
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
	}),
});

export const collections = { blog, experiences };
