import { words } from "@/lib/words";

export async function GET() {
  // Fixed start date: day 0 of your game
  const startDate = new Date("2025-09-08"); 

  const now = new Date();
  const todayUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSince = Math.floor((todayUTC - startDate) / msPerDay);

  const index = daysSince % words.length;
  const todaysWord = words[index];

  return Response.json({ word: todaysWord, index });
}
