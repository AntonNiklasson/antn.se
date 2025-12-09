import { atomWithStorage } from "jotai/utils";

export const themes = ["light", "dark", "auto"] as const;

export type Theme = (typeof themes)[number];

export const themeAtom = atomWithStorage<Theme>("theme-mode", "auto");
