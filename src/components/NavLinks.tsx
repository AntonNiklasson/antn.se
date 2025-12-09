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
	return (
		<nav className="flex cursor-none items-center gap-4">
			{links.map((link) => {
				const isExternal = link.url.startsWith("http");
				const active =
					!isExternal &&
					(currentPath === link.url ||
						(link.url !== "/" && currentPath.startsWith(link.url)));

				return (
					<a
						key={link.url}
						href={link.url}
						className={twMerge(
							"relative rounded text-sm font-semibold transition",
							"text-fg-muted hover:text-fg-secondary",
							active && "text-fg-secondary",
						)}>
						{link.label}
					</a>
				);
			})}
		</nav>
	);
}
