import axios from "axios";
import { useState } from "react";
import Center from "../components/common/Center";

export default function AutoAssignment() {
    const [riskScore, setRiskScore] = useState(60);
    const [suggestion, setSuggestion] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAISuggestion = async () => {
        setLoading(true);
        const res = await axios.post(
            "http://localhost:5000/api/suggest-collector",
            { riskScore }
        );
        setSuggestion(res.data);
        setLoading(false);
    };

    const assignCase = async (collector) => {
        await axios.post("http://localhost:5000/api/assign-case", {
            caseId: "CASE_101",
            collector
        });
        alert(`Case assigned to ${collector}`);
    };

    return (
        <Center>
            <div style={container}>
                <h2 style={title}>🤖 AI Auto Assignment</h2>

                {/* Risk Score Input */}
                <input
                    type="number"
                    value={riskScore}
                    onChange={e => setRiskScore(e.target.value)}
                    placeholder="Risk Score"
                    style={input}
                />

                <button onClick={getAISuggestion} style={primaryBtn}>
                    {loading ? "Analyzing..." : "Get AI Suggestion"}
                </button>

                {/* AI Result */}
                {suggestion && (
                    <div style={card}>
                        <h3 style={{ marginBottom: 10 }}>Suggested Collector</h3>

                        <p><b>Name:</b> {suggestion.name}</p>
                        <p><b>Success Rate:</b> {suggestion.successRate}%</p>
                        <p><b>Workload:</b> {suggestion.workload}</p>

                        <div style={{ marginTop: 15 }}>
                            <button
                                onClick={() => assignCase(suggestion.name)}
                                style={successBtn}
                            >
                                ✅ Accept AI Suggestion
                            </button>

                            <button
                                onClick={() => assignCase("collector2")}
                                style={dangerBtn}
                            >
                                ✏️ Override
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Center>
    );
}

const container = {
    width: 360,
    background: "#020617",
    padding: 30,
    borderRadius: 14,
    boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
    textAlign: "center"
};

const title = {
    marginBottom: 20,
    fontSize: 22
};

const input = {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    border: "none",
    outline: "none"
};

const primaryBtn = {
    width: "100%",
    padding: 10,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
};

const card = {
    marginTop: 25,
    padding: 20,
    background: "#020617",
    borderRadius: 12,
    border: "1px solid #1e293b"
};

const successBtn = {
    padding: 8,
    marginRight: 8,
    background: "#16a34a",
    border: "none",
    borderRadius: 6,
    color: "#fff",
    cursor: "pointer"
};

const dangerBtn = {
    padding: 8,
    background: "#dc2626",
    border: "none",
    borderRadius: 6,
    color: "#fff",
    cursor: "pointer"
};
