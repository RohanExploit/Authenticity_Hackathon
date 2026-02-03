import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 50; // Bolt: Render chunk size to optimize performance
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/customers").then(res => setCustomers(res.data));
    }, []);

    // Bolt Optimization: Client-side pagination to reduce DOM nodes
    // Reduces initial render from ~10k items to 50
    const totalPages = Math.ceil(customers.length / ITEMS_PER_PAGE);
    const visibleCustomers = customers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div style={{ padding: 30 }}>
            <h2>Customers</h2>

            {visibleCustomers.map(c => (
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

            {/* Bolt: Pagination Controls */}
            {customers.length > ITEMS_PER_PAGE && (
                <div style={paginationContainer}>
                    <button
                        style={{...pageBtn, opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer'}}
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span style={pageInfo}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        style={{...pageBtn, opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'}}
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

const paginationContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 15
};

const pageBtn = {
    padding: "8px 16px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
};

const pageInfo = {
    color: "#374151",
    fontWeight: 500
};

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
