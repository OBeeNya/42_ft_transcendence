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
exports.IntraStrategy = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("../auth.service");
const passport_oauth2_1 = require("passport-oauth2");
const rxjs_1 = require("rxjs");
let IntraStrategy = class IntraStrategy extends (0, passport_1.PassportStrategy)(passport_oauth2_1.Strategy, 'intra-oauth') {
    constructor(auth, http, config) {
        super({
            authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
            tokenURL: 'https://api.intra.42.fr/oauth/token',
            clientID: config.get('OAUTH_INTRA_CLIENT_ID'),
            clientSecret: config.get('OAUTH_INTRA_CLIENT_SECRET'),
            callbackURL: 'http://localhost:3000/api/v1/auth/login/intra',
        });
        this.auth = auth;
        this.http = http;
    }
    async validate(access_token) {
        const obj$ = this.http.get('https://api.intra.42.fr/v2/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const { data } = await (0, rxjs_1.lastValueFrom)(obj$);
        const id = await this.auth.validateIntra(data.id);
        return (id);
    }
};
IntraStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        axios_1.HttpService,
        config_1.ConfigService])
], IntraStrategy);
exports.IntraStrategy = IntraStrategy;
//# sourceMappingURL=intra.strategy.js.map