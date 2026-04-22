/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DashboardCard from "@/components/dashboardCard";
import { useEffect, useState } from "react";
import LineChart from "@/components/charts/line";
import { PieChart } from "@/components/charts/pie";
import { BarChart } from "@/components/charts/bar";

export default function Dashboard() {
    const [transactions, setTransactions] = useState([]);
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

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTransactions();
    }, [])

    useEffect(() => {
        // console.log("Transactions updated:", transactions);
    }, [transactions])

    const totalIncome = transactions.filter((transaction: any) => transaction.type == "income").reduce((total: any, currentTransaction: any) => total + currentTransaction.amount, 0);
    const totalExpenses = transactions.filter((transaction: any) => transaction.type == "expense").reduce((total: any, currentTransaction: any) => total + currentTransaction.amount, 0);
    const balance = totalIncome - totalExpenses;
    const expenses = transactions.filter((transaction: any) => transaction.type == "expense")

    //line chart 
    const groupedExpenses = expenses.reduce((acc: any, curr: any) => {
        const date = new Date(curr.date).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = curr.amount;
        } else {
            acc[date] += curr.amount;
        }
        return acc;
    }, {})
    const sortedDates = Object.keys(groupedExpenses).sort();
    const labelOnAxis = sortedDates;
    const amountOnAxis = sortedDates.map((date: string) => groupedExpenses[date]);
    const expenseChartData = {
        labels: labelOnAxis,
        datasets: [
            {
                label: "Expenses",
                data: amountOnAxis,
                borderColor: "var(--danger)",
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                pointBackgroundColor: "var(--danger)",
                pointBorderColor: "#fff",
                borderWidth: 2,
                tension: 0.4,
            }
        ]
    }

    //pie chart
    const groupedByCategory = expenses.reduce((acc: any, curr: any) => {
        const category = curr.category;
        if (!acc[category]) {
            acc[category] = curr.amount;
        } else {
            acc[category] += curr.amount;
        }
        return acc;
    }, {})
    const pieLabels = Object.keys(groupedByCategory);
    const pieAmounts = Object.values(groupedByCategory);
    const pieChartData = {
        labels: pieLabels,
        datasets: [
            {
                label: "Expenses",
                data: pieAmounts,
                backgroundColor: [
                    "#67c7ff",
                    "#9dceff",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#a78bfa",
                    "#22d3ee"
                ],
                borderColor: "var(--background)",
                borderWidth: 2,
            }
        ]
    }

    //bar chart
    const groupedByMonth = transactions.reduce((acc: any, curr: any) => {
        const month = new Date(curr.date).toLocaleDateString("default", {
            month: "short",
        });

        if (!acc[month]) {
            acc[month] = { income: 0, expense: 0 };
        }

        if (curr.type === "income") {
            acc[month].income += curr.amount;
        } else {
            acc[month].expense += curr.amount;
        }

        return acc;
    }, {});
    const sortedMonths = Object.keys(groupedByMonth);
    const incomeData = sortedMonths.map(
        (month) => groupedByMonth[month].income
    );

    const expenseData = sortedMonths.map(
        (month) => groupedByMonth[month].expense
    );
    const barChartData = {
        labels: sortedMonths,
        datasets: [
            {
                label: "Income",
                data: incomeData,
                backgroundColor: "rgba(16, 185, 129, 0.8)", // green
                borderRadius: 8,
            },
            {
                label: "Expenses",
                data: expenseData,
                backgroundColor: "rgba(239, 68, 68, 0.8)", // red
                borderRadius: 8,
            },
        ],
    };

    return (
        <div className="flex flex-col gap-10 mb-20">
            <div className="flex flex-col gap-4 mt-10 mb-5">
                <div className="flex justify-center items-center">
                    <h2 className="text-[var(--textColor)] text-3xl font-bold ">
                        Transactions Overview
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-xl">
                    <DashboardCard title="Total Income" amount={totalIncome} type="income" />
                    <DashboardCard title="Total Expenses" amount={totalExpenses} type="expense" />
                    <DashboardCard title="Balance" amount={balance} type="balance" />
                </div>
            </div>
            <div className="flex flex-col justify-between items-center">
                <h2 className="text-[var(--textColor)] text-3xl font-bold">
                    SpendWise Dashboard
                </h2>
                <h3 className="text-[var(--accent)] text-lg">
                    Track your spending patterns and financial health
                </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-card border border-border p-6 rounded-xl w-full h-[625px] transition-colors duration-300">
                    <PieChart data={pieChartData} />
                </div>
                <div className="flex flex-col gap-6">
                    <div className="bg-card border border-border p-6 rounded-xl h-[300px] transition-colors duration-300">
                        <LineChart data={expenseChartData} />
                    </div>
                    <div className="bg-card border border-border p-6 rounded-xl h-[300px] transition-colors duration-300">
                        <BarChart data={barChartData} />
                    </div>
                </div>
            </div>
        </div>
    );
}