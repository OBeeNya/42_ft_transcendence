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
exports.PongController = void 0;
const common_1 = require("@nestjs/common");
const pong_service_1 = require("./pong.service");
const guard_1 = require("../auth/guard");
let PongController = class PongController {
    constructor(pongService) {
        this.pongService = pongService;
    }
    setSocket() {
        console.log("controller pong");
        return this.pongService.setSocket();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PongController.prototype, "setSocket", null);
PongController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('pong'),
    __metadata("design:paramtypes", [pong_service_1.PongService])
], PongController);
exports.PongController = PongController;
//# sourceMappingURL=pong.controller.js.map