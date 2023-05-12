import { AuthService } from "./auth.service";
import { AuthDto, SigninDto } from "./dto";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from 'express';
import { UserService } from "user/user.service";
import { HttpService } from "@nestjs/axios";
export declare class AuthController {
    private authService;
    private configService;
    private userService;
    private httpService;
    constructor(authService: AuthService, configService: ConfigService, userService: UserService, httpService: HttpService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signin(dto: SigninDto): Promise<{
        access_token: string;
    }>;
    login42(): Promise<{
        url: string;
    }>;
    callback42(req: Request, res: Response): Promise<void>;
}
