import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
	const posts = await getCollection("blog");
	const feedItems = posts.map((post) => ({
		title: post.data.title,
		pubDate: post.data.date,
		link: `/${post.slug}`,
	}));

	return rss({
		title: "antn.se",
		description: `Anton Niklasson's personal website`,
		site: context.site,
		items: feedItems,
	});
}
