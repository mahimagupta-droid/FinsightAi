import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/lib/dbConnect/dbConnections";
import User from "@/lib/schemas/user";
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    await dbConnect();
    const body = await request.json();
    const { email, name, age, monthlyIncome, savingsGoal } = body;
    if (!email || !name || !age || !monthlyIncome || !savingsGoal) {
      return new Response("Bad Request", { status: 400 });
    }
    const newUser = User.create({
      clerkId: userId,
      email,
      name,
      age,
      monthlyIncome,
      savingsGoal,
    });
    return NextResponse.json({
      message: "User profile created successfully",
      user: newUser,
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
