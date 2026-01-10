import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../services/api";

export default function AutoAssignment() {
    const [searchParams] = useSearchParams();
    const customerId = searchParams.get("id");
    const risk = Number(searchParams.get("risk"));

    const [riskScore] = useState(risk);
    const [collector, setCollector] = useState("collector1");
    const navigate = useNavigate();

    const assign = async () => {
        await api.post("/assign-case", {
            customerId,
            collector
        });
        alert("Case assigned successfully");
        navigate("/manager-dashboard"); // Clean UX: back to dashboard
    };

    return (
        <div style={{ padding: 30 }}>
            <h2>Auto Assignment</h2>

            <p><b>Customer:</b> {customerId}</p>
            <p><b>Risk Score:</b> {Math.round(riskScore)}</p>

            <select
                value={collector}
                onChange={e => setCollector(e.target.value)}
                style={select}
            >
                <option value="collector1">collector1 (AI Suggested)</option>
                <option value="collector2">collector2</option>
                <option value="collector3">collector3</option>
            </select>

            <button style={btn} onClick={assign}>
                Confirm Assignment
            </button>
        </div>
    );
}

const select = {
    padding: 8,
    marginTop: 10,
    borderRadius: 6,
    border: "1px solid #e5e7eb",
    background: "#fff",
    color: "#1f2937"
};

const btn = {
    marginTop: 15,
    padding: "8px 14px",
    background: "#2563eb", /* Blue primary */
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
};
