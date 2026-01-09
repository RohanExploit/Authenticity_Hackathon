import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";

// Lazy loaded components
const Customers = lazy(() => import("./pages/Customers"));
const AutoAssignment = lazy(() => import("./pages/AutoAssignment"));
const CollectorDashboard = lazy(() => import("./pages/CollectorDashboard"));
const ManagerPerformance = lazy(() => import("./pages/ManagerPerformance"));
const ManagerDashboard = lazy(() => import("./pages/ManagerDashboard"));
const Settings = lazy(() => import("./pages/Settings"));

// Simple loading component
const Loading = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    Loading...
  </div>
);

export default function AppRoutes() {
    return (
        <Suspense fallback={<Loading />}>
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
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Routes>
        </Suspense>
    );
}
