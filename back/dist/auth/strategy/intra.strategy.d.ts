import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "auth/auth.service";
declare const IntraStrategy_base: new (...args: any[]) => any;
export declare class IntraStrategy extends IntraStrategy_base {
    private auth;
    private http;
    constructor(auth: AuthService, http: HttpService, config: ConfigService);
}
export {};
