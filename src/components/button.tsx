import type { FC } from "react";

type Props = {
	label: string;
	submit?: boolean;
	disabled?: boolean;
};

export const Button: FC<Props> = ({ label, submit, disabled }) => {
	return (
		<button
			type={submit ? "submit" : undefined}
			disabled={disabled}
			className="rounded border-2 border-gray-300 bg-transparent px-6 py-2 text-sm font-bold text-gray-400 transition hover:border-fuchsia-700 hover:text-fuchsia-700 hover:shadow focus:border-fuchsia-700 focus:text-fuchsia-700 focus:outline-hidden">
			{label}
		</button>
	);
};
