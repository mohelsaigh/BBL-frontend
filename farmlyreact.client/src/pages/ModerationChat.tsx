import { useState, useEffect } from "react";
import PageMeta from "../components/common/PageMeta";
import PageBreadCrumb from "../components/common/PageBreadCrumb";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import Badge from "../components/ui/badge/Badge";
import { ChatIcon, CheckCircleIcon, EyeIcon } from "../icons";
import { ChatMessage } from "../types/chatModeration";
import {
    getMessages,
    updateMessageStatus,
} from "../services/chatModerationService";

// ─── Stat card ───────────────────────────────────────────────────────────────
// Glass effect: semi-transparent white background + backdrop blur
function StatCard({
    icon,
    label,
    count,
    accent,
}: {
    icon: React.ReactNode;
    label: string;
    count: number;
    accent: string; // tailwind bg colour for the icon bubble
}) {
    return (
        <div className="flex flex-1 items-center gap-4 rounded-2xl border border-white/60 bg-white/40 p-5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accent}`}
            >
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                <p className="mt-0.5 text-2xl font-bold text-gray-800 dark:text-white">
                    {count}
                </p>
            </div>
        </div>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ModerationChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        getMessages().then(setMessages);
    }, []);

    // Counts derived from live data — update automatically when you flag/safe a message
    const newCount = messages.filter((m) => m.status === "new").length;
    const flaggedCount = messages.filter((m) => m.status === "flagged").length;
    const safeCount = messages.filter((m) => m.status === "safe").length;

    const handleFlag = (id: string) => {
        updateMessageStatus(id, "flagged").then((updated) => {
            setMessages((prev) =>
                prev.map((m) => (m.id === updated.id ? updated : m))
            );
        });
    };

    const handleSafe = (id: string) => {
        updateMessageStatus(id, "safe").then((updated) => {
            setMessages((prev) =>
                prev.map((m) => (m.id === updated.id ? updated : m))
            );
        });
    };

    return (
        <>
            <PageMeta
                title="Moderate Chat | Farmly"
                description="Review and moderate incoming social messages"
            />
            <PageBreadCrumb pageTitle="Moderate Chat" />

            {/* ── Stat cards on a soft gradient banner ── */}
            <div className="mb-6 rounded-2xl bg-gradient-to-r from-brand-500/10 to-brand-500/5 p-6 dark:from-brand-500/20 dark:to-transparent">
                <div className="flex flex-col gap-4 sm:flex-row">
                    <StatCard
                        icon={<ChatIcon className="h-6 w-6 text-brand-500" />}
                        label="New messages"
                        count={newCount}
                        accent="bg-brand-50 dark:bg-brand-500/20"
                    />
                    <StatCard
                        icon={
                            // No flag icon in the set — use a red warning dot styled span
                            <span className="flex h-6 w-6 items-center justify-center text-lg font-bold text-error-500">
                                !
                            </span>
                        }
                        label="Flagged messages"
                        count={flaggedCount}
                        accent="bg-error-50 dark:bg-error-500/20"
                    />
                    <StatCard
                        icon={<CheckCircleIcon className="h-6 w-6 text-success-500" />}
                        label="Viewed & safe"
                        count={safeCount}
                        accent="bg-success-50 dark:bg-success-500/20"
                    />
                </div>
            </div>

            {/* ── Messages table ── */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                {/* Table heading */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-white/[0.05]">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white">
                        Incoming messages
                    </h3>
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                </div>

                <div className="max-w-full overflow-x-auto">
                    <Table>
                        {/* Header row — same className pattern as BasicTableOne */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                {[
                                    "Username",
                                    "Role",
                                    "Message",
                                    "Media",
                                    "Status",
                                    "Actions",
                                ].map((heading) => (
                                    <TableCell
                                        key={heading}
                                        isHeader
                                        className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        {heading}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {messages.map((msg) => (
                                <TableRow key={msg.id}>
                                    {/* Username */}
                                    <TableCell className="px-5 py-4 text-start">
                                        <span className="block text-theme-sm font-medium text-gray-800 dark:text-white/90">
                                            {msg.username}
                                        </span>
                                    </TableCell>

                                    {/* Role */}
                                    <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                        {msg.user_role}
                                    </TableCell>

                                    {/* Message — truncated so long messages don't break layout */}
                                    <TableCell className="max-w-[260px] px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                        <span className="line-clamp-2">{msg.message}</span>
                                    </TableCell>

                                    {/* Media ID */}
                                    <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                        {msg.media_id ? (
                                            <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-xs text-gray-600 dark:bg-white/10 dark:text-gray-300">
                                                {msg.media_id}
                                            </span>
                                        ) : (
                                            <span className="text-gray-300 dark:text-gray-600">
                                                —
                                            </span>
                                        )}
                                    </TableCell>

                                    {/* Status badge */}
                                    <TableCell className="px-5 py-4 text-start">
                                        <Badge
                                            size="sm"
                                            color={
                                                msg.status === "flagged"
                                                    ? "error"
                                                    : msg.status === "safe"
                                                        ? "success"
                                                        : "info"
                                            }
                                        >
                                            {msg.status === "new"
                                                ? "New"
                                                : msg.status === "flagged"
                                                    ? "Flagged"
                                                    : "Safe"}
                                        </Badge>
                                    </TableCell>

                                    {/* Action buttons — only show relevant ones based on current status */}
                                    <TableCell className="px-5 py-4 text-start">
                                        <div className="flex items-center gap-2">
                                            {msg.status !== "flagged" && (
                                                <button
                                                    onClick={() => handleFlag(msg.id)}
                                                    className="rounded-lg bg-error-50 px-3 py-1.5 text-xs font-medium text-error-600 hover:bg-error-100 dark:bg-error-500/15 dark:text-error-400"
                                                >
                                                    Flag
                                                </button>
                                            )}
                                            {msg.status !== "safe" && (
                                                <button
                                                    onClick={() => handleSafe(msg.id)}
                                                    className="rounded-lg bg-success-50 px-3 py-1.5 text-xs font-medium text-success-600 hover:bg-success-100 dark:bg-success-500/15 dark:text-success-400"
                                                >
                                                    Safe
                                                </button>
                                            )}
                                            {/* If already both flagged and safe buttons would be hidden, show a reset */}
                                            {msg.status === "safe" && (
                                                <span className="text-xs text-gray-400">Reviewed</span>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}