import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/customers").then(res => setCustomers(res.data));
    }, []);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div style={{ padding: 30 }}>
            <h2>Customers</h2>

            {currentItems.map(c => (
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
                            navigate(`/auto-assign?id=${c.id}&risk=${c.riskScore}`)
                        }
                    >
                        Assign Case
                    </button>
                </div>
            ))}

            {/* Bolt Optimization: Client-side Pagination */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20, gap: 10 }}>
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{ ...btn, marginTop: 0, opacity: currentPage === 1 ? 0.5 : 1 }}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {Math.ceil(customers.length / itemsPerPage)}</span>
                <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={indexOfLastItem >= customers.length}
                    style={{ ...btn, marginTop: 0, opacity: indexOfLastItem >= customers.length ? 0.5 : 1 }}
                >
                    Next
                </button>
            </div>
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
