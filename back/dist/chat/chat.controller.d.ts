import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    joinChannel(userId: number, chatId: number, password?: string): unknown;
    setChatPassword(userId: number, chatId: number, password: string): unknown;
    searchChannel(channelName: string): unknown;
}
