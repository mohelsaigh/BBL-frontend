import { useState, useEffect } from "react";
import { ModeratorUser } from "../../types/userManagement";
import {
    getModerators,
    addModerator,
    deleteModerator,
    updateModeratorStatus,
} from "../../services/moderatorService";
import { PlusIcon, CloseIcon, UserCircleIcon } from "../../icons";

function FieldRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-3 border-t border-gray-50 py-2 first:border-t-0 first:pt-0">
            <span className="shrink-0 text-gray-500">{label}</span>
            <span className="text-right font-medium text-gray-800">{value}</span>
        </div>
    );
}

export default function ModeratorsList() {
    const [moderators, setModerators] = useState<ModeratorUser[]>([]);
    const [selectedMod, setSelectedMod] = useState<ModeratorUser | null>(null);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phone_number: "",
        hash_pass: "",
    });

    useEffect(() => {
        getModerators().then(setModerators);
    }, []);

    const openMod = (mod: ModeratorUser) => {
        setSelectedMod(mod);
        setConfirmingDelete(false);
    };

    const closeDetail = () => {
        setSelectedMod(null);
        setConfirmingDelete(false);
    };

    const handleDelete = () => {
        if (!selectedMod) return;
        deleteModerator(selectedMod.id).then(() => {
            setModerators((prev) => prev.filter((m) => m.id !== selectedMod.id));
            closeDetail();
        });
    };

    const handleToggleStatus = () => {
        if (!selectedMod) return;
        const newStatus = selectedMod.status === "active" ? "disabled" : "active";
        updateModeratorStatus(selectedMod.id, newStatus).then((updated) => {
            setModerators((prev) =>
                prev.map((m) => (m.id === updated.id ? updated : m))
            );
            setSelectedMod(updated);
        });
    };

    const resetForm = () => {
        setFormData({ name: "", surname: "", email: "", phone_number: "", hash_pass: "" });
    };

    const handleAdd = () => {
        if (!formData.name.trim() || !formData.email.trim()) return;
        addModerator({
            ...formData,
            user_role: "Moderator",   // deduced from which list this is
            avatar_url: "/images/user/owner.jpg",
            status: "active",
        }).then((newMod) => {
            setModerators((prev) => [...prev, newMod]);
            setIsAdding(false);
            resetForm();
        });
    };

    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-[#eef1e6] p-10 dark:border-gray-800">
            <div className="relative text-center">
                <h2 className="mb-1 text-lg font-medium text-gray-800">Moderators</h2>
                <p className="mb-8 text-sm text-gray-500">
                    Select a moderator to view their details
                </p>

                <div className="flex flex-wrap justify-center gap-7">
                    {moderators.map((mod) => (
                        <button
                            key={mod.id}
                            onClick={() => openMod(mod)}
                            className="flex flex-col items-center gap-2.5"
                        >
                            {/* Dimmed tile if disabled */}
                            <div
                                className={`relative flex h-[104px] w-[104px] flex-col items-center justify-center rounded-[20px] bg-brand-500 shadow-lg shadow-brand-500/25 ${mod.status === "disabled" ? "opacity-40" : ""
                                    }`}
                            >
                                <UserCircleIcon className="h-10 w-10 text-[#f4ead9]" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    {mod.name} {mod.surname}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {mod.status === "disabled" ? "Disabled" : mod.user_role}
                                </p>
                            </div>
                        </button>
                    ))}

                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex flex-col items-center gap-2.5"
                    >
                        <div className="flex h-[104px] w-[104px] items-center justify-center rounded-[20px] border-2 border-dashed border-gray-300 bg-white/40">
                            <PlusIcon className="h-7 w-7 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-400">Add moderator</p>
                    </button>
                </div>
            </div>

            {/* Detail modal */}
            {selectedMod && (
                <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/45 px-4">
                    <div className="relative w-full max-w-sm rounded-2xl bg-white p-7">
                        <button
                            onClick={closeDetail}
                            className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200"
                        >
                            <CloseIcon className="h-3.5 w-3.5" />
                        </button>

                        <div className="mb-5 flex items-center gap-3">
                            <div
                                className={`flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-brand-500 ${selectedMod.status === "disabled" ? "opacity-40" : ""
                                    }`}
                            >
                                <UserCircleIcon className="h-7 w-7 text-[#f4ead9]" />
                            </div>
                            <div>
                                <p className="text-base font-medium text-gray-800">
                                    {selectedMod.name} {selectedMod.surname}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">
                                    {selectedMod.status}
                                </p>
                            </div>
                        </div>

                        {!confirmingDelete ? (
                            <>
                                <div className="space-y-1 border-t border-gray-100 pt-4 text-sm">
                                    <FieldRow label="Name" value={selectedMod.name} />
                                    <FieldRow label="Surname" value={selectedMod.surname} />
                                    <FieldRow label="Email" value={selectedMod.email} />
                                    <FieldRow label="Phone" value={selectedMod.phone_number} />
                                    <FieldRow label="Role" value={selectedMod.user_role} />
                                </div>

                                <div className="mt-5 flex gap-2.5">
                                    <button
                                        onClick={handleToggleStatus}
                                        className="flex-1 rounded-lg bg-brand-500 py-2.5 text-sm font-medium text-[#f4ead9] hover:bg-brand-600"
                                    >
                                        {selectedMod.status === "active"
                                            ? "Disable moderator"
                                            : "Enable moderator"}
                                    </button>
                                    <button
                                        onClick={() => setConfirmingDelete(true)}
                                        className="flex-1 rounded-lg bg-red-50 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="border-t border-gray-100 pt-4">
                                <p className="mb-4 text-sm text-gray-600">
                                    Are you sure you want to remove{" "}
                                    <span className="font-medium text-gray-800">
                                        {selectedMod.name} {selectedMod.surname}
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

            {/* Add moderator modal */}
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
                            Add a new moderator
                        </p>

                        <div className="mb-3 flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2">
                            <span className="text-sm text-gray-500">User role</span>
                            <span className="text-sm font-medium text-brand-600">Moderator</span>
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
                                Add moderator
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