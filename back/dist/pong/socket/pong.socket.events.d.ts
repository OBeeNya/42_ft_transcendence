import { Server, Socket } from "socket.io";
export declare class SocketEvents {
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnection(client: Socket): void;
    getCounter(): void;
    heartBeat(): void;
    heartBeatBall(): void;
}
