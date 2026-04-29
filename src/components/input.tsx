import type { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  id: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  autofocus?: boolean;
};

export const Input: FC<Props> = ({ id, label, placeholder, multiline, autofocus }) => {
  const Component = multiline ? "textarea" : "input";

  return (
    <div className="group flex flex-col items-start space-y-2">
      <label htmlFor={id} className="text-xs font-bold text-muted transition group-focus-within:text-heading">
        {label}:
      </label>
      <div
        className={twMerge(
          "flex w-full bg-border transition group-focus-within:bg-heading",
          multiline && "mt-2 pl-[1px]",
          !multiline && "pb-[1px]",
        )}>
        <Component
          id={id}
          name={id}
          placeholder={placeholder}
          autoFocus={autofocus}
          className={twMerge(
            "h-full w-full bg-background p-2 text-sm font-semibold transition focus:outline-hidden",
            !multiline && "",
            multiline && "h-32 resize-none",
          )}
        />
      </div>
    </div>
  );
};
