import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/lib/dbConnect/dbConnections";
import User from "@/lib/schemas/user";
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();
    const body = await request.json();
    if (!body) {
      return NextResponse.json({ success: false, message: "No data provided" }, { status: 400 });
    }
    const { email, name, age, monthlyIncome, savingsGoal } = body;
    if (!email || !name || !age || !monthlyIncome || !savingsGoal) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { email, name, age, monthlyIncome, savingsGoal },
      { new: true, upsert: true }
    );
    return NextResponse.json({
      message: "User profile created successfully",
      user: updatedUser,
      success: true,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating user profile",
      error: (error as Error).message,
      success: false,
    }, { status: 500 });
  }
}
