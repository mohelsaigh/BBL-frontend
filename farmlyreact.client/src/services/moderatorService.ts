import { ModeratorUser } from "../types/userManagement";

let mockModerators: ModeratorUser[] = [
    {
        id: "1",
        name: "Lindiwe",
        surname: "Dube",
        email: "lindiwe@farmly.com",
        phone_number: "082 345 6789",
        user_role: "Moderator",
        hash_pass: "hashed_pw_2",
        avatar_url: "/images/user/owner.jpg",
        status: "active",
        created_at: new Date().toISOString(),
    },
];

export async function getModerators(): Promise<ModeratorUser[]> {
    return Promise.resolve(mockModerators);
}

export async function addModerator(
    data: Omit<ModeratorUser, "id" | "created_at">
): Promise<ModeratorUser> {
    const newMod: ModeratorUser = {
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
    };
    mockModerators = [...mockModerators, newMod];
    return Promise.resolve(newMod);
}

export async function updateModeratorStatus(
    id: string,
    status: "active" | "disabled"
): Promise<ModeratorUser> {
    mockModerators = mockModerators.map((m) =>
        m.id === id ? { ...m, status } : m
    );
    const updated = mockModerators.find((m) => m.id === id)!;
    return Promise.resolve(updated);
}

export async function deleteModerator(id: string): Promise<void> {
    mockModerators = mockModerators.filter((m) => m.id !== id);
    return Promise.resolve();
}