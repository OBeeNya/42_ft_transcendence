import { PrismaService } from "../../prisma_module/prisma.service";
import { DirectMessageDto } from './directMessage.dto';
import { DirectMessage, UserBlock } from '@prisma/client';
import { BlockageDto } from './blockage.dto';
export declare class DirectMessageService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: DirectMessageDto): Promise<DirectMessage>;
    getConversation(senderId: number, receiverId: number): Promise<DirectMessage[]>;
    blockUser(data: BlockageDto): Promise<UserBlock>;
    isUserBlocked(blockerId: number, blockedId: number): Promise<boolean>;
}
