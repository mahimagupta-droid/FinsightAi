"use client";
import { useState, useEffect } from "react";
import SummaryCard from "@/components/summaryCard";
import CategoryBudgetList from "@/components/Budgets/CategoryBudgetList";
import CreateBudgetForm from "@/components/Budgets/CreateBudgetForm";
import DonutChart from "@/components/Budgets/DonutChart";
import { Budget } from "@/lib/types/budget";

export default function BudgetPage() {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const totalExpenses = budgets.reduce((sum, items) => sum + items.spent, 0);
    const totalBudget = budgets.reduce((sum, items) => sum + items.monthlyLimit, 0);
    const fetchBudgets = async () => {
        const [budgetsRes, transactionsRes] = await Promise.all([
            fetch("/api/budgets"),
            fetch("/api/transactions"),
        ]);
        const budgetsData = await budgetsRes.json();
        const { transactions } = await transactionsRes.json();
        const now = new Date();
        const spentByCategory: Record<string, number> = {};
        transactions.forEach((t: any) => {
            const tDate = new Date(t.date);
            if (t.type === "expense"
                && tDate.getMonth() === now.getMonth()
                && tDate.getFullYear() === now.getFullYear()) {
                spentByCategory[t.category] =
                    (spentByCategory[t.category] ?? 0) + t.amount;
            }
        });

        const mapped = budgetsData.map((b: any) => ({
            ...b,
            monthlyLimit: Number(b.monthlyLimit),
            spent: spentByCategory[b.category] ?? 0,
        }));
        setBudgets(mapped);
    };
    useEffect(() => {
        fetchBudgets();
    }, []);

    return (
        <main className="w-full">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[3rem] font-bold mb-3 mt-5">Budget Overview</h1>
                <div className="grid md:grid-cols-3 gap-6 mt-6 w-3/4">
                    <SummaryCard title="Total Expenses" amount={totalExpenses} type="expense" />
                    <SummaryCard title="Remaining" amount={totalBudget - totalExpenses} type="balance" />
                    <SummaryCard title="Total Income" amount={totalBudget} type="income" />
                </div>
                <div className="mt-[2rem] w-3/4 grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                        <CategoryBudgetList budgets={budgets} />
                    </div>
                    <div className="flex flex-col items-center gap-4 col-span-1">
                        <DonutChart budgets={budgets} />
                        <CreateBudgetForm onSuccess={fetchBudgets} />
                    </div>
                </div>
            </div>
        </main >
    );
}