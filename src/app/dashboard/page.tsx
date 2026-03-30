/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DashboardCard from "@/components/dashboardCard";
import { useEffect, useState } from "react";
import LineChart from "@/components/charts/line";
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
        console.log("Transactions updated:", transactions);
    }, [transactions])

    const totalIncome = transactions.filter((transaction: any) => transaction.type == "income").reduce((total: any, currentTransaction: any) => total + currentTransaction.amount, 0);
    const totalExpenses = transactions.filter((transaction: any) => transaction.type == "expense").reduce((total: any, currentTransaction: any) => total + currentTransaction.amount, 0);
    const balance = totalIncome - totalExpenses;
    const expenses = transactions.filter((transaction: any) => transaction.type == "expense")
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
    console.log(groupedExpenses)
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-15">
                <DashboardCard title="Total Income" amount={totalIncome} type="income" />
                <DashboardCard title="Total Expenses" amount={totalExpenses} type="expense" />
                <DashboardCard title="Balance" amount={balance} type="balance" />
            </div>
            <div className="bg-accent p-3 mt-14 mb-10 flex justify-baseline items-start">
                <LineChart data={expenseChartData} />
            </div>
        </div>
    )
}