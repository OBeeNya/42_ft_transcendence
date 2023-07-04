import { OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
export declare class SocketEvents implements OnGatewayInit {
    server: Server;
    constructor();
    handleConnection(client: Socket): void;
    getCounter(): void;
    heartBeat(): void;
    heartBeatBall(): void;
    heartBeatScore(): void;
    startHeartbeat(): void;
    startBallHeartbeat(): void;
    startScoreHeartbeat(): void;
    afterInit(): void;
    handleDisconnect(): void;
}
