import type { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	id: string;
	label: string;
	placeholder?: string;
	multiline?: boolean;
	autofocus?: boolean;
};

export const Input: FC<Props> = ({ id, label, placeholder, multiline, autofocus }) => {
	const Tag = multiline ? "textarea" : "input";

	return (
		<div className="flex flex-col items-start space-y-1">
			<label
				htmlFor={id}
				className="text-xs font-bold transition group-focus-within:bg-gradient-to-r">
				{label}:
			</label>

			<Tag
				id={id}
				name={id}
				placeholder={placeholder}
				autoFocus={autofocus}
				className={twMerge(
					"h-full w-full rounded-lg border border-2 p-2 text-sm font-semibold transition focus:outline-hidden",
					multiline && "h-32 resize-none",
				)}
			/>
		</div>
	);
};
