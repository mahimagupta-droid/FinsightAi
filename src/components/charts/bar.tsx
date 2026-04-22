"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useTheme } from "next-themes";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BarChart = ({ data }: { data: any }) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.75)";
    const titleColor = isDark ? "#ffffff" : "#0f172a";
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)";

    return (
        <Bar data={data} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        color: textColor,
                    }
                },
                title: {
                    display: true,
                    text: "Income vs Expenses",
                    color: titleColor,
                    font: {
                        size: 16
                    }
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor,
                    },
                    grid: {
                        color: gridColor
                    }
                },
                y: {
                    ticks: {
                        color: textColor,
                    },
                    grid: {
                        color: gridColor,
                    }
                },
            },

        }} />
    )
}