export type User = string | null;

export interface Message {
    id: number,
    sender: User,
    timestamp: string,
    text: string,
    isSent: boolean
};