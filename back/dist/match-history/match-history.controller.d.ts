import { User } from '@prisma/client';
import { MatchHistoryService } from './match-history.service';
export declare class MatchHistoryController {
    private historyService;
    constructor(historyService: MatchHistoryService);
    findAll(): Promise<import(".prisma/client").MatchHistory[]>;
    findMyMatches(user: User): Promise<import(".prisma/client").MatchHistory[]>;
    findByUserId(id: string): Promise<import(".prisma/client").MatchHistory[]>;
    findByUserName(name: string): Promise<import(".prisma/client").MatchHistory[]>;
}
