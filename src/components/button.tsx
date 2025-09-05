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
			className="bg-white px-6 py-2 bg-gray-800 text-gray-600 text-sm rounded-xl border hover:shadow hover:bg-gray-100 focus:outline-none focus:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
			{label}
		</button>
	);
};
