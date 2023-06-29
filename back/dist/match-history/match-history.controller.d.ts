import { User } from '@prisma/client';
import { MatchHistoryService } from './match-history.service';
import { CreateMatchDto } from './dto';
export declare class MatchHistoryController {
    private historyService;
    constructor(historyService: MatchHistoryService);
    createMatch(dto: CreateMatchDto, user: User): void;
}
