import { motion } from "motion/react";

import type { FC } from "react";

type Props = {
	title: string;
};

export const Card: FC<Props> = ({ title }) => {
	return (
		<motion.div
			className="flex aspect-square w-full cursor-grab flex-col justify-end rounded-lg border bg-white p-4 text-sm font-bold text-gray-500 shadow-sm transition-shadow hover:shadow-lg"
			drag>
			<span>{title}</span>
		</motion.div>
	);
};
