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
        console.log('Creating direct message with data:', data);
        try {
            const createdMessage = await this.prisma.directMessage.create({
                data: {
                    senderId: data.senderId,
                    receiverId: data.receiverId,
                    content: data.content,
                },
            });
            console.log('Direct message created:', createdMessage);
            return (createdMessage);
        }
        catch (error) {
            console.error('Error while creating direct message:', error);
            throw error;
        }
    }
    async getConversation(senderId, receiverId) {
        console.log(`Getting conversation between ${senderId} and ${receiverId}`);
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
            console.log(`Got ${messages.length} messages`);
            return (messages);
        }
        catch (error) {
            console.error('Error while getting conversation:', error);
            throw error;
        }
    }
    async blockUser(blockerId, blockedId) {
        return this.prisma.userBlock.create({
            data: {
                userId: blockerId,
                blockedId: blockedId
            }
        });
    }
    async unblockUser(blockerId, blockedId) {
        return this.prisma.userBlock.delete({
            where: {
                userId_blockedId: {
                    userId: blockerId,
                    blockedId: blockedId
                }
            }
        });
    }
    async isUserBlocked(blockerId, blockedId) {
        console.log(`Checking if user ${blockerId} has blocked user ${blockedId}`);
        const block = await this.prisma.userBlock.findUnique({
            where: {
                userId_blockedId: {
                    userId: blockerId,
                    blockedId: blockedId
                }
            }
        });
        if (block !== null)
            console.log(`User ${blockerId} has blocked user ${blockedId}`);
        else
            console.log(`User ${blockerId} has not blocked user ${blockedId}`);
        return (block !== null);
    }
};
DirectMessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DirectMessageService);
exports.DirectMessageService = DirectMessageService;
//# sourceMappingURL=directMessage.service.js.map