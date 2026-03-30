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
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Expenses",
                },
            },
        }} />
    )
}