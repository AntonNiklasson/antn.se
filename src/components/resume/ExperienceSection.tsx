import React from "react";
import type { Experience } from "../../content/config";
import ReactMarkdown from "react-markdown";

interface ExperienceSectionProps {
	experiences: Experience[];
}

function formatDate(time: { month: number; year: number }): string {
	return `${time.month.toString().padStart(2, "0")}.${time.year}`;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
	return (
		<section>
			<header className="mb-8">
				<h2 className="text-foreground text-xl font-semibold">Experience</h2>
			</header>

			<div className="space-y-16">
				{experiences.map((exp, index) => {
					const formattedStart = formatDate(exp.time.from);
					const formattedEnd = exp.time.to ? formatDate(exp.time.to) : "";

					return (
						<article key={index} className="space-y-2 overflow-hidden">
							<header>
								<div className="flex flex-row items-center justify-between">
									<div className="flex flex-col md:flex-row md:items-center md:gap-2">
										<h3 className="text-heading hover:text-foreground flex flex-row text-lg font-medium">
											{exp.organization}
										</h3>
										<h4 className="text-subtle">{exp.title}</h4>
									</div>
									<div className="text-subtle text-xs font-bold">
										{formattedStart} – {formattedEnd}
									</div>
								</div>
							</header>

							<div className="prose prose-sm dark:prose-invert text-foreground max-w-none">
								<ReactMarkdown>{exp.description}</ReactMarkdown>
								{exp.contributions && exp.contributions.length > 0 && (
									<ul>
										{exp.contributions.map((contribution, i) => (
											<li key={i}>{contribution}</li>
										))}
									</ul>
								)}
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
};
