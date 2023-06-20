import { PrismaService } from "../../prisma_module/prisma.service";
import { DirectMessageDto } from './directMessage.dto';
import { DirectMessage } from '@prisma/client';
export declare class DirectMessageService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: DirectMessageDto): Promise<DirectMessage>;
    getConversation(senderId: number, receiverId: number): Promise<DirectMessage[]>;
    blockUser(blockerId: number, blockedId: number): Promise<any>;
    isUserBlocked(blockerId: number, blockedId: number): Promise<boolean>;
}
