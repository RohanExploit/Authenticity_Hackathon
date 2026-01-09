import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function ManagerDashboard() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        api.get("/customers").then(res => setCustomers(res.data));
    }, []);

    return (
        <div style={{ padding: 30 }}>
            <h2>Manager Dashboard</h2>

            <table style={table}>
                <thead>
                    <tr>
                        <th style={th}>Customer ID</th>
                        <th style={th}>Overdue Amount</th>
                        <th style={th}>Days Past Due</th>
                        <th style={th}>Payment History</th>
                        <th style={th}>Risk Score</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(c => (
                        <tr key={c.id}>
                            <td style={td}>{c.id}</td>
                            <td style={td}>₹{c.overdueAmount}</td>
                            <td style={td}>{c.daysPastDue}</td>
                            <td style={td}>{c.paymentHistory}%</td>
                            <td style={td}>
                                <span style={risk(c.riskScore)}>
                                    {Math.round(c.riskScore)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const table = {
    width: "100%",
    borderCollapse: "collapse",
    background: "#ffffff"
};

const th = {
    textAlign: "left",
    padding: 10,
    background: "#f3f4f6",
    borderBottom: "1px solid #e5e7eb",
    color: "#111827"
};

const td = {
    padding: 10,
    borderBottom: "1px solid #e5e7eb",
    color: "#374151"
};

const risk = (score) => ({
    padding: "4px 8px",
    borderRadius: 6,
    color: "#ffffff",
    background:
        score > 70 ? "#dc2626" :
            score > 40 ? "#f59e0b" :
                "#16a34a"
});
