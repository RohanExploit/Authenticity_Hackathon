import { useEffect, useState } from "react";
import { api } from "../services/api";
import PerformanceChart from "../components/performance/PerformanceChart";

export default function ManagerPerformance() {
    const [data, setData] = useState({});

    useEffect(() => {
        api.get("/performance").then(res => setData(res.data));
    }, []);

    return (
        <div style={{ padding: 30 }}>
            <h2>Collector Performance</h2>

            <div style={{ maxWidth: 700, marginBottom: 40 }}>
                <PerformanceChart data={data} />
            </div>

            {Object.keys(data).map(k => (
                <div key={k} style={card}>
                    <h4>{k}</h4>
                    <p>Total Cases: {data[k].total}</p>
                    <p>Successful: {data[k].success}</p>
                    <p>Failed: {data[k].failed}</p>
                    <p>Recovered: ₹{data[k].recovered}</p>
                </div>
            ))}
        </div>
    );
}

const card = {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12
};
