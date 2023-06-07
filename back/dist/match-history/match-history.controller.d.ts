import { User } from '@prisma/client';
import { MatchHistoryService } from './match-history.service';
export declare class MatchHistoryController {
    private historyService;
    constructor(historyService: MatchHistoryService);
    findAll(): unknown;
    findMyMatches(user: User): unknown;
    findByUserId(id: string): unknown;
    findByUserName(name: string): unknown;
}
