import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { generatePostCovers } from "./scripts/generate-post-covers";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwind from "@tailwindcss/vite";
import { remarkWikiLinks } from "./src/plugins/remark-wiki-links";

// https://astro.build/config
export default defineConfig({
	site: "https://antn.se",
	output: "server",
	adapter: vercel(),
	markdown: {
		remarkPlugins: [remarkWikiLinks],
	},
	integrations: [sitemap(), react(), generatePostCovers()],
	vite: {
		plugins: [tailwind()],
	},
});
