import { checkGuess } from "@/actions/check-guess";
import { WordGuesser } from "@/components/word-guesser";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ date?: string | string[] }>;
}) {
  const { date: dateParam } = await searchParams;

  async function checkGuessToday(guess: string) {
    "use server";
    let date = dateParam ? new Date(dateParam.toString()) : new Date();

    if (isNaN(date.getTime())) {
      date = new Date();
    }

    return checkGuess(date, guess);
  }

  return (
    <div className="grid h-screen place-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex touch-manipulation flex-col items-center justify-center gap-4">
        <WordGuesser checkGuess={checkGuessToday} />
      </main>
    </div>
  );
}
