import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../prisma_module/prisma.service";
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: number;
        name: string;
    }): unknown;
}
export {};
