import { Server, Socket } from "socket.io";
export declare class SocketEvents {
    server: Server;
    handleConnection(client: Socket): void;
    getNames(): void;
    getCounter(): void;
    heartBeat(): void;
    heartBeatBall(): void;
    startHeartbeat(): void;
    startBallHeartbeat(): void;
    afterInit(): void;
    handleDisconnect(client: Socket): void;
}
