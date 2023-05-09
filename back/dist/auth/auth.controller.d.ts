import { AuthDto } from "./dto";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from 'express';
import { UserService } from "user/user.service";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private configService;
    private userService;
    private authService;
    constructor(configService: ConfigService, userService: UserService, authService: AuthService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    login42(): Promise<{
        url: string;
    }>;
    callback42(req: Request, res: Response): Promise<void>;
}
