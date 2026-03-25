import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect/dbConnections";
import User from "@/lib/schemas/user";
import Transaction from "@/lib/schemas/transanctions";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();
    const userProfile = await User.findOne({ clerkId: userId });
    if (!userProfile) {
      return NextResponse.json(
        { error: "User profile not found. Create profile before adding transactions." },
        { status: 403 },
      );
    }
    const body = await request.json();
    const { amount, type, category, description, date, paymentMethod, isEssential, isRecurring } = body;
    if ( !amount || !type || !category || !description || !date || !paymentMethod ) {
      return NextResponse.json(
        { error: "All fields are required" },
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
