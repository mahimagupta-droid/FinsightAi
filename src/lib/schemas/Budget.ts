import { z } from "zod";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants";

export const CreateBudgetSchema = z.object({
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

export type BudgetFormValues = z.infer<typeof CreateBudgetSchema>;