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
let DirectMessageGateway = class DirectMessageGateway {
    constructor(directMessageService) {
        this.directMessageService = directMessageService;
        this.userSocketMap = new Map();
    }
    afterInit(server) {
        console.log('Initialized!');
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleUserConnected(userId, client) {
        this.userSocketMap.set(userId, client.id);
        console.log(`User ${userId} connected with socket id ${client.id}`);
    }
    async handleBlockUser(data, client) {
        try {
            await this.directMessageService.blockUser(data.blockerId, data.blockedId);
            client.emit('userBlocked', { blockerId: data.blockerId, blockedId: data.blockedId });
        }
        catch (error) {
            console.error('Error while blocking user:', error);
            client.emit('error', { message: 'There was an error blocking the user.', error: error.message });
        }
    }
    async handleUnblockUser(data, client) {
        try {
            await this.directMessageService.unblockUser(data.blockerId, data.blockedId);
            client.emit('userUnblocked', { blockerId: data.blockerId, blockedId: data.blockedId });
        }
        catch (error) {
            console.error('Error while unblocking user:', error);
            client.emit('error', { message: 'There was an error unblocking the user.', error: error.message });
        }
    }
    async handlePrivateMessage(data, client) {
        try {
            if (await this.directMessageService.isUserBlocked(data.receiverId, data.senderId)) {
                client.emit('error', { message: 'You have been blocked by this user and cannot send them a message.' });
                return;
            }
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
            client.emit('error', { message: 'There was an error sending your message.', error: error.message });
        }
    }
    async handleGetConversation(data, client) {
        try {
            if (await this.directMessageService.isUserBlocked(data.receiverId, data.senderId)) {
                client.emit('error', { message: 'You have been blocked by this user and cannot access the conversation.' });
                return;
            }
            const messages = await this.directMessageService.getConversation(data.senderId, data.receiverId);
            client.emit('conversation', messages);
        }
        catch (error) {
            console.error('Error while getting conversation:', error);
            client.emit('error', { message: 'There was an error getting your conversation.', error: error.message });
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DirectMessageGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('userConnected'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], DirectMessageGateway.prototype, "handleUserConnected", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('blockUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], DirectMessageGateway.prototype, "handleBlockUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('unblockUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], DirectMessageGateway.prototype, "handleUnblockUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('privateMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [directMessage_dto_1.DirectMessageDto, socket_io_1.Socket]),
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
    __metadata("design:paramtypes", [directMessage_service_1.DirectMessageService])
], DirectMessageGateway);
exports.DirectMessageGateway = DirectMessageGateway;
//# sourceMappingURL=directMessage.gateway.js.map