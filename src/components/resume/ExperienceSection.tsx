import React from "react";
import type { Experience } from "../../content/config";
import { useAtomValue } from "jotai";
import { modeAtom } from "./atoms";
import { ModeSwitch } from "./ModeSwitch";
import { AnimatePresence, motion } from "motion/react";
import { twMerge } from "tailwind-merge";

interface ExperienceSectionProps {
	experiences: Experience[];
}

function formatDate(time: { month: number; year: number }): string {
	return `${time.month.toString().padStart(2, "0")}.${time.year}`;
}

function foldingVariants({ duration, blur = 2 }: { duration: number; blur?: number }) {
	return {
		open: {
			opacity: 1,
			filter: `blur(0px`,
			height: "auto",
			transition: {
				duration,
				opacity: {
					duration,
					delay: duration * 0.2,
				},
			},
		},
		closed_before: {
			opacity: 0,
			filter: `blur(${blur}px`,
			height: 0,
		},
		closed_after: {
			opacity: 0,
			filter: `blur(${blur}px`,
			height: 0,
			transition: {
				duration,
				height: {
					duration,
					delay: duration * 0.2,
				},
			},
		},
	};
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
	const mode = useAtomValue(modeAtom);

	return (
		<section>
			<header className="flex flex-row justify-between items-center mb-8">
				<h2 className="text-xl font-semibold text-gray-900">Experience</h2>
				<ModeSwitch />
			</header>

			<div className={mode === "short" ? "space-y-2" : "space-y-16"}>
				{experiences.map((exp, index) => {
					const formattedStart = formatDate(exp.time.from);
					const formattedEnd = exp.time.to ? formatDate(exp.time.to) : "";

					return (
						<article key={index} className="overflow-hidden">
							<header className="">
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
									<div className="flex flex-row space-x-3 items-end">
										<h3 className="text-lg font-medium text-gray-900 flex flex-row cursor-pointer hover:text-gray-700">
											{exp.organization}
										</h3>
										<h4 className="text-gray-400">{exp.title}</h4>
									</div>
									<div className="text-xs text-gray-400 font-bold">
										{formattedStart} – {formattedEnd}
									</div>
								</div>
							</header>

							<AnimatePresence initial={false}>
								{mode === "long" && (
									<motion.div
										className="prose prose-sm text-gray-700 max-w-none"
										transition={{
											ease: "easeInOut",
										}}
										variants={foldingVariants({ duration: 0.2 })}
										initial="closed_before"
										animate="open"
										exit="closed_after">
										{exp.description && (
											<p className="mb-3 whitespace-pre-line">
												{exp.description}
											</p>
										)}
									</motion.div>
								)}
							</AnimatePresence>
						</article>
					);
				})}
			</div>
		</section>
	);
};
