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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const config_1 = require("@nestjs/config");
const guard_1 = require("./guard");
const express_1 = require("express");
const user_service_1 = require("../user/user.service");
const crypto = require("crypto");
const axios_1 = require("@nestjs/axios");
let AuthController = class AuthController {
    constructor(authService, configService, userService, httpService) {
        this.authService = authService;
        this.configService = configService;
        this.userService = userService;
        this.httpService = httpService;
    }
    signup(dto) {
        return (this.authService.signup(dto));
    }
    signin(dto) {
        return (this.authService.signin(dto));
    }
    async login42() {
        let url = 'https://api.intra.42.fr/oauth/authorize';
        url += '?client_id=';
        url += this.configService.get('OAUTH_INTRA_CLIENT_ID');
        url += '&redirect_uri=http://localhost:8080/auth/callback/42';
        url += '&response_type=code';
        return ({ url: url });
    }
    async callback42(req, res) {
        if (req.user == undefined)
            throw (new common_1.UnauthorizedException('profile is undefined'));
        const current_user = req.user;
        let user = await this.userService.find42User(current_user.profile.id.toString());
        if (!user) {
            const prev_user = await this.userService.findOneByName(current_user.profile.name);
            let new_name;
            if (!prev_user)
                new_name = current_user.profile.name;
            else
                new_name = current_user.profile.name + '_';
            const new_user = {
                name: new_name,
                oauthId: current_user.profile.id,
                hash: crypto.randomBytes(50).toString('hex'),
            };
            user = await this.userService.create42User({
                name: new_user.name,
                oauthId: new_user.oauthId,
                hash: new_user.hash,
            });
            var fs = require('fs');
            const writer = fs.createWriteStream('../front/public/avatar/' + user.id + '.png');
            const imageUrl = JSON.parse(current_user.profile._raw).image.link;
            const response = await this.httpService.axiosRef({
                url: imageUrl,
                method: 'GET',
                responseType: 'stream',
            });
            response.data.pipe(writer);
        }
        const token = await this.authService.sign42Token({
            id: user.id,
            name: user.name,
        });
        await this.authService.setTokenCookie(token.access_token, res);
        res.redirect('http://localhost:3000/callback42?token=' + token.access_token);
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SigninDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signin", null);
__decorate([
    (0, common_1.Get)('/login/42'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login42", null);
__decorate([
    (0, common_1.Get)('/callback/42'),
    (0, common_1.UseGuards)(guard_1.IntraGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "callback42", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, user_service_1.UserService, typeof (_b = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _b : Object])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map