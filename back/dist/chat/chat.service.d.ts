import { PrismaService } from '../prisma_module/prisma.service';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    searchChannel(channelName: string): unknown;
    setChatPassword(userId: number, chatId: number, password: string): any;
    joinChannel(userId: number, chatId: number, password?: string): unknown;
}
