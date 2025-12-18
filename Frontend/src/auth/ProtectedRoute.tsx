import { Navigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import api from "../api/axios";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/user/me");
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div className="p-6">Checking authentication...</div>;

  return authenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
