import { z } from "astro:content";

const envSchema = z.object({
	RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
	CONTACT_EMAIL: z.string().email("CONTACT_EMAIL must be a valid email address"),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
	const result = envSchema.safeParse(import.meta.env);

	if (!result.success) {
		console.error("❌ Environment validation failed:");
		result.error.issues.forEach((issue) => {
			console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
		});
		throw new Error("Invalid environment variables");
	}

	return result.data;
}

// Validate environment variables immediately
export const env = validateEnv();
