"use client";

type KeyProps = {
  label: string;
  onPress: () => void;
  wide?: boolean;
};

function Key({ label, onPress, wide }: KeyProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className={`select-none rounded-md bg-foreground/15 text-foreground px-2 sm:px-3 py-2 text-sm font-semibold transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${wide ? "col-span-2" : ""}`}
      aria-label={label}
    >
      {label}
    </button>
  );
}

type KeyboardProps = {
  onLetter: (ch: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
};

export default function Keyboard({ onLetter, onEnter, onBackspace }: KeyboardProps) {
  const row1 = ["Q","W","E","R","T","Y","U","I","O","P"];
  const row2 = ["A","S","D","F","G","H","J","K","L"];
  const row3 = ["Z","X","C","V","B","N","M"];

  return (
    <div className="mt-8 sm:mt-10 w-full max-w-screen-md mx-auto">
      <div className="grid grid-cols-10 gap-1 sm:gap-2">
        {row1.map(k => (
          <Key key={k} label={k} onPress={() => onLetter(k)} />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-9 gap-1 sm:gap-2">
        {row2.map(k => (
          <Key key={k} label={k} onPress={() => onLetter(k)} />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-10 gap-1 sm:gap-2 items-center">
        <Key label="ENTER" onPress={onEnter} wide />
        {row3.map(k => (
          <Key key={k} label={k} onPress={() => onLetter(k)} />
        ))}
        <Key label="⌫" onPress={onBackspace} />
      </div>
    </div>
  );
}


