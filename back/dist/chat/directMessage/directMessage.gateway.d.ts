import { Socket } from "socket.io";
import { DirectMessageService } from "./directMessage.service";
import { DirectMessageDto } from "./directMessage.dto";
import { PrismaService } from "prisma_module/prisma.service";
import { BlockageService } from "../blockage/blockage.service";
import { BaseGateway } from "chat/base.gateway";
export declare class DirectMessageGateway extends BaseGateway {
    private directMessageService;
    private blockageService;
    private prisma;
    constructor(directMessageService: DirectMessageService, blockageService: BlockageService, prisma: PrismaService);
    handlePrivateMessage(data: DirectMessageDto, client: Socket): Promise<void>;
    handleGetConversation(data: {
        senderId: number;
        receiverId: number;
    }, client: Socket): Promise<void>;
}
