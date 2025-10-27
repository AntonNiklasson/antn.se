import path from "path";

function slugify(title: string): string {
	return title.toLowerCase().replaceAll(" ", "-");
}

function today() {
	return new Date().toISOString().slice(0, 10);
}

const [, , ...titleParts] = Bun.argv;

if (!titleParts || !titleParts.length) {
	console.error('Missing title. Call it like this: `make:book "The Book Title"`');
	process.exit();
}

const booksDir = "./src/content/books";
const title = titleParts.join(" ");
const slug = slugify(title);
const content = `---
title: ${title}
author: Author Name
dateFinished: ${today()}
isbn: ""
cover: ""
goodreadsUrl: ""
rating: 5
---

## Notes

Your reading notes and highlights go here.

## Key Takeaways

-
-

## Quotes

>
`;

const book = Bun.file(path.join(booksDir, slug, "index.mdx"));

if (await book.exists()) {
	throw Error("Book already exists");
}

await Bun.write(book, content);

console.log(`Created book: ${slug}`);
