import { visit } from "unist-util-visit";
import fs from "node:fs";
import path from "node:path";

const WIKI_LINK = /\[\[([^\]]+)\]\]/g;

function buildTitleMap(): Map<string, string> {
	const dir = path.resolve("src/content/blog");
	const map = new Map<string, string>();
	for (const file of fs.readdirSync(dir)) {
		if (!file.endsWith(".md") || file.startsWith("_")) continue;
		const slug = file.replace(/\.md$/, "");
		const content = fs.readFileSync(path.join(dir, file), "utf-8");
		const match = content.match(/^title:\s*(.+)$/m);
		if (match) map.set(slug, match[1].replace(/^["']|["']$/g, ""));
	}
	return map;
}

export function remarkWikiLinks() {
	const titles = buildTitleMap();

	return (tree: any) => {
		visit(tree, "text", (node, index, parent) => {
			if (!WIKI_LINK.test(node.value)) return;
			WIKI_LINK.lastIndex = 0;

			const children: any[] = [];
			let last = 0;

			for (const m of node.value.matchAll(WIKI_LINK)) {
				const [full, inner] = m;
				const start = m.index!;

				if (start > last) {
					children.push({ type: "text", value: node.value.slice(last, start) });
				}

				const [slug, custom] = inner.includes("|") ? inner.split("|", 2) : [inner, null];

				const display = custom ?? titles.get(slug) ?? slug;

				children.push(
					{
						type: "html",
						value: '<span class="wiki-link-bracket">[[</span>',
					},
					{
						type: "link",
						url: `/${slug}`,
						children: [{ type: "text", value: display }],
					},
					{
						type: "html",
						value: '<span class="wiki-link-bracket">]]</span>',
					},
				);

				last = start + full.length;
			}

			if (last < node.value.length) {
				children.push({ type: "text", value: node.value.slice(last) });
			}

			if (children.length > 0) {
				parent.children.splice(index, 1, ...children);
			}
		});
	};
}
