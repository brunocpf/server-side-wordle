"use client";

import { CharMatch } from "@/lib/match-word";
import { cn } from "@/lib/utils";

export interface WordGuesserInputCharacterProps {
  value: string;
  match?: CharMatch;
  index?: number;
}

export function WordGuesserInputCharacter({
  value,
  match,
  index,
}: WordGuesserInputCharacterProps) {
  const colors = {
    default:
      "border-zinc-400 bg-zinc-100 dark:border-zinc-400 dark:bg-zinc-800",
    yes: "border-zinc-400 bg-green-400 dark:border-zinc-400 dark:bg-green-800",
    close:
      "border-zinc-400 bg-yellow-400 dark:border-zinc-400 dark:bg-yellow-800",
    no: "border-zinc-400 bg-red-400 dark:border-zinc-400 dark:bg-red-800",
  };

  return (
    <>
      <div
        style={{
          transitionDelay: `${(index ?? 0) * 0.25}s`,
        }}
        className={cn(
          "relative h-10 w-10 uppercase transition-all [transform-style:preserve-3d]",
          {
            "[rotate:y_180deg]": !!match,
          },
        )}
      >
        <span
          className={cn(
            "absolute inset-0 grid place-items-center rounded-md border-2 font-bold",
            colors["default"],
            "[backface-visibility:hidden]",
            {
              "animate-[scale_0.5s_ease-in-out]": !!value[0],
            },
          )}
        >
          {value[0]}
        </span>
        <span
          className={cn(
            "absolute inset-0 grid place-items-center rounded-md border-2 font-bold",
            colors[match ?? "default"],
            "[backface-visibility:hidden] [rotate:y_180deg]",
            {
              "animate-[scale_0.5s_ease-in-out]": !!value[0],
            },
          )}
        >
          {value[0]}
        </span>
      </div>
      <style jsx>
        {`
          @keyframes scale {
            50% {
              transform: scale(1.25);
            }
          }
        `}
      </style>
    </>
  );
}
