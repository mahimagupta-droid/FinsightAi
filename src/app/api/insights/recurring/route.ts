import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getReccuringExpenses } from "../../../../lib/insights";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        const recurringItems = await getReccuringExpenses(userId, threeMonthsAgo);
        return NextResponse.json({ success: true, recurring: recurringItems });
    } catch (error) {
        console.error("Error detecting recurring expenses:", error);
        return NextResponse.json({ error: "Failed to detect recurring expenses" }, { status: 500 });
    }
}