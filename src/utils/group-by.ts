type Key = string | number;
type Getter<TItem extends object, TReturn extends Key> = (
	item: TItem,
) => TReturn;

export function groupBy<Item extends object, Id extends Key>(
	list: Item[],
	by: Getter<Item, Id>,
): Record<Id, Item[]> {
	const grouped = list.reduce(
		(acc, item) => {
			const key = by(item);
			const cluster = acc[key] ?? [];

			return {
				...acc,
				[key]: [...cluster, item],
			};
		},
		{} as Record<Id, Item[]>,
	);

	return grouped;
}
