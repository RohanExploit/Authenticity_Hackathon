import axios from "axios";
import { useState, useEffect } from "react";

export default function Collector() {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        const fetchCases = async () => {
            // Hardcoded collector1 for demo
            const res = await axios.get("http://localhost:5000/api/cases/collector1");
            setCases(res.data);
        };
        fetchCases();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Collector Dashboard</h1>

            <div style={{ border: "1px solid #ccc", padding: 20 }}>
                <h2>6️⃣ Assigned Cases & Tracking</h2>
                {cases.length === 0 ? <p>No cases assigned yet.</p> : (
                    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th>Case ID</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cases.map(c => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>${c.amount}</td>
                                    <td>{c.status}</td>
                                    <td><button>Contact</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
