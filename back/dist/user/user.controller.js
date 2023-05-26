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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
const dto_1 = require("./dto");
const user_service_1 = require("./user.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("./middleware/multer.config");
const speakeasy = require("speakeasy");
var QRCode = require('qrcode');
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(name) {
        return this.userService.findOneByName(name);
    }
    getMe(user) {
        return (user);
    }
    findOneByName(name) {
        return this.userService.findOneByName(name);
    }
    findOneById(id) {
        return this.userService.findOneById(id);
    }
    editUser(userId, dto) {
        return (this.userService.editUser(userId, dto));
    }
    deleteUserById(id) {
        return this.userService.deleteUserById(id);
    }
    deleteMe(user) {
        return this.userService.deleteMe(user.name);
    }
    uploadAvatar(file) {
        return (file);
    }
    async qrcode(name) {
        const key = await this.userService.qrcode(name.name);
        const otpAuthUrl = speakeasy.otpauthURL({
            secret: key,
            label: "transcendence",
            issuer: "42",
        });
        return (QRCode.toDataURL(otpAuthUrl));
    }
    async verifyCode(elements) {
        const key = await this.userService.qrcode(elements.name);
        const user = await this.userService.findOneByName(elements.name);
        const secret = user.tfa_key;
        var token = speakeasy.totp({
            secret: secret,
            encoding: 'base32'
        });
        console.log("TOKEN: ", token);
        return (speakeasy.totp.verify({
            secret: key,
            encoding: 'base32',
            token: elements.otp,
            window: 6,
        }));
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)("name/:name"),
    __param(0, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOneByName", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.EditUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "editUser", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUserById", null);
__decorate([
    (0, common_1.Delete)("me/me"),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteMe", null);
__decorate([
    (0, common_1.Post)('avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_config_1.MulterConfig)),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Post)('qrcode'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "qrcode", null);
__decorate([
    (0, common_1.Post)('qrcode/verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QrcodeVerifyDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyCode", null);
UserController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map