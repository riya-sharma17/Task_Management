import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            {/* Navbar / Sidebar */}
            <Outlet />
        </div>
    );
};

export default MainLayout;
