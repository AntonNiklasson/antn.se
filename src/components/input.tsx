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
	const Component = multiline ? "textarea" : "input";

	return (
		<div className="group flex flex-col items-start space-y-2">
			<label
				htmlFor={id}
				className="from-indigo-600 to-blue-600 bg-clip-text text-xs font-bold transition group-focus-within:bg-gradient-to-r group-focus-within:text-transparent">
				{label}:
			</label>
			<div
				className={twMerge(
					"flex w-full bg-gray-300 from-indigo-600 to-fuchsia-400 transition",
					multiline && "mt-2 pl-[2px] group-focus-within:bg-gradient-to-b",
					!multiline && "pb-[2px] group-focus-within:bg-gradient-to-r",
				)}>
				<Component
					id={id}
					name={id}
					placeholder={placeholder}
					autoFocus={autofocus}
					className={twMerge(
						"h-full w-full bg-white p-2 text-sm font-semibold transition focus:outline-hidden",
						!multiline && "",
						multiline && "h-32 resize-none",
					)}
				/>
			</div>
		</div>
	);
};
