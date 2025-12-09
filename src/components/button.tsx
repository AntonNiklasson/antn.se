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
			className="bg-accent-primary text-fg-inverse rounded-sm border-2 px-6 py-2 text-xs font-bold transition hover:shadow-xl">
			{label}
		</button>
	);
};
