import { dbConnect } from "@/lib/dbConnect/dbConnections";
import User from "@/lib/schemas/user";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" }, 
      { status: 401 }
    );
  }
   dbConnect();
    const reqBody = await request.json();
    const { email, name, age, monthlyIncome, savingsGoal } = reqBody;
    const createResponse = await User.create({
      clerkId: userId,
      email: email,
      name: name,
      age: age,
      monthlyIncome: monthlyIncome,
      savingsGoal: savingsGoal
    })
    return NextResponse.json({
      message: "User created successfully",
      user: createResponse,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
  }

