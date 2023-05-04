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
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.user.findMany();
    }
    async findOneById(id) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: {
                id: Number(id),
            }
        });
        return (user);
    }
    async findOneByName(name) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: {
                name: name,
            }
        });
        return (user);
    }
    async editUser(userId, dto) {
        const user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: dto.name,
            },
        });
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
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map