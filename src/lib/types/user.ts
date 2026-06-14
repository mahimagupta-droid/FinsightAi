export type UserTypes = {
    clerkId: string;
    email: string;
    name: string;
    age?: number | null;
    monthlyIncome?: number | null;
    savingsGoal?: number | null;
    onboarded: boolean;
    createdAt: Date;
    updatedAt: Date;
}