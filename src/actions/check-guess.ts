"use server";

import { getWordOfTheDay } from "@/lib/get-word-of-the-day";
import { isKnownWord } from "@/lib/is-known-word";
import { matchWord } from "@/lib/match-word";

export async function checkGuess(date: Date, guess: string) {
  if (guess.length !== 5 || !(await isKnownWord(guess))) {
    return {
      status: "invalid",
    } as const;
  }

  const wordOfTheDay = await getWordOfTheDay(5, date);

  const matches = matchWord(wordOfTheDay, guess);

  return {
    status: "valid",
    matches,
  } as const;
}
