import { getKnownWords } from "@/lib/get-known-words";

export async function getWordOfTheDay(length: number, date: Date) {
  const knownWords = await getKnownWords(length);

  const year = date.getFullYear() % 100;
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let hash = day;
  hash = (hash ^ (month * 31)) >>> 0;
  hash = (hash ^ (year * 101)) >>> 0;
  hash = (hash * 2654435761) >>> 0;

  // Normalize the hash to a value between 0 and 1
  const normalized = hash / 0xffffffff; // 0xFFFFFFFF = max 32-bit unsigned integer

  const index = Math.floor(normalized * (knownWords.length + 1));

  return knownWords[index];
}
