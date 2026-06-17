import { create } from 'zustand'

interface Transaction {
    id: string;
    amount: number;
    type: string;
    category: string;
    description: string;
    date: string;
    paymentMethod?: string;
    isEssential: boolean;
    isRecurring: boolean;
}

interface Budget {
    id: string;
    category: string;
    monthlyLimit: number;
    spent: number;
    month: number;
    year: number;
}

interface FinanceStore {
    transactions: Transaction[];
    budgets: Budget[];
    loading: boolean;
    fetchTransactions: () => Promise<void>;
    fetchBudgets: () => Promise<void>;
}

export const useFinanceStore = create<FinanceStore>((set) => ({
    transactions: [],
    budgets: [],
    loading: true,

    fetchTransactions: async () => {
        const response = await fetch("/api/transactions");
        if (response.ok) {
            const data = await response.json();
            if (data.success && data.transactions) {
                set({ transactions: data.transactions });
            }
        }
        set({ loading: false });
    },

    fetchBudgets: async () => {
        const response = await fetch("/api/budgets");
        if (response.ok) {
            const budgetsData = await response.json();
            set({ budgets: budgetsData });
        }
    },
}));