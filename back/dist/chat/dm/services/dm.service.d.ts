import { DirectMessage } from '@prisma/client';
import { PrismaService } from "../../../prisma_module/prisma.service";
export declare class DirectMessageService {
    private prisma;
    constructor(prisma: PrismaService);
    createDM(data: {
        senderId: number;
        receiverId: number;
        content: string;
    }): Promise<DirectMessage>;
    getDMs(senderId: number, receiverId: number): Promise<DirectMessage[]>;
}
