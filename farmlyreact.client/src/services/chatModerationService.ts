import { ChatMessage, MessageStatus } from "../types/chatModeration";

let mockMessages: ChatMessage[] = [
    {
        id: "1",
        username: "thabo_m",
        user_role: "Admin",
        message: "Hey everyone, the new harvest report is up!",
        media_id: null,
        status: "new",
        created_at: new Date().toISOString(),
    },
    {
        id: "2",
        username: "lindiwe_d",
        user_role: "Moderator",
        message: "Check out this photo from the fish tanks 🐟",
        media_id: "IMG_20240601_001",
        status: "new",
        created_at: new Date().toISOString(),
    },
    {
        id: "3",
        username: "anon_user99",
        user_role: "Member",
        message: "This content seems inappropriate...",
        media_id: null,
        status: "flagged",
        created_at: new Date().toISOString(),
    },
    {
        id: "4",
        username: "sipho_k",
        user_role: "Member",
        message: "Great work on the lettuce beds this week!",
        media_id: null,
        status: "safe",
        created_at: new Date().toISOString(),
    },
    {
        id: "5",
        username: "farmly_bot",
        user_role: "System",
        message: "Automated water quality report attached.",
        media_id: "RPT_WQ_20240601",
        status: "safe",
        created_at: new Date().toISOString(),
    },
];

export async function getMessages(): Promise<ChatMessage[]> {
    return Promise.resolve(mockMessages);
}

export async function updateMessageStatus(
    id: string,
    status: MessageStatus
): Promise<ChatMessage> {
    mockMessages = mockMessages.map((m) =>
        m.id === id ? { ...m, status } : m
    );
    const updated = mockMessages.find((m) => m.id === id)!;
    return Promise.resolve(updated);
}