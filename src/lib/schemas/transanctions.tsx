import mongoose from "mongoose";

export type TransactionTypes = {
  clerkId: string;        
  amount: number;         
  type: 'income' | 'expense';  
  category: string;     
  description: string;    
  date: Date;          
  paymentMethod?: string; 
  isEssential: boolean;  
  isRecurring: boolean;  
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new mongoose.Schema<TransactionTypes>({
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
    enum: [
      'food', 'transport', 'shopping', 'entertainment', 
      'utilities', 'healthcare', 'education', 'rent',
      'subscriptions', 'other_expense',
      'salary', 'freelance', 'business', 'investment', 'other_income'
    ],
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

const Transaction = mongoose.models.Transaction || 
  mongoose.model<TransactionTypes>('Transaction', TransactionSchema);

export default Transaction;