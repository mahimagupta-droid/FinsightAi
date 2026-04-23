import { z } from "zod";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants";
import mongoose from "mongoose";

const BudgetZodFormat = z.object({
  clerkId: z.string(),
  category: z.union([z.enum(INCOME_CATEGORIES), z.enum(EXPENSE_CATEGORIES)]),
  monthlyLimit: z.number(),
  month: z.number().min(1).max(12),
  year: z.number(),
})

export type BudgetTypes = z.infer<typeof BudgetZodFormat>

const BudgetSchema = new mongoose.Schema<BudgetTypes>({
  clerkId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        if ((this as any).type === "expense") {
          return EXPENSE_CATEGORIES.includes(value);
        }
        if ((this as any).type === "income") {
          return INCOME_CATEGORIES.includes(value);
        }
        return false;
      },
      message: "Invalid category for selected type"
    }
  },
  monthlyLimit: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

BudgetSchema.index({ clerkId: 1, category: 1, month: 1, year: 1 }, { unique: true });

const Budget = mongoose.models.Budget || mongoose.model<BudgetTypes>("Budget", BudgetSchema);
export default Budget;