export type MessageStatus = "new" | "flagged" | "safe";

export interface ChatMessage {
    id: string;
    username: string;
    user_role: string;
    message: string;
    media_id: string | null;   // null means no media attached
    status: MessageStatus;
    created_at: string;
}