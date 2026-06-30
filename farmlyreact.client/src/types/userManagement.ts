export interface AdminUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    user_role: "Admin";        // always "Admin" for admins
    hash_pass: string;
    avatar_url: string;
    created_at: string;
}

export interface ModeratorUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    user_role: "Moderator";   // always "Moderator" for mods
    hash_pass: string;
    avatar_url: string;
    status: "active" | "disabled";
    created_at: string;
}