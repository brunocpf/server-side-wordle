"use client";

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import { Card } from "@/components/ui/card";
import { DELETE_KEY, ENTER_KEY } from "@/hooks/use-guess-input";

const keyMap = {
  "{enter}": ENTER_KEY,
  "{bksp}": DELETE_KEY,
};

export function CustomKeyboard() {
  const handleKeyReleased = (button: string) => {
    const key =
      button in keyMap ? keyMap[button as keyof typeof keyMap] : button;

    const keyboardEvent = new KeyboardEvent("keyup", {
      key,
    });

    document.dispatchEvent(keyboardEvent);
  };

  return (
    <Card className="mt-3 flex bg-gray-100 p-1 dark:bg-zinc-900 dark:[&_.hg-button]:!border-black dark:[&_.hg-button]:!bg-zinc-600 dark:active:[&_.hg-button]:!bg-zinc-500 [&_.keyboard-theme]:bg-transparent">
      <div>
        <Keyboard
          theme={"hg-theme-default hg-layout-default keyboard-theme"}
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
          theme={"hg-theme-default hg-layout-default keyboard-theme"}
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