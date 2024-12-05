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
            key={word[i]}
            className="bg-red-200 w-10 h-10 animate-[scale_0.5s_ease-in-out] grid place-items-center rounded-md border-2 border-red-400"
          >
            {word[i]}
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes scale {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.25);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </form>
  );
}
