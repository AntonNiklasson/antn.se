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
		<div className="flex flex-col space-y-1 text-gray-500 focus-within:text-blue-700">
			<label htmlFor={id} className="text-sm font-bold">
				{label}:
			</label>
			<Component
				id={id}
				name={id}
				placeholder={placeholder}
				className={twMerge(
					"rounded-xl border border-gray-300 p-2 text-sm focus:border-blue-700 focus:outline-hidden",
					multiline && "h-32 resize-none border",
				)}
			/>
		</div>
	);
};
