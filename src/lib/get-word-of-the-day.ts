import { getKnownWords } from "@/lib/get-known-words";

export async function getWordOfTheDay(length: number, day: Date) {
  const knownWords = await getKnownWords(length);

  const dateStr = day.toISOString().split("T")[0];

  const hash = Array.from(dateStr).reduce((curr, acc) => {
    return (curr * 31 + acc.charCodeAt(0)) % 1_000_000;
  }, 0);

  const normalized = hash / 1_000_000;
  const index = Math.floor(normalized * knownWords.length);

  return knownWords[index];
}
