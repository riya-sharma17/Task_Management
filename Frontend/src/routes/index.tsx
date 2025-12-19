import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layout";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <PublicRoute><Login /></PublicRoute>,
            },
            {
                path: "register",
                element: <PublicRoute><Register /></PublicRoute>,
            },
            {
                path: "dashboard",
                element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
            },
        ],
    },
]);
