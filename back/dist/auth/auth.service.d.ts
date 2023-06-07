import { PrismaService } from "../prisma_module/prisma.service";
import { AuthDto, SigninDto, TokenInputDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from 'express';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): unknown;
    signin(dto: SigninDto): unknown;
    signToken(userId: number, name: string): unknown;
    sign42Token(user: TokenInputDto): unknown;
    setTokenCookie(token: string, res: Response): any;
}
