import { WordGuesser } from "@/components/word-guesser";

async function isKnownWord(word: string) {
  return ["hello", "world"].includes(word.toLowerCase());
}

async function getWordOfTheDay() {
  return "hello";
}

export default async function Home() {
  async function checkGuess(guess: string) {
    "use server";

    if (guess.length !== 5 || !(await isKnownWord(guess))) {
      return {
        status: "invalid",
      } as const;
    }

    const wordOfTheDay = await getWordOfTheDay();

    type CharacterMatch = "no" | "yes" | "close";
    const matches: [
      CharacterMatch,
      CharacterMatch,
      CharacterMatch,
      CharacterMatch,
      CharacterMatch,
    ] = ["no", "no", "no", "no", "no"];

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === wordOfTheDay[i]) {
        matches[i] = "yes";
      }

      if (wordOfTheDay.includes(guess[i])) {
        matches[i] = "close";
      }
    }

    return {
      status: "valid",
      matches,
    } as const;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <WordGuesser checkGuess={checkGuess} />
      </main>
    </div>
  );
}
