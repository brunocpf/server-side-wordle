import { useCallback, useEffect, useState } from "react";

interface UseWordInputProps {
  length: number;
  onEnter?: (word: string) => void;
  onWordOverflow?: (word: string) => void;
}

export const DELETE_KEY = "<DELETE>";
export const ENTER_KEY = "<ENTER>";

export function useWordInput({
  length,
  onEnter,
  onWordOverflow,
}: UseWordInputProps) {
  const [word, setWord] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [backspacePressed, setBackspacePressed] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    const timeoutId = setTimeout(() => {
      if (backspacePressed) {
        intervalId = setInterval(() => {
          if (backspacePressed) {
            setWord((text) => text.slice(0, -1));
          }
        }, 100);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [backspacePressed]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) return;

      if (event.key === "Backspace") {
        setWord((text) => text.slice(0, -1));
        setBackspacePressed(true);
      }
    },
    [disabled],
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) return;

      if (event.key === DELETE_KEY) {
        setWord((text) => text.slice(0, -1));
      }

      if (event.key.toLowerCase() === "backspace") {
        setBackspacePressed(false);
      }

      if (event.key.toLowerCase() === "enter" || event.key === ENTER_KEY) {
        onEnter?.(word);
      }

      if (
        [..."abcdefghijklmnopqrstuvwxyz"].includes(
          event.key.toLocaleLowerCase(),
        )
      ) {
        if (word.length >= length) {
          onWordOverflow?.(word);
          return;
        }

        setWord((text) => text + event.key);
      }

      if (event.key === "Escape") {
        setWord("");
      }

      if (event.key === " ") {
        event.preventDefault();
      }

      if (event.key === "Tab") {
        event.preventDefault();
      }
    },
    [disabled, length, onEnter, onWordOverflow, word],
  );

  const reset = useCallback(() => {
    setWord("");
  }, []);

  return {
    word,
    reset,
    setDisabled,
    handleKeyDown,
    handleKeyUp,
  };
}
