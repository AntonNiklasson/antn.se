import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import parseFrontmatter from "gray-matter";

export function generatePostCovers() {
	return {
		name: "generate-post-images",
		hooks: {
			"astro:build:done": async ({ dir, pages }) => {
				await generateOGImages(dir, pages);
			},
		},
	};
}

async function generateOGImages(dir, pages) {
	const width = 1200;
	const height = 630;

	const interFont = fs.readFileSync(`public/Inter-Medium.ttf`);
	const interBoldFont = fs.readFileSync(`public/Inter-Bold.ttf`);

	for (const { pathname } of pages) {
		const meta = getPostMeta(pathname);

		if (meta === null) continue;

		console.log(`Generating cover for post "${meta.title}"`);

		const svg = await satori(html(meta), {
			width,
			height,
			fonts: [
				{
					name: "Inter",
					data: interFont,
					style: "normal",
					weight: 400,
				},
				{
					name: "Inter",
					data: interBoldFont,
					style: "normal",
					weight: 600,
				},
			],
		});

		const renderer = new Resvg(svg, {
			fitTo: {
				mode: "width",
				value: width,
			},
		});
		const image = renderer.render().asPng();

		fs.writeFileSync(`${dir.pathname}${pathname}cover.png`, image);
	}
}

function html({ title, date }) {
	return {
		type: "div",
		props: {
			style: {
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-end",
				justifyContent: "flex-end",
				backgroundColor: "#000",
				fontFamily: "Inter",
				padding: 80,
				textAlign: "right",
			},
			children: [
				{
					type: "h2",
					props: {
						style: {
							color: "#fff",
							fontSize: 42,
							fontWeight: 600,
						},
						children: title,
					},
				},
				{
					type: "h4",
					props: {
						style: {
							color: "#ccc",
							fontSize: 32,
							fontWeight: 400,
						},
						children: date.toLocaleDateString("sv-SE", {
							year: "numeric",
							month: "numeric",
							day: "numeric",
						}),
					},
				},
				{
					type: "h4",
					props: {
						style: {
							color: "#ccc",
							fontSize: 18,
							fontWeight: 400,
						},
						children: "anton niklasson",
					},
				},
			],
		},
	};
}

function getPostMeta(pathname) {
	try {
		const path = `src/content/blog/${pathname}index.mdx`;
		const file = fs.readFileSync(path);
		const meta = parseFrontmatter(file).data;

		return meta;
	} catch (error) {
		// Non-post pages will return null here
		return null;
	}
}
