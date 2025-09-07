import React from "react";
import type { Experience } from "../../content/config";
import { useAtomValue } from "jotai";
import { modeAtom } from "./atoms";
import { ModeSwitch } from "./ModeSwitch";
import { AnimatePresence, motion } from "motion/react";

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
			<header className="mb-8 flex flex-row items-center justify-between">
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
								<div className="flex flex-row items-center justify-between gap-1">
									<div className="flex flex-row items-center gap-2">
										<h3 className="flex flex-row text-lg font-medium text-gray-900 hover:text-gray-700">
											{exp.organization}
										</h3>
										<h4 className="text-gray-400">{exp.title}</h4>
									</div>
									<div className="text-xs font-bold text-gray-400">
										{formattedStart} – {formattedEnd}
									</div>
								</div>
							</header>

							<AnimatePresence initial={false}>
								{mode === "long" && (
									<motion.div
										className="prose prose-sm max-w-none text-gray-700"
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
