import "server-only";

export async function getKnownWords(length: number) {
  const response = await fetch(
    "https://raw.githubusercontent.com/RazorSh4rk/random-word-api/refs/heads/master/words.json",
  );
  const data = (await response.json()) as string[];

  return data.filter((word) => word.length === length);
}
