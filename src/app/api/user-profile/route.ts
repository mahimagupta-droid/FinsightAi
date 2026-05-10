/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const reqBody = await request.json();
    const { email, name, age, monthlyIncome, savingsGoal } = reqBody;
    const createResponse = await prisma.user.create({
      data: {
        clerkId: userId,
        email: email,
        name: name,
        age: age,
        monthlyIncome: monthlyIncome,
        savingsGoal: savingsGoal,
      }
    });
    return NextResponse.json({
      message: "User created successfully",
      user: createResponse,
      success: true,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
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
    const userProfile = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      user: userProfile,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const deleteResponse = await prisma.user.delete({ where: { clerkId: userId } });
    if (!deleteResponse) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "User profile deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user profile" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const reqBody = await request.json();
    const { email, name, age, monthlyIncome, savingsGoal } = reqBody;
    const updatedUser = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        email: email,
        name: name,
        age: age,
        monthlyIncome: monthlyIncome,
        savingsGoal: savingsGoal,
      },
    });
    if (updatedUser) {
      return NextResponse.json({
        message: "User updated successfully",
        success: true,
        user: updatedUser,
      });
    } else {
      return NextResponse.json(
        {
          error: "User not found",
          success: false,
        },
        {
          status: 404,
        },
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
