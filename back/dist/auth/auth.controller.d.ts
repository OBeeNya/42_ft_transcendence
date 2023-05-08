import { ConfigService } from "@nestjs/config";
export declare class AuthController {
    private config;
    constructor(config: ConfigService);
    loginIntra(res: any): void;
}
