import React from "react";
import ReactMarkdown from "react-markdown";
import type { ResumeData } from "../../content/config";
import { ExperienceSection } from "./ExperienceSection";

interface ResumeProps {
	data: ResumeData;
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
	const { experiences } = data;

	return (
		<div className="space-y-16">
			<header className="prose prose-neutral">
				<ReactMarkdown>{data.intro}</ReactMarkdown>
			</header>

			<ExperienceSection experiences={experiences} />
		</div>
	);
};

export default Resume;
