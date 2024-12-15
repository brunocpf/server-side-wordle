import { CharMatch } from "./match-word";

const emojis = {
  yes: "🟩",
  close: "🟨",
  no: "🟥",
} as const;

export async function shareGuessAttempts(
  guesses: { value: string; result: CharMatch[] }[],
) {
  const wasSuccessful = guesses[guesses.length - 1].result.every(
    (m) => m === "yes",
  );

  const formattedGuesses = guesses.map((g) =>
    g.result.map((m) => emojis[m]).join(" "),
  );

  const guessesText = formattedGuesses.join("\n");

  const shareText = `I ${
    wasSuccessful ? "won" : "lost"
  } the word of the day challenge! Here are my guesses: \n${guessesText}`;

  if (!navigator.canShare()) {
    await navigator.clipboard.writeText(shareText);
    alert("Copied to clipboard!");
    return;
  }

  navigator.share({
    title: "Word of the day game",
    text: shareText,
    url: window.location.href,
  });
}
