import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Transaction from "@/lib/schemas/transanctions";

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await request.json();
        const { amount, type, category, description, date, paymentMethod, isEssential, isRecurring } = body;
        if (!amount || !type || !category || !description || !date || !paymentMethod || !isEssential || !isRecurring) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const response = await Transaction.create({
            clerkId: userId,
            amount: amount,
            type: type,
            category: category,
            description: description,
            date: date,
            paymentMethod: paymentMethod,
            isEssential: isEssential,
            isRecurring: isRecurring
        })
        return NextResponse.json({
            transaction: response,
            success: true,
            message: "Successful creation of transaction"
        }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const transactions = await Transaction.find({ clerkId: userId });
        if (!transactions) {
            return NextResponse.json(
                { error: "No transactions found" },
                { status: 404 }
            );
        }
        return NextResponse.json({
            transactions: transactions,
            success: true,
            message: "Successful retrieval of transactions"
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
