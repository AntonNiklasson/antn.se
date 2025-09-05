import { atomWithStorage } from "jotai/utils";

export const modes = ["short", "long"] as const;

export type Mode = (typeof modes)[number];

export const modeAtom = atomWithStorage<Mode>("reading-mode", "long");
