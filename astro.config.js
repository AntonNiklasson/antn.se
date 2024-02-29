import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import satori from "satori";
import { generateOGImages } from "./generate-og-image";
import partytown from "@astrojs/partytown";

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
	integrations: [
		sitemap(),
		mdx(),
		og(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
	],
});
