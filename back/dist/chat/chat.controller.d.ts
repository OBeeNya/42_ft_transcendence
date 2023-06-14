import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    joinChannel(userId: number, chatId: number, password?: string): Promise<any>;
    setChatPassword(userId: number, chatId: number, password: string): Promise<void>;
    searchChannel(channelName: string): Promise<any>;
}
