export function slugify(title: string): string {
	return title.toLowerCase().replaceAll(" ", "-");
}

export function today() {
	return new Date().toISOString().slice(0, 10);
}
