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
		<nav className="flex items-center gap-4">
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
							"text-sm font-semibold text-gray-400 transition hover:text-gray-900",
							active && "text-gray-900",
						)}>
						{link.label}
					</a>
				);
			})}
		</nav>
	);
}
