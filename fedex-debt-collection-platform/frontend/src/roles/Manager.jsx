import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Manager() {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/api/performance")
            .then(res => setData(res.data));
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>📊 Collector Performance</h2>
                <Link to="/auto-assign" style={btnStyle}>🤖 Go to Auto Assignment</Link>
            </div>

            <div style={{ display: "flex", gap: 20 }}>
                {Object.keys(data).map(c => (
                    <div key={c} style={cardStyle}>
                        <h3>{c}</h3>
                        <p>Total Cases: {data[c].totalCases}</p>
                        <p>Success Rate: {data[c].successRate}%</p>
                        <p>Recovered: ₹{data[c].totalRecoveredAmount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const btnStyle = {
    textDecoration: "none",
    background: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: "bold"
};

const cardStyle = {
    background: "#ffffff",
    color: "#1e293b",
    padding: 20,
    width: 220,
    borderRadius: 10,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
};
