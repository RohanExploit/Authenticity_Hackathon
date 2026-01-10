import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div style={nav}>
            <h3>FedEx Debt Platform</h3>
            <div>
                <Link to="/customers" style={link}>Customers</Link>
                <Link to="/auto-assign" style={link}>Auto Assign</Link>
                <Link to="/collector" style={link}>Collector</Link>
                <Link to="/performance" style={link}>Performance</Link>
                <Link to="/settings" style={link}>Settings</Link>
            </div>
        </div>
    );
}

const nav = {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb"
};

const link = {
    marginLeft: 16,
    color: "#1f2937",
    textDecoration: "none",
    fontWeight: 500
};
