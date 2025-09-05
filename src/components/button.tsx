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
			className="rounded bg-green-700 bg-white px-6 py-2 text-sm font-bold text-green-100 hover:bg-green-800 hover:text-white hover:shadow focus:border-blue-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">
			{label}
		</button>
	);
};
