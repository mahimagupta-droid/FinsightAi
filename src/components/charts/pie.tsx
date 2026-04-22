"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "next-themes";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PieChart = ({ data }: { data: any }) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const textColor = isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)";
    const titleColor = isDark ? "#ffffff" : "#0f172a";

    return (
        <Pie data={data} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        color: textColor,
                    },
                },
                title: {
                    display: true,
                    text: "Expenses by Category",
                    color: titleColor,
                    font: {
                        size: 16
                    }
                },
            },
        }} />
    )
}