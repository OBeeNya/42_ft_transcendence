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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectMessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const directMessage_service_1 = require("./directMessage.service");
const directMessage_dto_1 = require("./directMessage.dto");
const prisma_service_1 = require("../../prisma_module/prisma.service");
const base_gateway_1 = require("../base.gateway");
let DirectMessageGateway = class DirectMessageGateway extends base_gateway_1.BaseGateway {
    constructor(directMessageService, prisma) {
        super();
        this.directMessageService = directMessageService;
        this.prisma = prisma;
        setInterval(() => {
            console.log('Current userSocketMap:');
            console.log(Array.from(this.userSocketMap.entries()));
        }, 30000);
    }
    async handlePrivateMessage(data, client) {
        console.log(`Message sent from ${data.senderId} to ${data.receiverId}`);
        try {
            const newMessage = await this.directMessageService.create(data);
            console.log('Emitting privateMessage with data:', newMessage);
            const receiverSocketId = this.userSocketMap.get(data.receiverId);
            if (receiverSocketId)
                this.server.to(receiverSocketId).emit('privateMessage', newMessage);
            this.server.to(data.receiverId.toString()).emit('privateMessage', newMessage);
            client.emit('privateMessage', newMessage);
        }
        catch (error) {
            console.error('Error while handling private message:', error);
            client.emit('error', { message: 'There was an error sending your message.',
                error: error.message });
        }
    }
    async handleGetConversation(data, client) {
        try {
            const messages = await this.directMessageService.getConversation(data.senderId, data.receiverId);
            client.emit('conversation', messages);
        }
        catch (error) {
            console.error('Error while getting conversation:', error);
            client.emit('error', { message: 'There was an error getting your conversation.',
                error: error.message });
        }
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)('privateMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [directMessage_dto_1.DirectMessageDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], DirectMessageGateway.prototype, "handlePrivateMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getConversation'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], DirectMessageGateway.prototype, "handleGetConversation", null);
DirectMessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: "*" } }),
    __metadata("design:paramtypes", [directMessage_service_1.DirectMessageService,
        prisma_service_1.PrismaService])
], DirectMessageGateway);
exports.DirectMessageGateway = DirectMessageGateway;
//# sourceMappingURL=directMessage.gateway.js.map