import { UserService } from "user/user.service";
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    validateIntra(intraId: string): Promise<void>;
}
