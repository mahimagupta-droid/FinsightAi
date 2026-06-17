import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        const transactions = await prisma.transaction.findMany({
            where: {
                clerkId: userId,
                type: 'expense',
                date: { gte: threeMonthsAgo },
            },
            orderBy: { date: 'asc' },
        });

        // Group by description, then by month within each description
        const groupedByDescription: Record<string, { month: string; amount: number }[]> = {};

        transactions.forEach((t) => {
            const monthKey = `${t.date.getFullYear()}-${t.date.getMonth()}`;
            if (!groupedByDescription[t.description]) {
                groupedByDescription[t.description] = [];
            }
            groupedByDescription[t.description].push({ month: monthKey, amount: t.amount });
        });

        const recurringItems: { description: string; averageAmount: number; occurrences: number }[] = [];

        Object.entries(groupedByDescription).forEach(([description, entries]) => {
            const uniqueMonths = new Set(entries.map((e) => e.month));

            if (uniqueMonths.size >= 3) {
                const amounts = entries.map((e) => e.amount);
                const avg = amounts.reduce((sum, val) => sum + val, 0) / amounts.length;

                const allWithinTolerance = amounts.every((amt) => {
                    const diff = Math.abs(amt - avg) / avg;
                    return diff <= 0.2;
                });

                if (allWithinTolerance) {
                    recurringItems.push({
                        description,
                        averageAmount: avg,
                        occurrences: uniqueMonths.size,
                    });
                }
            }
        });

        return NextResponse.json({ success: true, recurring: recurringItems });
    } catch (error) {
        console.error("Error detecting recurring expenses:", error);
        return NextResponse.json({ error: "Failed to detect recurring expenses" }, { status: 500 });
    }
}