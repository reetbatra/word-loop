"use client";

import { useRef, useState, useEffect } from "react";
import PlayBoard, { PlayBoardHandle } from "./play/PlayBoard";
import Keyboard from "./play/Keyboard";

export default function Home() {
  const boardRef = useRef<PlayBoardHandle>(null);

  // state to hold the word
  const [word, setWord] = useState<string | null>(null);

  // fetch the word from API when the component loads
  useEffect(() => {
    async function fetchWord() {
      try {
        const res = await fetch("/api/word", { cache: "no-store" });
        const data = await res.json();
        setWord(data.word);
      } catch (error) {
        console.error("Error fetching word:", error);
      }
    }
    fetchWord();
  }, []);

  return (
    <div className="font-sans min-h-screen px-4 py-8 sm:px-6 sm:py-16">
      <main className="mx-auto w-full max-w-screen-md flex flex-col items-center text-center gap-4">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Word Loop</h1>
        <p className="text-base sm:text-lg text-foreground/70 max-w-prose px-2">
          Get 6 chances to guess a 5-letter word. Get 6 chances to guess a 5-letter word.
        </p>

        {/* Only show when loaded */}
        {word ? (
          <p className="mt-4">Today's word is: {word}</p>
        ) : (
          <p className="mt-4 text-gray-500">Loading word...</p>
        )}

        <a
          href="#play"
          className="group mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-base font-semibold shadow-sm transition hover:bg-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground w-full sm:w-auto"
        >
          <span>Play</span>
        </a>

        {/* Play area */}
        <div className="w-full" id="play">
          <PlayBoard ref={boardRef} />
        </div>
        <Keyboard
          onLetter={(ch) => boardRef.current?.pressLetter(ch)}
          onEnter={() => boardRef.current?.pressEnter()}
          onBackspace={() => boardRef.current?.pressBackspace()}
        />
      </main>
    </div>
  );
}
