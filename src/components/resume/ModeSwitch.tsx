import { useAtom } from "jotai";
import { twMerge } from "tailwind-merge";
import { modeAtom, modes } from "./atoms";

export function ModeSwitch() {
	const [currentMode, setMode] = useAtom(modeAtom);

	return (
		<div className="rounded-lg">
			{modes.map((mode, index) => {
				const first = index === 0;
				const last = index === modes.length - 1;
				const active = currentMode === mode;

				return (
					<button
						key={mode}
						className={twMerge(
							"border border-border bg-surface px-4 py-1 text-sm font-semibold text-subtle transition hover:text-muted",
							active && "bg-background text-foreground shadow",
							first && "rounded-s-lg border-e-0",
							last && "rounded-e-lg border-s-0",
						)}
						onClick={() => {
							setMode(mode);
						}}>
						{mode}
					</button>
				);
			})}
		</div>
	);
}
