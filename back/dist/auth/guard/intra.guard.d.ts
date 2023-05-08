import { ExecutionContext } from "@nestjs/common";
declare const IntraGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class IntraGuard extends IntraGuard_base {
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
    handleRequest(err: any, user: any): any;
}
export {};
