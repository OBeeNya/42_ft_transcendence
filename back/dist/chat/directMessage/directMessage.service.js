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
exports.DirectMessageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma_module/prisma.service");
let DirectMessageService = class DirectMessageService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            const blockExists = await this.prisma.userBlock.findFirst({
                where: {
                    OR: [
                        { userId: data.senderId, blockedId: data.receiverId },
                        { userId: data.receiverId, blockedId: data.senderId }
                    ]
                }
            });
            if (blockExists)
                throw new Error("Message cannot be sent. One user has blocked the other.");
            const createdMessage = await this.prisma.directMessage.create({
                data: {
                    senderId: data.senderId,
                    receiverId: data.receiverId,
                    content: data.content,
                },
            });
            return (createdMessage);
        }
        catch (error) {
            console.error('Error while creating direct message:', error);
            throw error;
        }
    }
    async getConversation(senderId, receiverId) {
        try {
            const messages = await this.prisma.directMessage.findMany({
                where: {
                    OR: [
                        { senderId: senderId, receiverId: receiverId },
                        { senderId: receiverId, receiverId: senderId }
                    ]
                },
                orderBy: {
                    createdAt: 'asc',
                }
            });
            return (messages);
        }
        catch (error) {
            console.error('Error while getting conversation:', error);
            throw error;
        }
    }
};
DirectMessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DirectMessageService);
exports.DirectMessageService = DirectMessageService;
//# sourceMappingURL=directMessage.service.js.map