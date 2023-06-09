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
var PongService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongService = void 0;
const common_1 = require("@nestjs/common");
let PongService = PongService_1 = class PongService {
    constructor() { }
    setSocket() {
        console.log("test Pong route for server socket");
        const express = require('express');
        const app2 = express();
        return ("hello socket");
    }
    addPlayerToWaitingList(player) {
        PongService_1.waitingList.push(player);
    }
    removePlayerFromWaitingList(player) {
        for (const p of PongService_1.waitingList) {
            if (p.name === player.name) {
                const index = PongService_1.waitingList.indexOf(player);
                PongService_1.waitingList.splice(index, 1);
                break;
            }
        }
    }
    createGame() {
    }
};
PongService.waitingList = [];
PongService = PongService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PongService);
exports.PongService = PongService;
//# sourceMappingURL=pong.service.js.map