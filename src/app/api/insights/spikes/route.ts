import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const transactions = await prisma.transaction.findMany({
    where: {
      clerkId: userId,
      type: "expense",
      date: { gte: new Date(new Date().setMonth(new Date().getMonth() - 4)) },
    },
    orderBy: { date: "asc" },
  });
  const groupedByCategory: Record<string, Record<string, number>> = {};

  transactions.forEach((t) => {
    const monthKey = `${t.date.getFullYear()}-${t.date.getMonth()}`;
    if (!groupedByCategory[t.category]) {
      groupedByCategory[t.category] = {};
    }
    groupedByCategory[t.category][monthKey] =
      (groupedByCategory[t.category][monthKey] || 0) + t.amount;
  });
  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${now.getMonth()}`;

  const spikes: {
    category: string;
    currentSpend: number;
    average: number;
    percentageIncrease: number;
  }[] = [];

  Object.entries(groupedByCategory).forEach(([category, monthData]) => {
    const currentMonthSpend = monthData[currentMonthKey];

    // Skip if there's no spending this month in this category
    if (currentMonthSpend === undefined) return;

    // History = all months except the current one
    const historyValues = Object.entries(monthData)
      .filter(([month]) => month !== currentMonthKey)
      .map(([, amount]) => amount);

    // Need at least 3 months of history to calculate meaningful stats
    if (historyValues.length < 3) return;

    const mean =
      historyValues.reduce((sum, v) => sum + v, 0) / historyValues.length;
    const variance =
      historyValues.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) /
      historyValues.length;
    const stdDev = Math.sqrt(variance);

    const threshold = mean + 2 * stdDev;

    if (currentMonthSpend > threshold) {
      const percentageIncrease = Math.round(
        ((currentMonthSpend - mean) / mean) * 100,
      );
      spikes.push({
        category,
        currentSpend: currentMonthSpend,
        average: Math.round(mean),
        percentageIncrease,
      });
    }
  });

  return NextResponse.json({ success: true, spikes });
}
