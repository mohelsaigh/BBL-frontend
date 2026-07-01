import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import FarmAdminSidebar from "./FarmAdminSidebar";

const FarmAdminLayoutContent: React.FC = () => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    return (
        <div className="min-h-screen xl:flex">
            <div>
                <FarmAdminSidebar />
                <Backdrop />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
                    } ${isMobileOpen ? "ml-0" : ""}`}
            >
                <AppHeader />
                <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const FarmAdminLayout: React.FC = () => {
    return (
        <SidebarProvider>
            <FarmAdminLayoutContent />
        </SidebarProvider>
    );
};

export default FarmAdminLayout;