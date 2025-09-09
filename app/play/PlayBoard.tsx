"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type CellRef = HTMLInputElement | null;

const NUM_ROWS = 6;
const NUM_COLS = 5;

export type PlayBoardHandle = {
  pressLetter: (letter: string) => void;
  pressBackspace: () => void;
  pressEnter: () => void;
};

const PlayBoard = forwardRef<PlayBoardHandle>(function PlayBoard(_, ref) {
  const [grid, setGrid] = useState<string[][]>(() =>
    Array.from({ length: NUM_ROWS }, () => Array.from({ length: NUM_COLS }, () => ""))
  );
  const [cursor, setCursor] = useState<{ row: number; col: number }>({ row: 0, col: 0 });

  const cellRefs = useRef<CellRef[][]>(
    Array.from({ length: NUM_ROWS }, () => Array.from({ length: NUM_COLS }, () => null))
  );

  useEffect(() => {
    cellRefs.current[cursor.row][cursor.col]?.focus();
  }, [cursor]);

  const moveNext = (row: number, col: number) => {
    if (col + 1 < NUM_COLS) setCursor({ row, col: col + 1 });
    else if (row + 1 < NUM_ROWS) setCursor({ row: row + 1, col: 0 });
  };

  const movePrev = (row: number, col: number) => {
    if (col > 0) setCursor({ row, col: col - 1 });
    else if (row > 0) setCursor({ row: row - 1, col: NUM_COLS - 1 });
  };

  const pressLetter = (value: string) => {
    const letter = value.slice(-1).toUpperCase();
    if (!/^[A-Z]$/.test(letter)) return;
    setGrid(prev => {
      const next = prev.map(r => r.slice());
      next[cursor.row][cursor.col] = letter;
      return next;
    });
    moveNext(cursor.row, cursor.col);
  };

  const pressBackspace = () => {
    setGrid(prev => {
      const next = prev.map(r => r.slice());
      const { row, col } = cursor;
      if (next[row][col]) {
        next[row][col] = "";
      } else {
        const prevPos = col > 0 ? { row, col: col - 1 } : row > 0 ? { row: row - 1, col: NUM_COLS - 1 } : cursor;
        if (prevPos !== cursor) {
          setCursor(prevPos);
          next[prevPos.row][prevPos.col] = "";
        }
      }
      return next;
    });
  };

  const pressEnter = () => {
    // Placeholder for submit behavior; keeps API parity.
  };

  useImperativeHandle(ref, () => ({ pressLetter, pressBackspace, pressEnter }), [cursor]);

  const handleInputChange = (r: number, c: number, v: string) => {
    setCursor({ row: r, col: c });
    pressLetter(v);
  };

  const handleKeyDown = (r: number, c: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    setCursor({ row: r, col: c });
    if (e.key === "Backspace") {
      e.preventDefault();
      pressBackspace();
    }
  };

  return (
    <section id="play" className="mt-6 sm:mt-8">
      <div className="grid grid-rows-6 gap-0">
        {Array.from({ length: NUM_ROWS }).map((_, r) => (
          <div key={r} className="grid grid-cols-5 gap-0">
            {Array.from({ length: NUM_COLS }).map((_, c) => (
              <input
                key={`${r}-${c}`}
                ref={(el) => (cellRefs.current[r][c] = el)}
                inputMode="latin"
                pattern="[A-Za-z]"
                maxLength={1}
                value={grid[r][c]}
                onChange={(e) => handleInputChange(r, c, e.target.value)}
                onKeyDown={(e) => handleKeyDown(r, c, e)}
                className="h-9 w-9 sm:h-10 sm:w-10 text-center text-base sm:text-lg font-semibold uppercase tracking-normal rounded-none border border-foreground/15 bg-transparent focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
});

export default PlayBoard;


