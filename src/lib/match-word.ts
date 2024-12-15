export type CharMatch = "no" | "yes" | "close";

export function matchWord(word: string, textToMatch: string) {
  const countPerCharacter = word
    .split("")
    .reduce<Record<string, number>>((acc, char) => {
      acc[char] = acc[char] ? acc[char] + 1 : 1;
      return acc;
    }, {});

  const matches: CharMatch[] = Array.from({ length: word.length }, (_, i) => {
    if (textToMatch[i] === word[i]) {
      countPerCharacter[textToMatch[i]] -= 1;
      return "yes";
    }

    if (
      word.includes(textToMatch[i]) &&
      countPerCharacter[textToMatch[i]] > 0
    ) {
      countPerCharacter[textToMatch[i]] -= 1;
      return "close";
    }

    return "no";
  });

  return matches;
}
