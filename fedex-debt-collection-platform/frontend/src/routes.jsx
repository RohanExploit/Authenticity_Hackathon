import { Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import AutoAssignment from "./pages/AutoAssignment";
import CollectorDashboard from "./pages/CollectorDashboard";
import ManagerPerformance from "./pages/ManagerPerformance";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import ManagerDashboard from "./pages/ManagerDashboard";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
            <Route path="/auto-assign" element={<ProtectedRoute><AutoAssignment /></ProtectedRoute>} />
            <Route path="/collector" element={<ProtectedRoute><CollectorDashboard /></ProtectedRoute>} />
            <Route path="/performance" element={<ProtectedRoute><ManagerPerformance /></ProtectedRoute>} />
            <Route
                path="/manager"
                element={
                    <ProtectedRoute>
                        <ManagerDashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
