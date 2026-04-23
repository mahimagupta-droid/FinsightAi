/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants";
import { z } from "zod";

const TransactionZodFormat = z.object({
  clerkId: z.string(),
  amount: z.number(),
  type: z.enum(['income', 'expense']),
  category: z.union([z.enum(INCOME_CATEGORIES), z.enum(EXPENSE_CATEGORIES)]),
  description: z.string(),
  date: z.date(),
  paymentMethod: z.enum(['cash', 'card', 'upi', 'bank_transfer', 'other']),
  isEssential: z.boolean().optional(),
  isRecurring: z.boolean().optional(),
})

type TransactionType = z.infer<typeof TransactionZodFormat>

const TransactionSchema = new mongoose.Schema<TransactionType>({
  clerkId: {
    type: String,
    required: true,
    index: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01,
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense'],
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
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'bank_transfer', 'other'],
  },
  isEssential: {
    type: Boolean,
    default: false,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

TransactionSchema.index({ clerkId: 1, date: -1 });

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
export default Transaction;