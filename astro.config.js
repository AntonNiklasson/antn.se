import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import satori from "satori";
import { generateOGImages } from "./generate-og-image";

function og() {
	return {
		name: "generate-post-images",
		hooks: {
			"astro:build:done": async ({ dir, pages }) => {
				await generateOGImages(dir, pages);
			},
		},
	};
}

export default defineConfig({
	site: "https://antn.se",
	integrations: [sitemap(), mdx(), og()],
});
