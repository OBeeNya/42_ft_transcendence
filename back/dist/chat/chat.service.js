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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma_module/prisma.service");
let ChatService = class ChatService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchChannel(channelName) {
        return (this.prisma.chat.findMany({
            where: {
                name: {
                    contains: channelName,
                    mode: 'insensitive',
                },
            },
        }));
    }
    async setChatPassword(userId, chatId, password) {
        const chat = await this.prisma.chat.findUnique({ where: { id: chatId } });
        if (!chat)
            throw new common_1.BadRequestException(`Chat with id ${chatId} does not exist`);
        const owner = await this.prisma.userChat.findFirst({
            where: { chatId, isOwner: true },
        });
        if (owner.userId !== userId)
            throw new common_1.ForbiddenException(`Only the owner can set the password for chat with id ${chatId}`);
        await this.prisma.chat.update({
            where: { id: chatId },
            data: { password },
        });
    }
    async joinChannel(userId, chatId, password) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.BadRequestException(`User with id ${userId} does not exist`);
        const chat = await this.prisma.chat.findUnique({ where: { id: chatId } });
        if (!chat)
            throw new common_1.BadRequestException(`Chat with id ${chatId} does not exist`);
        const blockedUser = await this.prisma.userBlock.findUnique({
            where: { userId_blockedId: { userId: userId, blockedId: chatId } },
        });
        if (blockedUser)
            throw new common_1.ForbiddenException(`User with id ${userId} is blocked from chat with id ${chatId}`);
        const userChat = await this.prisma.userChat.findUnique({ where: { userId_chatId: { userId, chatId } } });
        if (userChat)
            throw new common_1.BadRequestException(`User with id ${userId} is already a member of chat with id ${chatId}`);
        if (chat.type === 'PRIVATE') {
            const owner = await this.prisma.userChat.findFirst({
                where: { chatId, isOwner: true },
            });
            if (owner.userId !== userId)
                throw new common_1.ForbiddenException(`Only the owner can add new members to a private chat`);
        }
        if (chat.type === 'PASSWORD' && chat.password !== password)
            throw new common_1.ForbiddenException(`Incorrect password for chat with id ${chatId}`);
        const newUserChat = await this.prisma.userChat.create({
            data: {
                userId,
                chatId,
                isOwner: false,
                isBlocked: false,
                permissions: 'default',
            },
        });
        return (newUserChat);
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map