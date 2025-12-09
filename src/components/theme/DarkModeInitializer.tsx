import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { themeAtom } from "./atoms";

const THEMES = {
	AUTO: "theme-auto",
	LIGHT: "theme-light",
	DARK: "theme-dark",
};

export const DarkModeInitializer = () => {
	const theme = useAtomValue(themeAtom);

	useEffect(() => {
		const applyTheme = (mode: string) => {
			const html = document.documentElement;

			html.classList.remove(THEMES.DARK, THEMES.LIGHT);

			if (mode === "auto") {
				const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

				if (isDark) {
					html.classList.add(THEMES.DARK);
				}
			} else if (mode === "dark") {
				html.classList.add(THEMES.DARK);
			} else {
				html.classList.add(THEMES.LIGHT);
			}
		};

		console.log("apply theme", theme);
		applyTheme(theme);

		if (theme === THEMES.AUTO) {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const handleChange = (e: MediaQueryListEvent) => {
				console.log("theme change", e.matches);
				applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
			};

			mediaQuery.addEventListener("change", handleChange);

			return () => mediaQuery.removeEventListener("change", handleChange);
		}
	}, [theme]);

	return null;
};
