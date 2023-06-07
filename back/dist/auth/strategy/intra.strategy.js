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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntraStrategy = void 0;
const passport_42_1 = require("passport-42");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let IntraStrategy = class IntraStrategy extends (0, passport_1.PassportStrategy)(passport_42_1.Strategy, '42') {
    constructor(configService) {
        super({
            clientID: configService.get('OAUTH_INTRA_CLIENT_ID'),
            clientSecret: configService.get('OAUTH_INTRA_CLIENT_SECRET'),
            callbackURL: `http://localhost:8080/auth/callback/42`,
            profileFields: {
                id: (obj) => { return String(obj.id); },
                name: 'login',
            },
        });
        this.configService = configService;
    }
    async validate(_at, _rt, profile) {
        if (profile && profile.id && profile.name) {
            return { profile };
        }
        else {
            throw new Error('connect to 42 failed due to invalid profile');
        }
    }
};
IntraStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], IntraStrategy);
exports.IntraStrategy = IntraStrategy;
//# sourceMappingURL=intra.strategy.js.map