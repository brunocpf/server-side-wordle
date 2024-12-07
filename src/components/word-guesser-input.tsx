"use client";

export interface WordGuesserInputProps {
  length: number;
  word: string;
}

export function WordGuesserInput({ length, word }: WordGuesserInputProps) {
  return (
    <form className="flex gap-2">
      {Array.from({ length }, (_, i) => (
        <div key={i}>
          <div
            className={`dark:bg-zinc-400 dark:border-zinc-100 bg-zinc-100 border-zinc-400 w-10 h-10 grid place-items-center rounded-md border-2 ${word[i] ? "animate-[scale_0.5s_ease-in-out]" : ""}`}
          >
            {word[i]}
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes scale {
          50% {
            transform: scale(1.25);
          }
        }
      `}</style>
    </form>
  );
}
