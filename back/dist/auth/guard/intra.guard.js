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
exports.IntraGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let IntraGuard = class IntraGuard extends (0, passport_1.AuthGuard)('intra-oauth') {
    constructor() {
        super();
    }
    async canActivate(context) {
        const activate = (await super.canActivate(context));
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return (activate);
    }
    handleRequest(err, user) {
        if (err || !user)
            throw (new common_1.HttpException('failed to login', err.status));
        return (user);
    }
};
IntraGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], IntraGuard);
exports.IntraGuard = IntraGuard;
//# sourceMappingURL=intra.guard.js.map