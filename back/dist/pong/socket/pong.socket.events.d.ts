import { Server, Socket } from "socket.io";
export declare class SocketEvents {
    server: Server;
    private connections;
    private readonly instancesPerConnection;
    private initialized;
    constructor();
    private initializeGateway;
    handleConnection(client: Socket): void;
    getCounter(): void;
    heartBeat(): void;
    heartBeatBall(): void;
    heartBeatScore(): void;
    startHeartbeat(): void;
    startBallHeartbeat(): void;
    startScoreHeartbeat(): void;
    afterInit(server: Server): void;
    handleDisconnect(): void;
}
