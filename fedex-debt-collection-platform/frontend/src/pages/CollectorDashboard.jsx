import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function CollectorDashboard() {
    const collector = "collector1";
    const [cases, setCases] = useState([]);

    useEffect(() => {
        api.get(`/cases/${collector}`).then(res => setCases(res.data));
    }, []);

    const updateStatus = async (caseId, status) => {
        await api.post("/case/status", {
            caseId,
            status,
            collector
        });
        alert("Status updated");
        // Refresh cases locally to reflect change if needed, but alert is enough for now per instructions
    };

    return (
        <div style={{ padding: 30 }}>
            <h2>My Cases</h2>

            {cases.map(c => (
                <div key={c.id} style={card}>
                    <p><b>{c.id}</b></p>
                    <p>Status: {c.status}</p>

                    <select
                        defaultValue={c.status}
                        onChange={e => updateStatus(c.id, e.target.value)}
                        style={{ padding: 5, marginTop: 5 }}
                    >
                        <option value="ASSIGNED">ASSIGNED</option>
                        <option value="Contacted">Contacted</option>
                        <option value="PAID">PAID</option>
                        <option value="FAILED">FAILED</option>
                    </select>
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
