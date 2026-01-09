export default function Navbar() {
    return (
        <div style={nav}>
            <h3>FedEx Debt Platform</h3>
            <div>
                <a href="/customers" style={link}>Customers</a>
                <a href="/auto-assign" style={link}>Auto Assign</a>
                <a href="/collector" style={link}>Collector</a>
                <a href="/performance" style={link}>Performance</a>
                <a href="/settings" style={link}>Settings</a>
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
