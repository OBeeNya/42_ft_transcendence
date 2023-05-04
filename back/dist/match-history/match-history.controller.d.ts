import { MatchHistoryService } from './match-history.service';
export declare class MatchHistoryController {
    private historyService;
    constructor(historyService: MatchHistoryService);
    createHistory(): void;
}
