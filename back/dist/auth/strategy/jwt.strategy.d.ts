import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma_module/prisma.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: number;
        name: string;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        hash: string;
        wins: number;
        losses: number;
        ladder_level: number;
        oauthId: string;
        connected: boolean;
        isPlaying: boolean;
        tfa: boolean;
        tfa_key: string;
        ladders: number[];
        wons: boolean[];
        gameDates: string[];
        exp: number;
    }, unknown, never> & {}>;
}
export {};
