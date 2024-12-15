"use client";

import { WordGuesserInputCharacter } from "@/components/word-guesser-input-character";
import { CharMatch } from "@/lib/match-word";
import { cn } from "@/lib/utils";

export interface WordGuesserInputProps {
  length: number;
  guessResult?: CharMatch[];
  value?: string;
  active?: boolean;
}

export function WordGuesserInput({
  length,
  value,
  guessResult,
  active,
}: WordGuesserInputProps) {
  return (
    <form
      className={cn("flex gap-1 rounded-lg border-2 border-transparent p-1", {
        "border-gray-400 bg-gray-200 dark:border-gray-200 dark:bg-gray-800":
          active,
      })}
    >
      {Array.from({ length }, (_, i) => (
        <WordGuesserInputCharacter
          key={i}
          value={value?.[i] ?? ""}
          match={guessResult?.[i]}
          index={i}
        />
      ))}
    </form>
  );
}
