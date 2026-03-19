import mongoose from 'mongoose';

type TransactionSchemaTypes = {
  clerkId: string;
  email: string;
  name: string;
  age: number;
  employmentStatus: "Employed" | "Unemployed" | "Student" | "Retired";
  pocketMoney?: number;
  income?: number;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new mongoose.Schema<TransactionSchemaTypes>({
  clerkId: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  employmentStatus: {
    type: String,
    enum: ["Employed", "Unemployed", "Student", "Retired"],
    required: true,
  },
  pocketMoney: {
    type: Number,
  },
  income: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
},
  { timestamps: true }
);

const Transaction = mongoose.models.Transaction || mongoose.model<TransactionSchemaTypes>('Transactions', TransactionSchema);
export default Transaction;