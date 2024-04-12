import path from "path";

const [, , title] = Bun.argv;

function slugify(title: string): string {
	return title.toLowerCase().replaceAll(" ", "-");
}

function today() {
	return new Date().toISOString().slice(0, 10);
}

const postsDir = "./src/content/blog";
const slug = slugify(title);
const date = new Date();
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
