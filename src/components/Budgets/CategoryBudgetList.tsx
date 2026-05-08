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

export default function CategoryBudgetList({ budgets }: Props) {
    return (
        <div>
            {budgets.map((b) => {
                const percentage = Math.min((b.spent / b.limit) * 100, 100);
                return (
                    <div key={b.id}>
                        <p>{b.category}</p>
                        <p>{b.spent}</p>
                        <p>{b.limit}</p>
                        <p>{percentage.toFixed(1)}%</p>
                    </div>
                );
            })}
        </div>
    );
}