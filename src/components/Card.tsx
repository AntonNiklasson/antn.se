import { motion } from "motion/react";

import type { FC } from "react";

type Props = {
	title: string;
};

export const Card: FC<Props> = ({ title }) => {
	return (
		<motion.div
			className="w-full aspect-square flex flex-col justify-end bg-white p-4 rounded-lg border shadow-sm text-gray-500 text-sm font-bold hover:shadow-lg transition-shadow cursor-grab"
			drag>
			<span>{title}</span>
		</motion.div>
	);
};
