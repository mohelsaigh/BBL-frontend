import { useState, useEffect } from "react";
import { AdminUser } from "../../types/userManagement";
import { getAdmins, addAdmin, deleteAdmin } from "../../services/adminservice";
import { PlusIcon, CloseIcon, UserCircleIcon } from "../../icons";

// Same FieldRow helper as farm-info, copied here
function FieldRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-3 border-t border-gray-50 py-2 first:border-t-0 first:pt-0">
            <span className="shrink-0 text-gray-500">{label}</span>
            <span className="text-right font-medium text-gray-800">{value}</span>
        </div>
    );
}

export default function AdminsList() {
    const [admins, setAdmins] = useState<AdminUser[]>([]);
    const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    // Form state — user_role is locked to "Admin", not typed by user
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phone_number: "",
        hash_pass: "",
    });

    useEffect(() => {
        getAdmins().then(setAdmins);
    }, []);

    const openAdmin = (admin: AdminUser) => {
        setSelectedAdmin(admin);
        setConfirmingDelete(false);
    };

    const closeDetail = () => {
        setSelectedAdmin(null);
        setConfirmingDelete(false);
    };

    const handleDelete = () => {
        if (!selectedAdmin) return;
        deleteAdmin(selectedAdmin.id).then(() => {
            setAdmins((prev) => prev.filter((a) => a.id !== selectedAdmin.id));
            closeDetail();
        });
    };

    const resetForm = () => {
        setFormData({ name: "", surname: "", email: "", phone_number: "", hash_pass: "" });
    };

    const handleAdd = () => {
        if (!formData.name.trim() || !formData.email.trim()) return;
        addAdmin({
            ...formData,
            user_role: "Admin",      // deduced from which list this is
            avatar_url: "/images/user/owner.jpg",
        }).then((newAdmin) => {
            setAdmins((prev) => [...prev, newAdmin]);
            setIsAdding(false);
            resetForm();
        });
    };

    return (
        // Same green background as farm-info
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-[#eef1e6] p-10 dark:border-gray-800">
            <div className="relative text-center">
                <h2 className="mb-1 text-lg font-medium text-gray-800">Admins</h2>
                <p className="mb-8 text-sm text-gray-500">
                    Select an admin to view their details
                </p>

                {/* Tile grid — same layout as farm-info */}
                <div className="flex flex-wrap justify-center gap-7">
                    {admins.map((admin) => (
                        <button
                            key={admin.id}
                            onClick={() => openAdmin(admin)}
                            className="flex flex-col items-center gap-2.5"
                        >
                            <div className="relative flex h-[104px] w-[104px] flex-col items-center justify-center rounded-[20px] bg-brand-500 shadow-lg shadow-brand-500/25">
                                <UserCircleIcon className="h-10 w-10 text-[#f4ead9]" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    {admin.name} {admin.surname}
                                </p>
                                <p className="text-xs text-gray-500">{admin.user_role}</p>
                            </div>
                        </button>
                    ))}

                    {/* Add tile — dashed, same as farm-info */}
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex flex-col items-center gap-2.5"
                    >
                        <div className="flex h-[104px] w-[104px] items-center justify-center rounded-[20px] border-2 border-dashed border-gray-300 bg-white/40">
                            <PlusIcon className="h-7 w-7 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-400">Add admin</p>
                    </button>
                </div>
            </div>

            {/* Detail modal — same structure as farm-info's selectedFarm modal */}
            {selectedAdmin && (
                <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/45 px-4">
                    <div className="relative w-full max-w-sm rounded-2xl bg-white p-7">
                        <button
                            onClick={closeDetail}
                            className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200"
                        >
                            <CloseIcon className="h-3.5 w-3.5" />
                        </button>

                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-brand-500">
                                <UserCircleIcon className="h-7 w-7 text-[#f4ead9]" />
                            </div>
                            <p className="text-base font-medium text-gray-800">
                                {selectedAdmin.name} {selectedAdmin.surname}
                            </p>
                        </div>

                        {!confirmingDelete ? (
                            <>
                                <div className="space-y-1 border-t border-gray-100 pt-4 text-sm">
                                    <FieldRow label="Name" value={selectedAdmin.name} />
                                    <FieldRow label="Surname" value={selectedAdmin.surname} />
                                    <FieldRow label="Email" value={selectedAdmin.email} />
                                    <FieldRow label="Phone" value={selectedAdmin.phone_number} />
                                    <FieldRow label="Role" value={selectedAdmin.user_role} />
                                </div>

                                <div className="mt-5 flex gap-2.5">
                                    <button
                                        onClick={() => setConfirmingDelete(true)}
                                        className="flex-1 rounded-lg bg-red-50 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100"
                                    >
                                        Remove admin
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="border-t border-gray-100 pt-4">
                                <p className="mb-4 text-sm text-gray-600">
                                    Are you sure you want to remove{" "}
                                    <span className="font-medium text-gray-800">
                                        {selectedAdmin.name} {selectedAdmin.surname}
                                    </span>
                                    ? This can't be undone.
                                </p>
                                <div className="flex gap-2.5">
                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white hover:bg-red-700"
                                    >
                                        Yes, remove
                                    </button>
                                    <button
                                        onClick={() => setConfirmingDelete(false)}
                                        className="flex-1 rounded-lg bg-gray-100 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Add admin modal */}
            {isAdding && (
                <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/45 px-4">
                    <div className="relative w-full max-w-sm rounded-2xl bg-white p-7">
                        <button
                            onClick={() => { setIsAdding(false); resetForm(); }}
                            className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200"
                        >
                            <CloseIcon className="h-3.5 w-3.5" />
                        </button>

                        <p className="mb-5 text-base font-medium text-gray-800">
                            Add a new admin
                        </p>

                        {/* User role shown as read-only — auto-set, not typed */}
                        <div className="mb-3 flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2">
                            <span className="text-sm text-gray-500">User role</span>
                            <span className="text-sm font-medium text-brand-600">Admin</span>
                        </div>

                        <div className="space-y-3 border-t border-gray-100 pt-4 text-sm">
                            {[
                                { label: "Name", key: "name", type: "text" },
                                { label: "Surname", key: "surname", type: "text" },
                                { label: "Email", key: "email", type: "email" },
                                { label: "Phone number", key: "phone_number", type: "tel" },
                                { label: "Password", key: "hash_pass", type: "password" },
                            ].map(({ label, key, type }) => (
                                <div key={key}>
                                    <label className="mb-1 block text-gray-500">{label}</label>
                                    <input
                                        type={type}
                                        value={formData[key as keyof typeof formData]}
                                        onChange={(e) =>
                                            setFormData({ ...formData, [key]: e.target.value })
                                        }
                                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-brand-500"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 flex gap-2.5">
                            <button
                                onClick={handleAdd}
                                className="flex-1 rounded-lg bg-brand-500 py-2.5 text-sm font-medium text-[#f4ead9] hover:bg-brand-600"
                            >
                                Add admin
                            </button>
                            <button
                                onClick={() => { setIsAdding(false); resetForm(); }}
                                className="flex-1 rounded-lg bg-gray-100 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}