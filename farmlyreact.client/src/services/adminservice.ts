import { AdminUser } from "../types/userManagement";

let mockAdmins: AdminUser[] = [
    {
        id: "1",
        name: "Thabo",
        surname: "Mokoena",
        email: "thabo@farmly.com",
        phone_number: "071 234 5678",
        user_role: "Admin",
        hash_pass: "hashed_pw_1",
        avatar_url: "/images/user/owner.jpg",
        created_at: new Date().toISOString(),
    },
];

export async function getAdmins(): Promise<AdminUser[]> {
    return Promise.resolve(mockAdmins);
}

export async function addAdmin(
    data: Omit<AdminUser, "id" | "created_at">
): Promise<AdminUser> {
    const newAdmin: AdminUser = {
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
    };
    mockAdmins = [...mockAdmins, newAdmin];
    return Promise.resolve(newAdmin);
}

export async function deleteAdmin(id: string): Promise<void> {
    mockAdmins = mockAdmins.filter((a) => a.id !== id);
    return Promise.resolve();
}