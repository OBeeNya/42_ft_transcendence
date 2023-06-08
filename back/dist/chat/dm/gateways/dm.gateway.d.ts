import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { DirectMessageService } from '../services/dm.service';
export declare class DmGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private dmService;
    constructor(dmService: DirectMessageService);
    wss: Server;
    private logger;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleMessage(client: Socket, payload: {
        senderId: number;
        receiverId: number;
        content: string;
    }): Promise<void>;
    handleGetHistory(client: Socket, payload: {
        senderId: number;
        receiverId: number;
    }): Promise<void>;
}
