import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog">;
type Vec = Map<string, number>;

const STOP = new Set(
	"the be to of and a in that have i it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us was are been has had did were more very is".split(
		" ",
	),
);

function tokenize(text: string): string[] {
	return text
		.replace(/^---[\s\S]*?---/, "")
		.replace(/```[\s\S]*?```/g, "")
		.replace(/`[^`]+`/g, "")
		.replace(/!\[.*?\]\(.*?\)/g, "")
		.replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
		.replace(/[^a-zA-Z0-9\s]/g, " ")
		.toLowerCase()
		.split(/\s+/)
		.filter((w) => w.length >= 3 && !STOP.has(w));
}

function cosine(a: Vec, b: Vec): number {
	let dot = 0,
		magA = 0,
		magB = 0;
	for (const [t, v] of a) {
		magA += v * v;
		if (b.has(t)) dot += v * b.get(t)!;
	}
	for (const v of b.values()) magB += v * v;
	const d = Math.sqrt(magA) * Math.sqrt(magB);
	return d === 0 ? 0 : dot / d;
}

export function findRelatedPosts(currentSlug: string, allPosts: Post[], count = 3): Post[] {
	const docs = allPosts.map((p) => ({
		slug: p.slug,
		tokens: tokenize(`${p.data.title} ${p.data.title} ${p.data.excerpt ?? ""} ${p.body ?? ""}`),
	}));

	const df = new Map<string, number>();
	for (const { tokens } of docs) {
		for (const t of new Set(tokens)) df.set(t, (df.get(t) ?? 0) + 1);
	}

	const n = docs.length;
	const vecs = new Map<string, Vec>();
	for (const { slug, tokens } of docs) {
		const tf = new Map<string, number>();
		for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
		const v: Vec = new Map();
		for (const [t, c] of tf) v.set(t, c * Math.log(n / (df.get(t) ?? 1)));
		vecs.set(slug, v);
	}

	const current = vecs.get(currentSlug);
	if (!current) return [];

	return [...vecs.entries()]
		.filter(([s]) => s !== currentSlug)
		.map(([s, v]) => ({ s, score: cosine(current, v) }))
		.sort((a, b) => b.score - a.score)
		.slice(0, count)
		.map(({ s }) => allPosts.find((p) => p.slug === s)!)
		.filter(Boolean);
}
