import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient {
    private _chat;
    get chat(): any;
    set chat(value: any);
    private _userBlock;
    get userBlock(): any;
    set userBlock(value: any);
    private _userChat;
    get userChat(): any;
    set userChat(value: any);
    constructor(config: ConfigService);
    cleanDb(): any;
}
