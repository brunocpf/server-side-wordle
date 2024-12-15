import { CharMatch } from "@/lib/match-word";

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

  const shareData: ShareData = {
    title: "Word of the day game",
    text: `I ${
      wasSuccessful ? "won" : "lost"
    } the word of the day challenge! Here are my guesses: \n${guessesText}`,
    url: window.location.href,
  } as const;

  if (!navigator.canShare(shareData)) {
    await navigator.clipboard.writeText(shareData.text ?? "");
    alert("Copied to clipboard!");
    return;
  }

  navigator.share(shareData);
}
