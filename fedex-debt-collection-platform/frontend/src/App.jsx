import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AutoAssignment from "./pages/AutoAssignment";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auto-assign" element={<AutoAssignment />} />
      </Routes>
    </BrowserRouter>
  );
}
