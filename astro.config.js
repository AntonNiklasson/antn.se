import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { generatePostCovers } from "./scripts/generate-post-covers";
import partytown from "@astrojs/partytown";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwind from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://antn.se",
	output: "server",
	adapter: vercel(),
	integrations: [
		sitemap(),
		mdx(),
		react(),
		generatePostCovers(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
	],
	vite: {
		plugins: [tailwind()],
	},
});
