import type { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	id: string;
	label: string;
	placeholder?: string;
	multiline?: boolean;
};

export const Input: FC<Props> = ({ id, label, placeholder, multiline }) => {
	const Component = multiline ? "textarea" : "input";

	return (
		<div className="flex flex-col space-y-2 text-gray-400 focus-within:text-blue-800">
			<label htmlFor={id} className="text-sm">
				{label}:
			</label>
			<Component
				id={id}
				name={id}
				placeholder={placeholder}
				className={twMerge(
					"p-4 border rounded-xl border-gray-300 text-sm focus:outline-none focus:border-blue-700",
					multiline && "border resize-none h-32",
				)}
			/>
		</div>
	);
};
