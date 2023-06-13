"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("./prisma_module/prisma.module");
const config_1 = require("@nestjs/config");
const match_history_module_1 = require("./match-history/match-history.module");
<<<<<<< HEAD
const directMessage_module_1 = require("./chat/directMessage/directMessage.module");
=======
const chat_module_1 = require("./chat/chat.module");
const pong_module_1 = require("./pong/pong.module");
const pong_socket_module_1 = require("./pong/socket/pong.socket.module");
>>>>>>> d18ca83a021e8566cf46a2820079e1b7ef2af7c1
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            match_history_module_1.MatchHistoryModule,
<<<<<<< HEAD
            directMessage_module_1.DirectMessageModule,
=======
            chat_module_1.ChatModule,
            pong_module_1.PongModule,
            pong_socket_module_1.SocketModule,
>>>>>>> d18ca83a021e8566cf46a2820079e1b7ef2af7c1
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map