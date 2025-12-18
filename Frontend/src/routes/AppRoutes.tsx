import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CreateTask from "../pages/CreateTask";
import ProtectedRoute from "../auth/ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/create-task"
      element={
        <ProtectedRoute>
          <CreateTask />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
