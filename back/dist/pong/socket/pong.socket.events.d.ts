import { Server, Socket } from "socket.io";
import { DirectMessageService } from "./directMessage.service";
import { DirectMessageDto } from "./directMessage.dto";
export declare class SocketEvents {
    private directMessageService;
    private userSocketMap;
    constructor(directMessageService: DirectMessageService);
    server: Server;
    handleConnection(client: Socket): void;
    getCounter(): void;
    heartBeat(): void;
    heartBeatBall(): void;
    startHeartbeat(): void;
    startBallHeartbeat(): void;
    afterInit(): void;
    handleDisconnect(client: Socket): void;
    handleUserConnected(userId: number, client: Socket): void;
    handlePrivateMessage(data: DirectMessageDto, client: Socket): Promise<void>;
    handleGetConversation(data: {
        senderId: number;
        receiverId: number;
    }, client: Socket): Promise<void>;
}
