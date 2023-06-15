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
exports.MatchHistoryController = void 0;
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
const match_history_service_1 = require("./match-history.service");
let MatchHistoryController = class MatchHistoryController {
    constructor(historyService) {
        this.historyService = historyService;
    }
    findAll() {
        return this.historyService.findAll();
    }
    findMyMatches(user) {
        return this.historyService.findByUserId(user.id.toString());
    }
    findByUserId(id) {
        return this.historyService.findByUserId(id);
    }
    findByUserName(name) {
        return this.historyService.findByUserName(name);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MatchHistoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("me"),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MatchHistoryController.prototype, "findMyMatches", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MatchHistoryController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Get)("name/:name"),
    __param(0, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MatchHistoryController.prototype, "findByUserName", null);
MatchHistoryController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('match-history'),
    __metadata("design:paramtypes", [match_history_service_1.MatchHistoryService])
], MatchHistoryController);
exports.MatchHistoryController = MatchHistoryController;
//# sourceMappingURL=match-history.controller.js.map