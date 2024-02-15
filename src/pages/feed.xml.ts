import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: any) {
	console.log({
		context,
	});

	const blog = await getCollection("blog");
	const items = blog.map((post) => {
		return {
			title: post.data.title,
			description: post.data.summary,
			pubDate: post.data.date,
			link: post.slug,
		};
	});

	return rss({
		title: "Anton Niklasson",
		description: "Anton's personal blog",
		site: context.site,
		items,
	});
}
