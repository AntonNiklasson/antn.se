import { useAtom } from "jotai";
import { twMerge } from "tailwind-merge";
import { themeAtom, themes } from "./atoms";

export function DarkModeToggle() {
	const [currentTheme, setTheme] = useAtom(themeAtom);

	return (
		<div className="fixed top-1/2 left-0 flex translate-x-[-60%] flex-col gap-2 rounded-lg p-4 transition-all hover:translate-x-0">
			{themes.map((theme) => {
				const active = currentTheme === theme;

				return (
					<button
						key={theme}
						className={twMerge(
							"text-fg-secondary transition-timing-in-out rounded-full border px-4 py-2 text-sm font-bold transition-all",
							active && "text-fg-primary bg-success",
						)}
						onClick={() => {
							setTheme(theme);
						}}>
						{theme}
					</button>
				);
			})}
		</div>
	);
}
