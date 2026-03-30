import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export const PieChart = ({ data }: { data: any }) => {
    return (
        <Pie data={data} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        color: "rgba(255, 255, 255, 0.7)",
                    },
                },
                title: {
                    display: true,
                    text: "Expenses by Category",
                    color: "white",
                    font: {
                        size: 16
                    }
                },
            },
        }} />
    )
}