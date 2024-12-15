import { getKnownWords } from "@/lib/get-known-words";

export async function isKnownWord(word: string) {
  const allWords = await getKnownWords(word.length);
  return allWords.includes(word.toLowerCase());
}
