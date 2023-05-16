import { PrismaService } from "../prisma_module/prisma.service";
import { AuthDto, SigninDto, TokenInputDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from 'express';
import { HttpService } from "@nestjs/axios";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    private httpService;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService, httpService: HttpService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signin(dto: SigninDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, name: string): Promise<{
        access_token: string;
    }>;
    sign42Token(user: TokenInputDto): Promise<{
        access_token: string;
    }>;
    setTokenCookie(token: string, res: Response): Promise<void>;
}
