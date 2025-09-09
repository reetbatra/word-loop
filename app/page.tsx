export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 sm:p-20">
      <main className="flex flex-col items-center text-center gap-4 w-full">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">Wordle</h1>
        <p className="text-base sm:text-lg text-foreground/70 max-w-prose">
          Get 6 chances to guess a 5-letter word. Get 6 chances to guess a 5-letter word.
        </p>
      </main>
    </div>
  );
}
