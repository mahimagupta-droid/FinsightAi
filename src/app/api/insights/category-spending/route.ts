import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const startParam = searchParams.get("start");
        const endParam = searchParams.get("end");

        const now = new Date();
        const start = startParam ? new Date(startParam) : new Date(now.getFullYear(), now.getMonth(), 1);
        const end = endParam ? new Date(endParam) : new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const result = await prisma.transaction.groupBy({
            by: ['category'],
            where: {
                clerkId: userId,
                type: 'expense',
                date: { gte: start, lte: end },
            },
            _sum: { amount: true },
        });

        const formatted = result.map((item) => ({
            category: item.category,
            total: item._sum.amount ?? 0,
        }));

        return NextResponse.json({ success: true, data: formatted });
    } catch (error) {
        console.error("Error fetching category spending:", error);
        return NextResponse.json({ error: "Failed to fetch category spending" }, { status: 500 });
    }
}