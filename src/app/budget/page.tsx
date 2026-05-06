"use client";
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import DashboardCard from "@/components/dashboardCard";
import { Car, Film, Pill, Tv, Utensils, Zap } from "lucide-react";
import { ShoppingBag } from "lucide-react";

const CATEGORIES = [
    { name: "Food & Dining", icon: Utensils, color: "#00d4ff", spent: 6200, budget: 8000 },
    { name: "Transport", icon: Car, color: "#4ade80", spent: 2100, budget: 3000 },
    { name: "Entertainment", icon: Film, color: "#a78bfa", spent: 3400, budget: 2500 },
    { name: "Shopping", icon: ShoppingBag, color: "#f59e0b", spent: 7800, budget: 10000 },
    { name: "Health", icon: Pill, color: "#34d399", spent: 1200, budget: 4000 },
    { name: "Utilities", icon: Zap, color: "#60a5fa", spent: 2640, budget: 3000 },
    { name: "Subscriptions", icon: Tv, color: "#f87171", spent: 4000, budget: 3500 },
];

const BudgetPage = () => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await fetch("/api/transactions");
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.transactions) {
                    setTransactions(data.transactions);
                } else {
                    console.error("Failed to fetch transactions");
                }
            } else {
                console.error("Failed to fetch transactions");
            }
        }
        fetchTransactions();
    }, [])

    const totalIncome = transactions.filter((transaction: any) => transaction.type == "income").reduce((total: any, currentTransaction: any) => total + currentTransaction.amount, 0);
    const totalExpenses = transactions.filter((transaction: any) => transaction.type == "expense").reduce((total: any, currentTransaction: any) => total + currentTransaction.amount, 0);
    const balance = totalIncome - totalExpenses;

    function getBarClass(pct: number) {
        if (pct >= 100) return "bar-over";
        if (pct >= 80) return "bar-warn";
        return "bar-safe";
    }

    function getSpentColor(pct: number) {
        if (pct >= 100) return "#f87171";
        if (pct >= 80) return "#fbbf24";
        return "rgba(255,255,255,0.85)";
    }
    return (
        <div className="budget-wrap w-[75vw] p-5 mb-5">
            <div className="blob blob1" />
            <div className="blob blob2" />
            <div className="blob blob3" />

            <div className="budget-page mt-10">
                <div className="budget-header">
                    <h2 className="flex flex-col items-center justify-center mb-4 text-[var(--textColor)] font-bold  text-4xl">Budget Planner</h2>
                    <p className="opacity-75">Set monthly limits per category and track how your spending measures up.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 mb-5">
                    <DashboardCard title="Total Income" amount={totalIncome} type="income" />
                    <DashboardCard title="Total Expenses" amount={totalExpenses} type="expense" />
                    <DashboardCard title="Balance" amount={balance} type="balance" />
                </div>

                <div className="budget-main-grid font-lato">
                    <div className="budget-left-col glass">
                        <div className="b-main">
                            <div className="glass" style={{ padding: "1.5rem" }}>
                                <div className="b-sec-title">Category Budgets</div>
                                <div className="b-cat-list">
                                    {CATEGORIES.map((c) => {
                                        const pct = Math.min((c.spent / c.budget) * 100, 100);
                                        const Icon = c.icon;
                                        return (
                                            <div key={c.name} className="b-cat-item">
                                                <div
                                                    className="b-cat-icon"
                                                    style={{ background: `${c.color}14`, border: `1px solid ${c.color}22` }}
                                                >
                                                    <Icon size={20} />
                                                </div>
                                                <div className="b-cat-info">
                                                    <div className="b-cat-name">{c.name}</div>
                                                    <div className="b-bar-bg">
                                                        <div
                                                            className={`b-bar ${getBarClass(pct)}`}
                                                            style={{ width: `${pct.toFixed(0)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="b-cat-right">
                                                    <div className="b-cat-spent" style={{ color: getSpentColor(pct) }}>
                                                        ₹{c.spent.toLocaleString()}
                                                    </div>
                                                    <div className="b-cat-limit">of ₹{c.budget.toLocaleString()}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <button className="b-add-cat">+ Add Category</button>
                            </div>
                        </div>

                        {/* Right column — overview ring + form */}
                        <div className="budget-right-col">

                            <div className="glass">
                                {/* MonthlyOverview (ring + mini stats) goes here */}
                            </div>

                            <div className="glass">
                                {/* BudgetForm goes here */}
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default BudgetPage;
