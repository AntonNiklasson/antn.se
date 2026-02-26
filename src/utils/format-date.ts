export function formatDate(date: Date, showYear = false): string {
    const d = new Date(date);
    const month = d.toLocaleDateString("en-US", { month: "long" });
    const day = d.getDate();
    const year = d.getFullYear();

    return showYear ? `${month} ${day}, ${year}` : `${month} ${day}`;
}
