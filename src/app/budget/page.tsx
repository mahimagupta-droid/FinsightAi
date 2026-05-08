"use client";
import { useState } from "react";
import SummaryCard from "@/components/summaryCard";
import CategoryBudgetList from "@/components/Budgets/CategoryBudgetList";
const MOCK_BUDGETS = [
    { id: "1", category: "Food", spent: 320, limit: 500, icon: "UtensilsCrossed" },
    { id: "2", category: "Transport", spent: 180, limit: 200, icon: "Car" },
    { id: "3", category: "Shopping", spent: 450, limit: 400, icon: "ShoppingBag" },
    { id: "4", category: "Health", spent: 60, limit: 150, icon: "Heart" },
];
const MOCK_INCOME = 100000;
export default function BudgetPage() {
    const [budget, setBudget] = useState(MOCK_BUDGETS);
    const totalExpenses = budget.reduce((sum, budget) => sum + budget.spent, 0);
    const totalBudget = budget.reduce((sum, budget) => sum + budget.limit, 0);
    function getProgressBar({ percentage }: { percentage: number }) {
        return (
            <div className="w-full h-2 rounded-full bg-white/10">
                <div
                    className="h-2 rounded-full bg-green-400 transition-all duration-500"
                    style={{ width: `${percentage}%` }}>
                </div>
            </div>
        )
    }
    const percentage = Math.min((totalExpenses / totalBudget) * 100, 100);
    const getBarColor = () => {
        if (percentage >= 100) return "bg-red-500";
        if (percentage >= 75) return "bg-yellow-500";
        return "bg-green-500";
    }
    return (
        <main>
            <h1>Budget Overview</h1>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
                <SummaryCard title="Total Expenses" amount={totalExpenses} type="expense" icon={<div></div>} />
                <SummaryCard title="Remaining" amount={MOCK_INCOME - totalExpenses} type="balance" icon={<div></div>} />
                <SummaryCard title="Total Income" amount={MOCK_INCOME} type="income" icon={<div></div>} />
            </div>
            <CategoryBudgetList budgets={budget} />
        </main>
    );
}