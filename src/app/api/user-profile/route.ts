import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/lib/dbConnect/dbConnections";
import User from "@/lib/schemas/user";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    await dbConnect();
    const body = await request.json();
    if (!body) {
      return NextResponse.json(
        { success: false, message: "No data provided" },
        { status: 400 },
      );
    }
    const { email, name, age, monthlyIncome, savingsGoal } = body;
    if (
      !email ||
      !name ||
      age === undefined ||
      monthlyIncome === undefined ||
      savingsGoal === undefined
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }
    const createdUser = await User.create({
      clerkId: userId,
      email: email,
      name: name,
      age: age,
      monthlyIncome: monthlyIncome,
      savingsGoal: savingsGoal
    });
    return NextResponse.json({
      message: "User profile created successfully",
      user: createdUser,
      success: true,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating user profile",
        error: (error as Error).message,
        success: false,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    await dbConnect();
    const userProfile = await User.findOne({ clerkId: userId });
    if (userProfile) {
      return NextResponse.json({
        message: "User profile fetched successfully",
        user: userProfile,
        success: true,
      });
    } else {
      return NextResponse.json(
        {
          message: "User profile not found",
          success: false,
        },
        { status: 404 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching user profile",
        error: (error as Error).message,
        success: false,
      },
      { status: 500 },
    );
  }
}
