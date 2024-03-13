import { test, expect } from "vitest";
import { groupBy } from "./group-by";

const items = [
	{
		id: 1,
		name: "Anton",
		lastname: "Niklasson",
		age: 30,
		tags: ["x", "y"],
	},
	{ id: 2, name: "Albin", lastname: "Niklasson", age: 20, tags: ["y"] },
	{
		id: 3,
		name: "Axel",
		lastname: "Niklasson",
		age: 40,
		tags: ["x"],
	},
];

test("it groups", () => {
	const grouped = groupBy(items, (user) => user.lastname);

	expect(grouped).toEqual({
		Niklasson: items,
	});
});

test("it groups with a number as key", () => {
	const grouped = groupBy(items, (user) => user.age);

	expect(grouped).toEqual({
		20: [items[1]],
		30: [items[0]],
		40: [items[2]],
	});
});
