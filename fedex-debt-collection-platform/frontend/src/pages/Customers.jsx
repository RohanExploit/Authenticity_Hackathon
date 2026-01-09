import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Customers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        api.get("/customers").then(res => setCustomers(res.data));
    }, []);

    return (
        <div style={{ padding: 30 }}>
            <h2>Customers</h2>

            {customers.map(c => (
                <div key={c.id} style={card}>
                    <h4>{c.id}</h4>
                    <p>Overdue: ₹{c.overdueAmount}</p>
                    <p>Days Past Due: {c.daysPastDue}</p>

                    <span style={riskBadge(c.riskScore)}>
                        Risk: {Math.round(c.riskScore)}
                    </span>

                    <button
                        style={btn}
                        onClick={() =>
                            window.location =
                            `/auto-assign?id=${c.id}&risk=${c.riskScore}`
                        }
                    >
                        Assign Case
                    </button>
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

const btn = {
    marginTop: 10,
    padding: "8px 14px",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
};

const riskBadge = (score) => ({
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: 6,
    color: "#ffffff",
    background:
        score > 70 ? "#dc2626" :
            score > 40 ? "#f59e0b" :
                "#16a34a",
    fontSize: 12
});
