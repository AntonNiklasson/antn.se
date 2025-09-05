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
						className={twMerge(
							"text-sm font-semibold border px-4 py-1 text-gray-400 hover:text-gray-500 bg-gray-100 transition",
							active && "shadow text-gray-600 bg-white",
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
