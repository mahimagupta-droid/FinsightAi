import { useFinanceStore } from "@/lib/store/useFinanceStore";
import { useEffect } from "react";

export default function AIInsightsPanel() {
    const { aiInsights, insightsLoading, insightsFetched, fetchInsights } = useFinanceStore();

    useEffect(() => {
        fetchInsights();
    }, []);

    const typeColors: Record<string, string> = {
        overspending: "border-red-500 bg-red-50 text-gray-900",
        savings_tip: "border-green-500 bg-green-50 text-gray-900",
        investment_suggestion: "border-blue-500 bg-blue-50 text-gray-900",
        recurring_alert: "border-amber-500 bg-amber-50 text-gray-900",
        goal_progress: "border-purple-500 bg-purple-50 text-gray-900",
    };

    return (
        <div className="space-y-3">
            {insightsLoading && <p>Loading insights...</p>}

            {!insightsLoading && aiInsights.length === 0 && insightsFetched && (
                <p>No insights yet.</p>
            )}

            {aiInsights.map((insight, index) => (
                <div key={index} className={`border-l-4 p-4 rounded ${typeColors[insight.type]}`}>
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{insight.title}</h3>
                        <span className="text-xs uppercase">{insight.priority}</span>
                    </div>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
            ))}
            <div className="flex justify-center align-center">
                <button onClick={() => fetchInsights(true)} className="cursor-pointer rounded border p-3 text-center bg-gray-200 text-black">Refresh Insights</button>
            </div>
        </div>
    );
}