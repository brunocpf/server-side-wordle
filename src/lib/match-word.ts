export type CharMatch = "no" | "yes" | "close";

export function matchWord(word: string, textToMatch: string) {
  word = word.toLowerCase();
  textToMatch = textToMatch.toLowerCase();
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

    return "no";
  });

  for (let i = 0; i < word.length; i++) {
    if (
      matches[i] === "no" &&
      word.includes(textToMatch[i]) &&
      countPerCharacter[textToMatch[i]] > 0
    ) {
      countPerCharacter[textToMatch[i]] -= 1;
      matches[i] = "close";
    }
  }

  return matches;
}
