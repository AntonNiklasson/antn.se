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

const resumeSchema = z.object({
	intro: z.string(),
	experiences: z.array(
		z.object({
			title: z.string(),
			organization: z.string(),
			logo: z.string().optional(),
			time: z.object({
				from: z.object({
					month: z.number(),
					year: z.number(),
				}),
				to: z
					.object({
						month: z.number(),
						year: z.number(),
					})
					.optional(),
			}),
			description: z.string().optional(),
			contributions: z.array(z.string()).optional(),
			tech: z.array(z.string()).optional(),
		}),
	),
	educations: z
		.array(
			z.object({
				title: z.string(),
				school: z.string(),
				time: z.object({
					from: z.number(),
					to: z.number(),
				}),
			}),
		)
		.optional(),
});

const resume = defineCollection({
	type: "data",
	schema: resumeSchema,
});

export const collections = { blog, resume };

// Export inferred types
export type ResumeData = z.infer<typeof resumeSchema>;
export type Experience = ResumeData["experiences"][number];
