"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntraGuard = void 0;
const passport_1 = require("@nestjs/passport");
class IntraGuard extends (0, passport_1.AuthGuard)('42') {
}
exports.IntraGuard = IntraGuard;
//# sourceMappingURL=intra.guard.js.map