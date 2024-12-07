"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { WordGuesserInput } from "@/components/word-guesser-input";
import { useWordInput } from "@/lib/use-guess-input";

const NUMBER_OF_ATTEMPTS = 6;

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
  const [guesses, setGuesses] = useState<string[]>([]);

  const { word, handleKeyDown, handleKeyUp, reset } = useWordInput({
    length: 5,
    onEnter: (w) => {
      if (w.length !== 5) {
        return;
      }

      if (guesses.length + 1 >= NUMBER_OF_ATTEMPTS) {
        setGuesses([]);
      } else {
        setGuesses((g) => [...g, w]);
      }
      reset();
    },
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <Card className="focus:outline-none p-3">
      <h1 className="text-4xl font-bold">Guess the Word</h1>
      <section className="p-2 flex flex-col gap-3 items-center">
        {Array.from({ length: NUMBER_OF_ATTEMPTS }, (_, i) => {
          if (i < guesses.length) {
            return <WordGuesserInput key={i} length={5} word={guesses[i]} />;
          }

          if (i > guesses.length) {
            return <WordGuesserInput key={i} length={5} word="" />;
          }

          return <WordGuesserInput key={i} length={5} word={word} />;
        })}
      </section>
    </Card>
  );
}
