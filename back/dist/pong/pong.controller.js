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
exports.PongController = void 0;
const common_1 = require("@nestjs/common");
const pong_service_1 = require("./pong.service");
const guard_1 = require("../auth/guard");
const dto_1 = require("./dto");
let PongController = class PongController {
    constructor(pongService) {
        this.pongService = pongService;
    }
    setSocket() {
        return this.pongService.setSocket();
    }
    addPlayerToWaitingList(player) {
        return (this.pongService.addPlayerToWaitingList(player));
    }
    removePlayerFromWaitingList(player) {
        return (this.pongService.removePlayerFromWaitingList(player));
    }
    create_game() {
        return (this.pongService.createGame());
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PongController.prototype, "setSocket", null);
__decorate([
    (0, common_1.Post)('addPlayerToWaitingList'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PlayerDto]),
    __metadata("design:returntype", void 0)
], PongController.prototype, "addPlayerToWaitingList", null);
__decorate([
    (0, common_1.Post)('removePlayerFromWaitingList'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PlayerDto]),
    __metadata("design:returntype", void 0)
], PongController.prototype, "removePlayerFromWaitingList", null);
__decorate([
    (0, common_1.Post)('createGame'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PongController.prototype, "create_game", null);
PongController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('pong'),
    __metadata("design:paramtypes", [pong_service_1.PongService])
], PongController);
exports.PongController = PongController;
//# sourceMappingURL=pong.controller.js.map