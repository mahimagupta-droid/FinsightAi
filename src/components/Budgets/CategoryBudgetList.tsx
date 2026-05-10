import { UtensilsCrossed, Car, ShoppingBag, Heart } from "lucide-react";
import { formatter } from "@/components/summaryCard";
const ICON_MAP = { UtensilsCrossed, Car, ShoppingBag, Heart, }
type Budget = {
    id: string;
    category: string;
    spent: number;
    limit: number;
    icon: string;
}
type Props = {
    budgets: Budget[];
}
const getBarColor = (percentage: number) => {
    if (percentage >= 100) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-green-500";
}

export default function CategoryBudgetList({ budgets }: Props) {
    return (
        <div className="flex flex-col gap-4 w-full">
            {budgets.map((b) => {
                const percentage = Math.min((b.spent / b.limit) * 100, 100);
                const IconComponent = ICON_MAP[b.icon as keyof typeof ICON_MAP];
                return (
                    <div key={b.id} className="flex flex-col gap-5">
                        <div className="bg-card mt-5 mb-5 p-5 rounded-md">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row gap-2 mb-4">
                                    <IconComponent size={25} />
                                    <p className="font-semibold">{b.category}</p>
                                </div>
                                <p className="text-muted-foreground font-semibold">{formatter.format(b.spent)} / {formatter.format(b.limit)}</p>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/10">
                                <div
                                    className={`h-2 rounded-full transition-all duration-500 ${getBarColor(percentage)}`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <p className="mt-2 mb-1">Limit Used: {percentage.toFixed(1)}%</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}