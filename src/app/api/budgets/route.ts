import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { dbConnect } from "@/lib/dbConnect/dbConnections";
import Budget from "@/lib/schemas/Budget";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../../lib/constants";

const CreateBudgetSchema = z.object({
  category: z.union([
    z.enum(EXPENSE_CATEGORIES as [string, ...string[]]),
    z.enum(INCOME_CATEGORIES as [string, ...string[]]),
  ]),
  monthlyLimit: z
    .number({ message: "Monthly limit must be a number" })
    .positive("Monthly limit must be greater than zero"),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2000),
});

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const budgets = await Budget.find({ clerkId: userId, month, year });
  return NextResponse.json(budgets, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();
  const body = await req.json();
  const result = CreateBudgetSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const { category, monthlyLimit, month, year } = result.data;
  const budget = await Budget.findOneAndUpdate(
    { clerkId: userId, category, month, year }, // WHO + WHAT + WHEN
    { $set: { monthlyLimit } },                  // only update the limit
    { upsert: true, new: true, runValidators: true }
  );
  return NextResponse.json(budget, { status: 200 });
}