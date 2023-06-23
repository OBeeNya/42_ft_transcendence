import { Module } from "@nestjs/common";
import { SocketEvents3 } from "./pong.socket.events3"
import { DirectMessageModule } from "./directMessage.module";

@Module({
    providers: [SocketEvents3],
    imports: [DirectMessageModule],
})
export class SocketModule3 {}