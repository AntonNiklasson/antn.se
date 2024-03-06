import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { generatePostCovers } from "./scripts/generate-post-covers";
import partytown from "@astrojs/partytown";

export default defineConfig({
	site: "https://antn.se",
	integrations: [
		sitemap(),
		mdx(),
		generatePostCovers(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
	],
});
