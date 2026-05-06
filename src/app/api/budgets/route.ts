import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../../lib/constants";
import prisma from "@/lib/prisma";

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
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const budgets = await prisma.budget.findMany({
    where: {
      clerkId: userId,
      month,
      year,
    },
  });
  return NextResponse.json(budgets, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const result = CreateBudgetSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const { category, monthlyLimit, month, year } = result.data;
  const budget = await prisma.budget.upsert({
    where: {
      clerkId_category_month_year: {
        clerkId: userId,
        category,
        month,
        year,
      },
    },
    update: {
      monthlyLimit,
      category,
      month,
      year,
    },
    create: {
      clerkId: userId,
      category,
      monthlyLimit,
      month,
      year,
    },
  });
  return NextResponse.json(budget, { status: 200 });
}