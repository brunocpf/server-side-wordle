"use client";

import { useEffect, useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { WordGuesserInput } from "@/components/word-guesser-input";
import { useWordInput } from "@/hooks/use-guess-input";
import { useToast } from "@/hooks/use-toast";
import { CharMatch } from "@/lib/match-word";
import { shareGuessAttempts } from "@/lib/share-guess-attempts";

import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";

const NUMBER_OF_ATTEMPTS = 6;

export function WordGuesser({
  checkGuess,
}: Readonly<{
  checkGuess: (guess: string) => Promise<
    | {
        status: "invalid";
      }
    | {
        status: "valid";
        matches: CharMatch[];
      }
  >;
}>) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const [guesses, setGuesses] = useState<
    {
      value: string;
      result: CharMatch[];
    }[]
  >([]);
  const [alertingInvalidInput, setAlertingInvalidInput] = useState(false);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing",
  );

  const { word, handleKeyDown, handleKeyUp, reset, setDisabled } = useWordInput(
    {
      length: 5,
      onEnter: async (w) => {
        if (w.length !== 5) {
          toast({
            title: "Invalid input",
            description: "Please enter a 5-letter word",
          });
          setAlertingInvalidInput(true);
          return;
        }

        setDisabled(true);
        const result = await checkGuess(w);
        setDisabled(false);

        if (result.status === "invalid") {
          toast({
            title: "Invalid input",
            description: "Please enter a valid 5-letter word",
          });
          setAlertingInvalidInput(true);
          return;
        }

        setGuesses((g) => [...g, { value: w, result: result.matches }]);
        reset();

        if (result.matches.every((m) => m === "yes")) {
          inputRef.current?.blur();
          setGameState("won");
          setDisabled(true);
          return;
        }

        if (guesses.length >= NUMBER_OF_ATTEMPTS - 1) {
          inputRef.current?.blur();
          setGameState("lost");
          setDisabled(true);
        }
      },
    },
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <Card
      className="p-3 focus:outline-none"
      onClick={() => {
        if (gameState === "playing") inputRef.current?.focus();
      }}
    >
      <h1 className="text-4xl font-bold">Guess the Word</h1>
      <section className="flex flex-col items-center gap-1 p-2">
        <input
          type="text"
          className="h-0 opacity-0"
          ref={inputRef}
          onChange={(e) => {
            e.preventDefault();
            e.target.value = "";
          }}
        />
        {Array.from({ length: NUMBER_OF_ATTEMPTS }, (_, i) => (
          <div
            key={i}
            className={
              alertingInvalidInput && i === guesses.length
                ? "animate-[wiggle_0.5s_ease-out]"
                : ""
            }
            onAnimationEnd={(e) => {
              if (e.animationName === "wiggle") {
                setAlertingInvalidInput(false);
              }
            }}
          >
            {i < guesses.length ? (
              <WordGuesserInput
                length={5}
                value={guesses[i].value}
                guessResult={guesses[i].result}
              />
            ) : i === guesses.length ? (
              <WordGuesserInput length={5} value={word} active />
            ) : (
              <WordGuesserInput length={5} />
            )}
          </div>
        ))}
      </section>
      <AlertDialog open={gameState !== "playing"}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {gameState === "lost" ? "You lost..." : "You won!"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {gameState === "lost"
                ? "You have used all your attempts. Refresh the page to play again."
                : "You guessed the word correctly. Come back tomorrow for a new word."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => shareGuessAttempts(guesses)}>
              Share
            </AlertDialogAction>
            <AlertDialogAction onClick={() => location.reload()}>
              Try Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <style jsx>{`
        @keyframes wiggle {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(5deg);
          }
          50% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </Card>
  );
}
