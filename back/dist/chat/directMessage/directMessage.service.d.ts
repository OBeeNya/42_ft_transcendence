import { PrismaService } from "../../prisma_module/prisma.service";
import { DirectMessageDto } from './directMessage.dto';
import { DirectMessage } from '@prisma/client';
export declare class DirectMessageService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: DirectMessageDto): Promise<DirectMessage>;
    getConversation(senderId: number, receiverId: number): Promise<DirectMessage[]>;
}
