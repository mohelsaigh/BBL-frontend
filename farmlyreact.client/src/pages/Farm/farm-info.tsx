import { useState } from "react";
import { ViewFarmInfoIcon, PlusIcon, CloseIcon } from "../../icons";

type Farm = {
    id: string;
    name: string;
    address: string;
    employees: number;
    admin: string;
    status: "Healthy" | "Warning" | "Critical";
};

const initialFarms: Farm[] = [
    {
        id: "1",
        name: "Greenview Farm",
        address: "14 Riverbend Rd, Phoenix, AZ",
        employees: 12,
        admin: "Musharof Chowdhury",
        status: "Healthy",
    },
];

const statusColor: Record<Farm["status"], string> = {
    Healthy: "#8fd17a",
    Warning: "#e6b34d",
    Critical: "#e36a6a",
};

export default function FarmInfo() {
    const [farms, setFarms] = useState<Farm[]>(initialFarms);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [draft, setDraft] = useState<Farm | null>(null);

    const selectedFarm = farms.find((f) => f.id === selectedId) || null;

    const openFarm = (farm: Farm) => {
        setSelectedId(farm.id);
        setDraft(farm);
        setIsEditing(false);
        setConfirmingDelete(false);
    };

    const closeModal = () => {
        setSelectedId(null);
        setIsEditing(false);
        setConfirmingDelete(false);
        setDraft(null);
    };

    const saveEdit = () => {
        if (!draft) return;
        setFarms((prev) => prev.map((f) => (f.id === draft.id ? draft : f)));
        setIsEditing(false);
    };

    const confirmDelete = () => {
        if (!selectedFarm) return;
        setFarms((prev) => prev.filter((f) => f.id !== selectedFarm.id));
        closeModal();
    };

    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-[#eef1e6] p-10 dark:border-gray-800">
            {/* faded background texture */}
            <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                    backgroundImage:
                        "url('/images/pexels-nc-farm-bureau-mark-20339265.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            <div className="relative text-center">
                <h2 className="mb-1 text-lg font-medium text-gray-800">
                    Your farms
                </h2>
                <p className="mb-8 text-sm text-gray-500">
                    Select a farm to view its information
                </p>

                <div className="flex flex-wrap justify-center gap-7">
                    {farms.map((farm) => (
                        <button
                            key={farm.id}
                            onClick={() => openFarm(farm)}
                            className="flex flex-col items-center gap-2.5"
                        >
                            <div className="relative flex h-[104px] w-[104px] flex-col items-center justify-center rounded-[20px] bg-brand-500 shadow-lg shadow-brand-500/25">
                                <ViewFarmInfoIcon className="h-10 w-10 text-[#f4ead9]" />
                                <div className="mt-1.5 flex items-center gap-1.5">
                                    <span
                                        className="inline-block h-1.5 w-1.5 rounded-full"
                                        style={{ backgroundColor: statusColor[farm.status] }}
                                    />
                                    <span className="text-[10px] text-[#f4ead9]">
                                        {farm.status}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    {farm.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {farm.address.split(",").slice(-2).join(",").trim()}
                                </p>
                            </div>
                        </button>
                    ))}

                    <button className="flex flex-col items-center gap-2.5">
                        <div className="flex h-[104px] w-[104px] items-center justify-center rounded-[20px] border-2 border-dashed border-gray-300 bg-white/40">
                            <PlusIcon className="h-7 w-7 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-400">Add farm</p>
                    </button>
                </div>
            </div>

            {/* Modal */}
            {selectedFarm && draft && (
                <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/45 px-4">
                    <div className="relative w-full max-w-sm rounded-2xl bg-white p-7">
                        <button
                            onClick={closeModal}
                            className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200"
                        >
                            <CloseIcon className="h-3.5 w-3.5" />
                        </button>

                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-brand-500">
                                <ViewFarmInfoIcon className="h-7 w-7 text-[#f4ead9]" />
                            </div>
                            <p className="text-base font-medium text-gray-800">
                                {selectedFarm.name}
                            </p>
                        </div>

                        {!confirmingDelete ? (
                            <>
                                <div className="space-y-1 border-t border-gray-100 pt-4 text-sm">
                                    <FieldRow
                                        label="Farm name"
                                        value={draft.name}
                                        editing={isEditing}
                                        onChange={(v) => setDraft({ ...draft, name: v })}
                                    />
                                    <FieldRow
                                        label="Address"
                                        value={draft.address}
                                        editing={isEditing}
                                        onChange={(v) => setDraft({ ...draft, address: v })}
                                    />
                                    <FieldRow
                                        label="Employees"
                                        value={String(draft.employees)}
                                        editing={isEditing}
                                        onChange={(v) =>
                                            setDraft({ ...draft, employees: Number(v) || 0 })
                                        }
                                    />
                                    <FieldRow
                                        label="Farm admin"
                                        value={draft.admin}
                                        editing={isEditing}
                                        onChange={(v) => setDraft({ ...draft, admin: v })}
                                    />
                                </div>

                                <div className="mt-5 flex gap-2.5">
                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={saveEdit}
                                                className="flex-1 rounded-lg bg-brand-500 py-2.5 text-sm font-medium text-[#f4ead9] hover:bg-brand-600"
                                            >
                                                Save changes
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setDraft(selectedFarm);
                                                    setIsEditing(false);
                                                }}
                                                className="flex-1 rounded-lg bg-gray-100 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="flex-1 rounded-lg bg-brand-500 py-2.5 text-sm font-medium text-[#f4ead9] hover:bg-brand-600"
                                            >
                                                Edit farm
                                            </button>
                                            <button
                                                onClick={() => setConfirmingDelete(true)}
                                                className="flex-1 rounded-lg bg-red-50 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100"
                                            >
                                                Delete farm
                                            </button>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="border-t border-gray-100 pt-4">
                                <p className="mb-4 text-sm text-gray-600">
                                    Are you sure you want to delete{" "}
                                    <span className="font-medium text-gray-800">
                                        {selectedFarm.name}
                                    </span>
                                    ? This can&apos;t be undone.
                                </p>
                                <div className="flex gap-2.5">
                                    <button
                                        onClick={confirmDelete}
                                        className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white hover:bg-red-700"
                                    >
                                        Yes, delete
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
        </div>
    );
}

function FieldRow({
    label,
    value,
    editing,
    onChange,
}: {
    label: string;
    value: string;
    editing: boolean;
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex items-center justify-between gap-3 border-t border-gray-50 py-2 first:border-t-0 first:pt-0">
            <span className="shrink-0 text-gray-500">{label}</span>
            {editing ? (
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-40 rounded-md border border-gray-200 px-2 py-1 text-right text-sm text-gray-800 outline-none focus:border-brand-500"
                />
            ) : (
                <span className="text-right font-medium text-gray-800">{value}</span>
            )}
        </div>
    );
}
