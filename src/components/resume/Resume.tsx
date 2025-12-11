import React from "react";
import ReactMarkdown from "react-markdown";
import type { ResumeData } from "../../content/config";
import { ExperienceSection } from "./ExperienceSection";

interface ResumeProps {
	data: ResumeData;
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
	const { experiences, educations } = data;

	return (
		<div className="space-y-20 print:space-y-10">
			<header className="prose print:prose-sm">
				<ReactMarkdown>{data.intro}</ReactMarkdown>
			</header>

			<ExperienceSection experiences={experiences} />

			{educations && educations.length > 0 && (
				<section>
					<h2 className="mb-8 text-xl font-semibold text-gray-800 print:mb-4">
						Education
					</h2>
					<div className="space-y-4 print:space-y-2">
						{educations.map((edu, index) => (
							<article
								key={index}
								className="flex flex-row items-center justify-between">
								<div>
									<h3 className="font-medium text-gray-900">{edu.title}</h3>
									<p className="text-sm text-gray-500">{edu.school}</p>
								</div>
								<div className="text-xs font-bold text-gray-400">
									{edu.time.from} – {edu.time.to}
								</div>
							</article>
						))}
					</div>
				</section>
			)}
		</div>
	);
};

export default Resume;
