import { useCallback, useEffect, useState, useRef, } from "react";
import { Link, useLocation, useNavigate } from "react-router"; 
import {
    GridIcon,
    UserCircleIcon,
    BoltIcon,
    DollarLineIcon,
    PieChartIcon,
    ChevronDownIcon,
    HorizontaLDots,
    PlugInIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";

type NaveItem = {

    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string }[];
};

const navItems: NaveItem[] = [
    {
        icon: <GridIcon />,
        name: "Dashboard",
        path: "/farm-admin/dashboard",
    },

    {
        icon: <UserCircleIcon />,
        name: "User Management",
        subItems: [
            { name: "Employees", path: "/farm-admin/user-management/employees" },
            { name: "Tasks", path: "/farm-admin/user-management/tasks" },
            { name: "Work Groups", path: "/farm-admin/user-management/work-groups" },
        ],
    },

    {
        icon: <BoltIcon />,
        name: "Equipment",
        path: "/farm-admin/equipment",
    },
    {
        icon: <DollarLineIcon />,
        name: "Financial",
        subItems: [
            { name: "Employee Wages", path: "/farm-admin/financial/wages" },
            { name: "Income Per Crop", path: "/farm-admin/financial/income" },
            { name: "Water Costs", path: "/farm-admin/financial/water" },
            { name: "Invoices", path: "/farm-admin/financial/invoices" },
        ],
    },
    {
        icon: <PieChartIcon />,
        name: "Aquaponics",
        path: "/farm-admin/aquaponics",
    },
];

const FarmAdminSidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();
    const navigate = useNavigate();

    const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
    const [subMenuHeight, setsubMenuHeight] = useState<Record<number, number>>({});
    const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const isActive = useCallback(
        (path: string) => location.pathname === path,
        [location.pathname]
    );

    useEffect(() => {
        navItems.forEach((item, index) => {
            if (item.subItems?.some((sub) => isActive(sub.path))) {
                setOpenSubmenu(index);
            }
        });
    }, [location, isActive]);

    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenu((prev) => (prev === index ? null : index));
    };

    const showLabels = isExpanded || isHovered || isMobileOpen;


    return (
        <aside
            className={`fixed top-0 left-0 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 lg:mt-0 z-50
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Logo */}
            <div className={`flex py-8 ${!showLabels ? "lg:justify-center" : "justify-start"}`}>
                <Link to="/farm-admin/dashboard">
                    {showLabels ? (
                        <>
                            <img className="dark:hidden" src="/images/logo.svg" alt="Farmly" width={150} height={40} />
                            <img className="hidden dark:block" src="/images/logo-dark.svg" alt="Farmly" width={150} height={40} />
                        </>
                    ) : (
                        <img src="/images/logo-icon.svg" alt="Farmly" width={32} height={32} />
                    )}
                </Link>
            </div>

            {/* Scrollable nav area */}
            <div className="flex flex-1 flex-col overflow-y-auto no-scrollbar">
                <nav className="flex-1">
                    {/* Section label */}
                    <h2 className={`mb-4 flex text-xs uppercase leading-5 text-gray-400 ${!showLabels ? "lg:justify-center" : "justify-start"}`}>
                        {showLabels ? "Farm Admin" : <HorizontaLDots className="size-6" />}
                    </h2>

                    <ul className="flex flex-col gap-4">
                        {navItems.map((nav, index) => (
                            <li key={nav.name}>
                                {nav.subItems ? (
                                    // Item with dropdown
                                    <button
                                        onClick={() => handleSubmenuToggle(index)}
                                        className={`menu-item group w-full cursor-pointer ${openSubmenu === index ? "menu-item-active" : "menu-item-inactive"
                                            } ${!showLabels ? "lg:justify-center" : "lg:justify-start"}`}
                                    >
                                        <span className={`menu-item-icon-size ${openSubmenu === index ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                                            {nav.icon}
                                        </span>
                                        {showLabels && <span className="menu-item-text">{nav.name}</span>}
                                        {showLabels && (
                                            <ChevronDownIcon
                                                className={`ml-auto h-5 w-5 transition-transform duration-200 ${openSubmenu === index ? "rotate-180 text-brand-500" : ""}`}
                                            />
                                        )}
                                    </button>
                                ) : (
                                    // Direct link
                                    nav.path && (
                                        <Link
                                            to={nav.path}
                                            className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`}
                                        >
                                            <span className={`menu-item-icon-size ${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                                                {nav.icon}
                                            </span>
                                            {showLabels && <span className="menu-item-text">{nav.name}</span>}
                                        </Link>
                                    )
                                )}

                                {/* Submenu */}
                                {nav.subItems && showLabels && (
                                    <div
                                        ref={(el) => { subMenuRefs.current[index] = el; }}
                                        className="overflow-hidden transition-all duration-300"
                                        style={{ height: openSubmenu === index ? `${subMenuHeight[index]}px` : "0px" }}
                                    >
                                        <ul className="ml-9 mt-2 space-y-1">
                                            {nav.subItems.map((sub) => (
                                                <li key={sub.name}>
                                                    <Link
                                                        to={sub.path}
                                                        className={`menu-dropdown-item ${isActive(sub.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* ── Bottom: Login / Logout pinned at the bottom ── */}
                <div className="mb-6 mt-auto border-t border-gray-100 pt-4 dark:border-gray-800">
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link
                                to="/signin"
                                className="menu-item group menu-item-inactive"
                            >
                                <span className="menu-item-icon-size menu-item-icon-inactive">
                                    <PlugInIcon />
                                </span>
                                {showLabels && <span className="menu-item-text">Login</span>}
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/signin")}
                                className="menu-item group menu-item-inactive w-full"
                            >
                                <span className="menu-item-icon-size menu-item-icon-inactive">
                                    {/* Rotated plug = logout convention */}
                                    <PlugInIcon className="rotate-180" />
                                </span>
                                {showLabels && <span className="menu-item-text text-error-500">Logout</span>}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default FarmAdminSidebar;
