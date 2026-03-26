import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Transaction from "@/lib/schemas/Transanctions";
import { dbConnect } from "@/lib/dbConnect/dbConnections";

export async function POST(request: NextRequest) {
  try {
    dbConnect();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const {
      amount,
      type,
      category,
      description,
      date,
      paymentMethod,
      isEssential,
      isRecurring,
    } = body;
    if (
      amount == null || amount <= 0 ||
      !type || type === "select" ||
      !category || category === "select" ||
      !description ||
      !date ||
      !paymentMethod || paymentMethod === "select"
    ) {
      return NextResponse.json(
        { error: "All fields are required and must be valid" },
        { status: 400 },
      );
    }

    const response = await Transaction.create({
      clerkId: userId,
      amount: amount,
      type: type,
      category: category,
      description: description,
      date: date,
      paymentMethod: paymentMethod,
      isEssential: isEssential ?? false,
      isRecurring: isRecurring ?? false,
    });
    return NextResponse.json(
      {
        transaction: response,
        success: true,
        message: "Successful creation of transaction",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
     dbConnect();
    const transactions = await Transaction.find({ clerkId: userId });
    if (!transactions) {
      return NextResponse.json(
        { error: "No transactions found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        transactions: transactions,
        success: true,
        message: "Successful retrieval of transactions",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
