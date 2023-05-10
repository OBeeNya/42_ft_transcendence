import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from 'express';
import { UserService } from "user/user.service";
export declare class AuthController {
    private authService;
    private configService;
    private userService;
    constructor(authService: AuthService, configService: ConfigService, userService: UserService);
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
