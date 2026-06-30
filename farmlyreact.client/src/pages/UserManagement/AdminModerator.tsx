import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import RoleTabs from "../../components/common/RoleTabs";      // ← fixed path
import AdminsList from "../../components/UserManagement/AdminList";
import ModeratorsList from "../../components/UserManagement/ModeratorsList";

export default function AdminModerator() {
    const [activeTab, setActiveTab] = useState<"admins" | "moderators">("admins");

    return (
        <>
            <PageMeta
                title="User Management | Farmly"
                description="Manage admins and moderators"
            />
            <PageBreadCrumb pageTitle="User Management" />

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <RoleTabs activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="mt-6">
                    {activeTab === "admins" ? <AdminsList /> : <ModeratorsList />}
                </div>
            </div>
        </>
    );
}