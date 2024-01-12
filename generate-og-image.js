import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import parseFrontmatter from "gray-matter";

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
	const path = `src/content/blog/${pathname}index.mdx`;
	const file = fs.readFileSync(path);
	const meta = parseFrontmatter(file).data;

	return meta;
}

export async function generateOGImages(dir, pages) {
	const width = 1200;
	const height = 630;

	const interFont = fs.readFileSync(`public/Inter-Medium.ttf`);
	const interBoldFont = fs.readFileSync(`public/Inter-Bold.ttf`);

	for (const { pathname } of pages) {
		// Skip the / page.
		if (pathname === "") continue;

		const { title, date } = getPostMeta(pathname);

		console.log(`Generating cover for post "${title}"`);

		const svg = await satori(html({ title, date }), {
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
		const image = await renderer.render().asPng();

		fs.writeFileSync(`${dir.pathname}${pathname}cover.png`, image);
	}
}
