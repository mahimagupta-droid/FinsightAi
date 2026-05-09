"use client";
import { useState } from "react";
import SummaryCard from "@/components/summaryCard";
import CategoryBudgetList from "@/components/Budgets/CategoryBudgetList";
const MOCK_BUDGETS = [
    { id: "1", category: "Food", spent: 320, limit: 500, icon: "UtensilsCrossed", color: "#FF6384" },
    { id: "2", category: "Transport", spent: 180, limit: 200, icon: "Car", color: "#36A2EB" },
    { id: "3", category: "Shopping", spent: 450, limit: 400, icon: "ShoppingBag", color: "#FFCE56" },
    { id: "4", category: "Health", spent: 60, limit: 150, icon: "Heart", color: "#4BC0C0" },
];
const MOCK_INCOME = 100000;
export default function BudgetPage() {
    const [budgets, setBudgets] = useState(MOCK_BUDGETS);
    const totalExpenses = budgets.reduce((sum, items) => sum + items.spent, 0);
    const totalBudget = budgets.reduce((sum, items) => sum + items.limit, 0);
    return (
        <main className="w-screen">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[3rem] font-bold mb-3 mt-5">Budget Overview</h1>
                <div className="grid md:grid-cols-3 gap-6 mt-6 w-3/4">
                    <SummaryCard title="Total Expenses" amount={totalExpenses} type="expense" />
                    <SummaryCard title="Remaining" amount={MOCK_INCOME - totalExpenses} type="balance" />
                    <SummaryCard title="Total Income" amount={MOCK_INCOME} type="income" />
                </div>
                <div className="mt-5 mb-5 w-3/4">
                    <CategoryBudgetList budgets={budgets} />
                </div>

            </div>
        </main>
    );
}