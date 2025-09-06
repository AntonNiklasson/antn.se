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
							"border bg-gray-100 px-4 py-1 text-sm font-semibold text-gray-400 transition hover:text-gray-500",
							active && "bg-white text-gray-600 shadow",
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
