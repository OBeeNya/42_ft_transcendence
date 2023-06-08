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
exports.DmGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const dm_service_1 = require("../services/dm.service");
let DmGateway = class DmGateway {
    constructor(dmService) {
        this.dmService = dmService;
        this.logger = new common_1.Logger('DMGateway');
    }
    afterInit(server) {
        this.logger.log('Initialized!');
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    async handleMessage(client, payload) {
        try {
            await this.dmService.createDM(payload);
            client.to(payload.receiverId.toString()).emit('dmToClient', payload);
            client.emit('dmToClient', payload);
        }
        catch (error) {
            client.emit('error', { message: 'There was an error sending your message.' });
        }
    }
    async handleGetHistory(client, payload) {
        try {
            const history = await this.dmService.getDMs(payload.senderId, payload.receiverId);
            client.emit('history', history);
        }
        catch (error) {
            client.emit('error', { message: 'There was an error retrieving the history.' });
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DmGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('dmToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], DmGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getHistory'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], DmGateway.prototype, "handleGetHistory", null);
DmGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/dm' }),
    __metadata("design:paramtypes", [dm_service_1.DirectMessageService])
], DmGateway);
exports.DmGateway = DmGateway;
//# sourceMappingURL=dm.gateway.js.map