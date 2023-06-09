import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
declare const IntraStrategy_base: new (...args: any[]) => any;
export declare class IntraStrategy extends IntraStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(_at: string, _rt: string, profile: Profile): Promise<{
        profile: Profile;
    }>;
}
export {};
