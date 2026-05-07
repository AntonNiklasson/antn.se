export function formatDate(date: Date): string {
	const d = new Date(date);
	const month = d.toLocaleDateString("en-US", { month: "long" });
	const day = d.getDate();
	const year = d.getFullYear();

	return `${month} ${day}, ${year}`;
}
