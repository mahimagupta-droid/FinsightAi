import { z } from "zod";
import mongoose from "mongoose";

const UserZodFormat = z.object({
    clerkId: z.string(),
    email: z.string(),
    name: z.string(),
    age: z.number(),
    monthlyIncome: z.number(),
    savingsGoal: z.number(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export type UserTypes = z.infer<typeof UserZodFormat>;

const UserSchema = new mongoose.Schema<UserTypes>({
    clerkId: {
        type: String,
        unique: true,
        required: true,
        index: true,
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
    monthlyIncome: {
        type: Number,
        default: 0,
        required: true,
    },
    savingsGoal: {
        type: Number,
        default: 0,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<UserTypes>('User', UserSchema);
export default User;