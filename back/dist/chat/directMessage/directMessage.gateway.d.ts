import { Server, Socket } from "socket.io";
import { DirectMessageService } from "./directMessage.service";
import { DirectMessageDto } from "./directMessage.dto";
export declare class DirectMessageGateway {
    private directMessageService;
    private userSocketMap;
    constructor(directMessageService: DirectMessageService);
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleUserConnected(userId: number, client: Socket): void;
    handleBlockUser(data: {
        blockerId: number;
        blockedId: number;
    }, client: Socket): Promise<void>;
    handleUnblockUser(data: {
        blockerId: number;
        blockedId: number;
    }, client: Socket): Promise<void>;
    handlePrivateMessage(data: DirectMessageDto, client: Socket): Promise<void>;
    handleGetConversation(data: {
        senderId: number;
        receiverId: number;
    }, client: Socket): Promise<void>;
}
