"use client";

import { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import { Card } from "@/components/ui/card";
import { DELETE_KEY, ENTER_KEY } from "@/hooks/use-guess-input";

const keyMap = {
  "{enter}": ENTER_KEY,
  "{bksp}": DELETE_KEY,
};

export function CustomKeyboard() {
  const [loading, setLoading] = useState(true);

  const handleKeyReleased = (button: string) => {
    const key =
      button in keyMap ? keyMap[button as keyof typeof keyMap] : button;

    const keyboardEvent = new KeyboardEvent("keyup", {
      key,
    });

    document.dispatchEvent(keyboardEvent);
  };

  return (
    <Card className="mt-3 flex w-96 max-w-[100vw] bg-gray-100 p-1 dark:bg-zinc-900 [&_.hg-button]:text-nowrap dark:[&_.hg-button]:!border-black dark:[&_.hg-button]:!bg-zinc-600 dark:active:[&_.hg-button]:!bg-zinc-500 [&_.hg-row:nth-child(2):not(&_.keyboard-theme-2_.hg-row)]:!px-2 [&_.hg-row:nth-child(3)]:!px-8 [&_.keyboard-theme]:bg-transparent">
      {loading && (
        <div className="absolute inset-0 grid place-items-center bg-gray-100 dark:bg-zinc-900">
          <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-t-2 border-zinc-400 dark:border-zinc-800" />
        </div>
      )}
      <div className="flex-1">
        <Keyboard
          onInit={() => setLoading(false)}
          theme="hg-theme-default hg-layout-default keyboard-theme"
          layout={{
            default: [
              "Q W E R T Y U I O P",
              "A S D F G H J K L",
              "Z X C V B N M",
            ],
          }}
          onKeyReleased={handleKeyReleased}
        />
      </div>
      <div>
        <Keyboard
          theme="hg-theme-default hg-layout-default keyboard-theme keyboard-theme-2"
          layout={{
            default: ["{bksp}", "{enter}"],
          }}
          display={{
            "{bksp}": "&emsp;⌫",
            "{enter}": "&emsp;↵",
          }}
          onKeyReleased={handleKeyReleased}
        />
      </div>
    </Card>
  );
}
