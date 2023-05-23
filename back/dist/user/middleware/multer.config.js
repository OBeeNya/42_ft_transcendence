"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterConfig = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
exports.MulterConfig = {
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new common_1.UnauthorizedException('Only .jpg, .jpeg and .png extensions are allowed'), false);
        }
        callback(null, true);
    },
    dest: './public',
    storage: (0, multer_1.diskStorage)({
        destination: '../front/public/avatar/',
        filename: (req, file, callback) => {
            const filename = req.user.id + '.png';
            callback(null, filename);
        },
    }),
};
//# sourceMappingURL=multer.config.js.map