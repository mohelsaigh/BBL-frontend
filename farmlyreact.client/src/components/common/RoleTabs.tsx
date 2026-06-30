import React from "react";
interface RoleTabsProps {
    activeTab: "admins" | "moderators";
    onTabChange: (tab: "admins" | "moderators") => void;
}

const RoleTabs: React.FC<RoleTabsProps> = ({ activeTab, onTabChange }) => {
    const getButtonClass = (tab: "admins" | "moderators") =>
        activeTab === tab
            ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            : "text-gray-500 dark:text-gray-400";

    return (
        <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
            <button
                onClick={() => onTabChange("admins")}
                className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
                    "admins"
                )}`}
            >
                Admins
            </button>
            <button
                onClick={() => onTabChange("moderators")}
                className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
                    "moderators"
                )}`}
            >
                Moderators
            </button>
        </div>
    );
};

export default RoleTabs;