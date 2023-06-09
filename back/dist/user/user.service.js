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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma_module/prisma.service");
const speakeasy = require("speakeasy");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.user.findMany();
    }
    async findOneById(id) {
        if (!isNaN(Number(id))) {
            const idNumber = Number(id);
            return await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: idNumber
                }
            });
        }
        else
            throw new Error(`Invalid ID value: ${id}`);
    }
    async findOneByName(name) {
        return (await this.prisma.user.findFirst({
            where: {
                name: name,
            }
        }));
    }
    async editUser(userId, dto) {
        let user;
        if (dto.name != '') {
            user = await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    name: dto.name,
                },
            });
        }
        if (dto.connected !== undefined) {
            user = await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    connected: dto.connected,
                },
            });
        }
        if (dto.tfa !== undefined) {
            user = await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    tfa: dto.tfa,
                },
            });
        }
        if (dto.wins !== undefined) {
            user = await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    wins: dto.wins,
                },
            });
        }
        if (dto.losses !== undefined) {
            user = await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    losses: dto.losses,
                },
            });
        }
        if (dto.exp !== undefined) {
            user = await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    exp: Math.ceil(dto.exp),
                },
            });
        }
        if (dto.ladder !== undefined) {
            user = await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    ladder_level: dto.ladder,
                },
            });
        }
        if (dto.playing !== undefined) {
            user = await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    playing: dto.playing,
                },
            });
        }
        delete user.hash;
        return (user);
    }
    async deleteUserById(id) {
        const deleteUser = await this.prisma.user.delete({
            where: {
                id: Number(id),
            },
            select: {
                name: true,
            }
        });
        const nbOfUsersAfterDelete = await this.prisma.user.count();
        return { deletedUsers: 1, nbUsers: Number(nbOfUsersAfterDelete) };
    }
    async deleteMe(name) {
        const deleteUser = await this.prisma.user.delete({
            where: {
                name: name,
            },
            select: {
                name: true,
            }
        });
        const nbOfUsersAfterDelete = await this.prisma.user.count();
        return { deletedUsers: 1, nbUsers: Number(nbOfUsersAfterDelete) };
    }
    async create42User(dto) {
        return (await this.prisma.user.create({
            data: {
                name: dto.name,
                oauthId: dto.oauthId,
                hash: dto.hash,
                tfa_key: speakeasy.generateSecret({ length: 10 }).base32,
            },
        }));
    }
    async find42User(id) {
        return (await this.prisma.user.findFirst({
            where: {
                oauthId: id,
            },
        }));
    }
    async qrcode(name) {
        const user = await this.prisma.user.findFirst({
            where: {
                name: name,
            }
        });
        return (user.tfa_key);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map