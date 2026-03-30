import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LineChart({ data }: { data: any }) {
    return (
        <Line data={data} options={{
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
                    text: "Expenses Trend",
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
                        color: "rgba(255, 255, 255, 0.1)"
                    }
                },
            },
        }} />
    )
}