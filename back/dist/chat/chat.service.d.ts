import { PrismaService } from '../prisma_module/prisma.service';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    searchChannel(channelName: string): Promise<any>;
    setChatPassword(userId: number, chatId: number, password: string): Promise<void>;
    joinChannel(userId: number, chatId: number, password?: string): Promise<any>;
}
