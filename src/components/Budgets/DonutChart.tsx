"use client";
import { PieChart, Cell, Pie } from "recharts";
type Budget = {
    id: string;
    category: string;
    spent: number;
    limit: number;
    icon: string;
    color?: string;
}
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
                    {budgets.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
            <div className="absolute text-center pointer-events-none">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">₹{totalSpent}</p>
            </div>
        </div >
    );
}

