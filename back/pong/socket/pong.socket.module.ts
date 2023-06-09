import { Module } from "@nestjs/common";
import { SocketEvents } from "./pong.socket.events"

@Module({
    providers: [SocketEvents]
})
export class SocketModule {}