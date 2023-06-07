"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma_module/prisma.service");
const argon = require("argon2");
const client_1 = require("@prisma/client");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const speakeasy = require("speakeasy");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        try {
            await this.prisma.user.create({
                data: {
                    name: dto.name,
                    hash,
                    oauthId: "not42",
                    tfa_key: speakeasy.generateSecret({ length: 10 }).base32,
                },
            });
            return (null);
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                console.error("sign UP error: ", error);
                if (error.code === 'P2002')
                    throw (new common_1.ForbiddenException('Credentials taken'));
            }
            throw (error);
        }
    }
    async signin(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                name: dto.name,
            },
        });
        if (!user)
            throw (new common_1.ForbiddenException('Credentials incorrect'));
        const pwdMatches = await argon.verify(user.hash, dto.password);
        if (!pwdMatches)
            throw (new common_1.ForbiddenException('Credentials incorrect'));
        return (this.signToken(user.id, user.name));
    }
    async signToken(userId, name) {
        const token = await this.jwt.signAsync({
            sub: userId,
            name,
        }, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET'),
        });
        const user = await this.prisma.user.findUnique({
            where: {
                name: name,
            },
        });
        return ({ access_token: token, tfa: user.tfa });
    }
    async sign42Token(user) {
        const payload = {
            sub: user.id,
            name: user.name,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,
        });
        return ({
            access_token: token,
        });
    }
    async setTokenCookie(token, res) {
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + (5 * 24 * 3600 * 1000)),
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map