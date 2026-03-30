type DashboardCardProps = {
    title: string;
    amount: number;
    type: "income" | "expense" | "balance";
};

export default function DashboardCard({ title, amount, type }: DashboardCardProps) {
    const getStyles = () => {
        switch (type) {
            case "income":
                return "bg-green-500/10 text-green-400 border-green-500/20";
            case "expense":
                return "bg-red-500/10 text-red-400 border-red-500/20";
            case "balance":
                return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            default:
                return "bg-gray-500/10 text-gray-300";
        }
    };

    return (
        <div className={`rounded-2xl border p-6 shadow-lg backdrop-blur-md transition hover:scale-105 ${getStyles()}`}>
            <h2 className="text-sm opacity-70 mb-2">{title}</h2>
            <p className="text-3xl font-bold tracking-wide">
                ₹ {amount.toLocaleString()}
            </p>
        </div>
    );
}