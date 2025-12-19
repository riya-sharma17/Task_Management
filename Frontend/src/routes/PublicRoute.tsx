import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type React from "react";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
