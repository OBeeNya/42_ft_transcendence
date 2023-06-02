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
    signup(dto: AuthDto): Promise<any>;
    signin(dto: SigninDto): Promise<{
        access_token: string;
        tfa: boolean;
    }>;
    login42(): Promise<{
        url: string;
    }>;
    callback42(req: Request, res: Response): Promise<void>;
}
