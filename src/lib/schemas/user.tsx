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