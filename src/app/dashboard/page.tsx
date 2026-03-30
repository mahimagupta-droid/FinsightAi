"use client";
import DashboardCard from "@/components/dashboardCard";
import { useEffect, useState } from "react";

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
        fetchTransactions();
    }, [])

    useEffect(() => {
        console.log("Transactions updated:", transactions);
    }, [transactions])

    const totalIncome = transactions.filter((transaction: any) => transaction.type == "income").reduce((total: any, currentTransaction: any) => total + currentTransaction.amount, 0);
    const totalExpenses = transactions.filter((transaction: any) => transaction.type == "expense").reduce((total: any, currentTransaction: any) => total + currentTransaction.amount, 0);
    const balance = totalIncome - totalExpenses;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard title="Total Income" amount={totalIncome} type="income" />
                <DashboardCard title="Total Expenses" amount={totalExpenses} type="expense" />
                <DashboardCard title="Balance" amount={balance} type="balance" />
            </div>
        </>
    )
}