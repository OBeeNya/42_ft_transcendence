import { Module } from "@nestjs/common";
import { SocketEvents2 } from "./pong.socket.events2"
import { DirectMessageModule } from "./directMessage.module";

@Module({
    providers: [SocketEvents2],
    imports: [DirectMessageModule],
})
export class SocketModule2 {}