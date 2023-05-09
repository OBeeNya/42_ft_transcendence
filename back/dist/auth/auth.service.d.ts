import { PrismaService } from "../prisma_module/prisma.service";
import { AuthDto } from "./dto";
import { TokenInputDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from 'express';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, name: string): Promise<{
        access_token: string;
    }>;
    sign42Token(user: TokenInputDto): Promise<string>;
    setTokenCookie(access_token: string, res: Response): Promise<void>;
}
