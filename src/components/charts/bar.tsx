import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const BarChart = ({ data }: { data: any }) => {
    return (
        <Bar data={data} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        color: "rgba(255, 255, 255, 0.7)",
                    }
                },
                title: {
                    display: true,
                    text: "Income vs Expenses",
                    color: "white",
                    font: {
                        size: 16
                    }
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "rgba(255, 255, 255, 0.8)",
                    },
                    grid: {
                        color: "rgba(255, 255, 255, 0.1)"
                    }
                },
                y: {
                    ticks: {
                        color: "rgba(255, 255, 255, 0.8)",
                    },
                    grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                    }
                },
            },

        }} />
    )
} 