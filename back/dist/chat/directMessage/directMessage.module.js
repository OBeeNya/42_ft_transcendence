"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectMessageModule = void 0;
const common_1 = require("@nestjs/common");
const directMessage_gateway_1 = require("./directMessage.gateway");
const directMessage_service_1 = require("./directMessage.service");
const prisma_service_1 = require("../../prisma_module/prisma.service");
let DirectMessageModule = class DirectMessageModule {
};
DirectMessageModule = __decorate([
    (0, common_1.Module)({
        providers: [directMessage_gateway_1.DirectMessageGateway, directMessage_service_1.DirectMessageService, prisma_service_1.PrismaService]
    })
], DirectMessageModule);
exports.DirectMessageModule = DirectMessageModule;
//# sourceMappingURL=directMessage.module.js.map