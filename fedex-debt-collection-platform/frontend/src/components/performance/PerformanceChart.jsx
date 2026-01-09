import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function PerformanceChart({ data }) {
    const labels = Object.keys(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Recovered Amount",
                data: labels.map(k => data[k].recovered),
                backgroundColor: "#2563eb"
            }
        ]
    };

    return <Bar data={chartData} />;
}
