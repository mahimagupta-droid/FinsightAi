/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Transaction from "../../../public/transactions-bg.png";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/lib/constants";
export default function AddTransactionsPage() {
  const [transaction, setTransaction] = useState({
    amount: 0,
    type: "select",
    category: "",
    description: "",
    date: new Date(),
    paymentMethod: "select",
    isEssential: false,
    isRecurring: false,
  })
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      })
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.transaction) {
          toast.success(data.message);
          setTransaction({
            amount: 0,
            type: "select",
            category: "",
            description: "",
            date: new Date(),
            paymentMethod: "select",
            isEssential: false,
            isRecurring: false,
          })
        }
      }
    } catch (error: any) {
      toast.error(`${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const getTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/transactions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.transactions) {
          toast.success(data.message);
          setTransaction(data.transactions);
        }
      }
    } catch (error: any) {
      toast.error(`${error.message}`)
    } finally {
      setLoading(false)
    }
  }
  console.log(transaction)
  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-8 md:px-16 gap-16 min-h-[70vh] mt-10 mb-10">
      <div className="flex-1 flex items-center justify-center px-6 w-full">
        <div className="w-full max-w-2xl bg-card text-card-textColor border border-border rounded-xl shadow-2xl p-8">
          <h3 className="text-3xl font-semibold text-center mb-8 text-textColor">
            Add Transactions
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 font-lexend" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="amount"
                className="text-sm mb-1 text-muted-textColor"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={transaction.amount || ""}
                onChange={(e) => setTransaction({ ...transaction, amount: Number(e.target.value) })}
                className="w-full bg-input text-textColor border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none transition" placeholder="e.g. 50" />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="type"
                className="text-sm mb-1 text-muted-textColor"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                value={transaction.type}
                onChange={(e) => setTransaction({ ...transaction, type: e.target.value as "expense" | "income", category: "" })}
                className="w-full bg-input text-textColor border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none transition">
                <option value="select" disabled defaultChecked>Select Expense Type</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="text-sm mb-1 text-muted-textColor"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={transaction.category}
                onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
                className="w-full bg-input text-textColor border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none transition" disabled={transaction.type === "select"}>
                <option value="" disabled defaultChecked>Select Category</option>
                {transaction.type === "expense" && (EXPENSE_CATEGORIES as string[]).map((cat: string) => (
                  <option key={cat} value={cat}>
                    {cat.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
                {transaction.type === "income" && (INCOME_CATEGORIES as string[]).map((cat: string) => (
                  <option key={cat} value={cat}>
                    {cat.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-sm mb-1 text-muted-textColor"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={transaction.description}
                onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
                className="w-full bg-input text-textColor border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none transition"
                placeholder="e.g. Lunch"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="date"
                className="text-sm mb-1 text-muted-textColor"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={transaction.date ? transaction.date.toISOString().split('T')[0] : ''}
                onChange={(e) => setTransaction({ ...transaction, date: new Date(e.target.value) })}
                className="w-full bg-input text-textColor border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none transition"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="paymentMethod" className="text-sm mb-1 text-muted-textColor">Payment Method</label>
              <select id="paymentMethod" name="paymentMethod" value={transaction.paymentMethod} onChange={(e) => setTransaction({ ...transaction, paymentMethod: e.target.value as "cash" | "card" | "upi" | "bank_transfer" | "other" })} className="w-full bg-input text-textColor border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none transition">
                <option value="select" disabled>Select Method</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="isEssential"
                name="isEssential"
                checked={transaction.isEssential}
                onChange={(e) => setTransaction({ ...transaction, isEssential: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary focus:ring-ring focus:ring-offset-0 bg-input cursor-pointer"
              />
              <label htmlFor="isEssential" className="text-sm text-textColor cursor-pointer">Is Essential</label>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="isRecurring"
                name="isRecurring"
                checked={transaction.isRecurring}
                onChange={(e) => setTransaction({ ...transaction, isRecurring: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary focus:ring-ring focus:ring-offset-0 bg-input cursor-pointer"
              />
              <label
                htmlFor="isRecurring"
                className="text-sm text-textColor cursor-pointer"
              >
                Is Recurring
              </label>
            </div>
            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-primary text-primary-textColor px-6 py-2 rounded-lg font-medium hover:bg-secondary transition duration-200 shadow-md cursor-pointer"
              >
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-1 flex justify-center md:justify-end items-center relative mt-10 md:mt-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-96 lg:h-96 bg-blue-500/20 blur-[100px] rounded-full -z-10 animate-pulse hidden md:block" />
        <Image src={Transaction} alt="page-img" className="w-full max-w-112.5 lg:max-w-150 h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,109,170,0.5)] transition-transform duration-700" priority />
      </div>
    </div>
  );
}
