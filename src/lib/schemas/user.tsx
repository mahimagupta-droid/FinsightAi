import mongoose from "mongoose";

export type UserTypes = {
    clerkId: string;
    email: string;
    name: string;
    age: number;
    monthlyIncome: number;
    savingsGoal: number;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema<UserTypes>({
    clerkId: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    monthlyIncome: {
        type: Number,
        default: 0,
    },
    savingsGoal: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<UserTypes>('User', UserSchema);
export default User;