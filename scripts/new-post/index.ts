import path from "path";
import { slugify, today } from "./utils";

const [, , title] = Bun.argv;

if (!title || !title.length) {
	console.error('Missing title. Call it like this: `new-post "lorem ipsum"`');
	process.exit();
}

const postsDir = "./src/content/blog";
const slug = slugify(title);
const content = `---
title: ${title}
date: ${today()}
---


`;

const post = Bun.file(path.join(postsDir, slug, "index.mdx"));

if (await post.exists()) {
	throw Error("Post already exists");
}

await Bun.write(post, content);
