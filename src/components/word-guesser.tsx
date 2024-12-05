"use client";

import { useRef } from "react";

import { WordGuesserInput } from "@/components/word-guesser-input";
import { useWordInput } from "@/lib/use-guess-input";

export function WordGuesser({}: Readonly<{
  checkGuess: (guess: string) => Promise<
    | {
        status: "invalid";
      }
    | {
        status: "valid";
        matches: ("yes" | "close" | "no")[];
      }
  >;
}>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { word, handleKeyUp, handleKeyDown } = useWordInput({
    length: 5,
    onEnter: (w) => console.log(w),
  });

  return (
    <div
      ref={containerRef}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      autoFocus
      onBlur={(event) => {
        if (
          !(
            event.relatedTarget instanceof Node &&
            containerRef.current instanceof Node &&
            containerRef.current.contains(event.relatedTarget)
          )
        ) {
          containerRef.current?.focus();

          return;
        }
      }}
      className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 focus:outline-none"
    >
      <h1 className="text-4xl font-bold">Guess the Word</h1>
      <section className="p-2">
        <WordGuesserInput length={5} word={word} />
      </section>
    </div>
  );
}
