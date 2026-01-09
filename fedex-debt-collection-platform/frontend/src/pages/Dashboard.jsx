import Manager from "../roles/Manager";
import Collector from "../roles/Collector";

export default function Dashboard() {
  const role = localStorage.getItem("role");

  if (role === "MANAGER") return <Manager />;
  if (role === "COLLECTOR") return <Collector />;

  return <h3>Admin Dashboard (future)</h3>;
}
