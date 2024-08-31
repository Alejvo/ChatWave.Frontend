import { message } from "./message";

export interface userMessage{
    status: string;
    text: string;
    senderId: string;
    receiverId: string;
    sentAt: Date;
}