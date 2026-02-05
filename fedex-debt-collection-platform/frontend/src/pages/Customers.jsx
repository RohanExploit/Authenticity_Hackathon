import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    // Performance Optimization:
    // Limit rendering to 50 items per page to prevent DOM size explosion with large datasets (e.g., 10,000+ records).
    // This improves initial render time and responsiveness significantly.
    const ITEMS_PER_PAGE = 50;

    useEffect(() => {
        api.get("/customers").then(res => setCustomers(res.data));
    }, []);

    // Calculate total pages, ensuring at least 1 page even if empty to avoid Page 1 of 0
    const totalPages = Math.max(1, Math.ceil(customers.length / ITEMS_PER_PAGE));

    const paginatedCustomers = customers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePrev = () => setCurrentPage(p => Math.max(1, p - 1));
    const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

    return (
        <div style={{ padding: 30 }}>
            <h2>Customers</h2>

            <div style={paginationContainer}>
                 <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    style={{...pageBtn, ...(currentPage === 1 ? disabledBtn : {})}}
                 >
                    Previous
                 </button>
                 <span>Page {currentPage} of {totalPages}</span>
                 <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    style={{...pageBtn, ...(currentPage === totalPages ? disabledBtn : {})}}
                 >
                    Next
                 </button>
            </div>

            {paginatedCustomers.map(c => (
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

            {customers.length > ITEMS_PER_PAGE && (
                <div style={paginationContainer}>
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        style={{...pageBtn, ...(currentPage === 1 ? disabledBtn : {})}}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        style={{...pageBtn, ...(currentPage === totalPages ? disabledBtn : {})}}
                    >
                        Next
                    </button>
                </div>
            )}
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

const paginationContainer = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "20px",
    marginTop: "20px"
};

const pageBtn = {
    padding: "8px 16px",
    background: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#374151"
};

const disabledBtn = {
    opacity: 0.5,
    cursor: "not-allowed",
    background: "#e5e7eb"
};
