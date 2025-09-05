import { motion } from "motion/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type Link = {
	label: string;
	url: string;
};

type Props = {
	links: Link[];
	currentPath: string;
};

export default function NavLinks({ links, currentPath }: Props) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<nav className="flex items-center gap-4" onMouseLeave={() => setHoveredIndex(null)}>
			{links.map((link, index) => {
				const isExternal = link.url.startsWith("http");
				const active =
					!isExternal &&
					(currentPath === link.url ||
						(link.url !== "/" && currentPath.startsWith(link.url)));
				const showDot = hoveredIndex === index || (hoveredIndex === null && active);

				return (
					<a
						key={link.url}
						href={link.url}
						className={twMerge(
							"relative rounded text-sm font-semibold text-gray-400 hover:text-gray-700 transition",
							active && "text-gray-700",
						)}
						onMouseEnter={() => setHoveredIndex(index)}>
						{link.label}
						{showDot && (
							<motion.span
								className="h-[3px] absolute -bottom-2 bg-blue-400"
								layoutId="nav-dot"
								initial={false}
								style={{
									width: "50%",
									left: "25%",
									transformOrigin: "center",
								}}
								transition={{
									type: "spring",
									damping: 10,
									stiffness: 100,
									mass: 0.5,
									velocity: 100,
								}}
							/>
						)}
					</a>
				);
			})}
		</nav>
	);
}
