"use client";
import { PieChart, Cell, Pie } from "recharts";
import { CATEGORY_META } from "@/components/Budgets/CategoryBudgetList";
import { Budget } from "@/lib/types/budget";
type Props = {
    budgets: Budget[];
}
export default function DonutChart({ budgets }: Props) {
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    return (
        <div className="relative flex items-center justify-center">
            <PieChart width={300} height={300}>
                <Pie
                    data={budgets}
                    innerRadius={60}
                    outerRadius={130}
                    dataKey="spent"
                // label={({ name, value }) => `${name}: ${value}%`}
                >
                    {budgets.map((entry, i) => {
                        const meta = CATEGORY_META[entry.category];
                        return (
                            <Cell key={i} fill={meta?.color || "#888"} />
                        )
                    })}
                </Pie>
            </PieChart>
            <div className="absolute text-center pointer-events-none">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">₹{totalSpent}</p>
            </div>
        </div >
    );
}

