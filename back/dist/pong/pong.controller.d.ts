import { PongService } from './pong.service';
import { PlayerDto } from './dto';
export declare class PongController {
    private pongService;
    constructor(pongService: PongService);
    setSocket(): string;
    addPlayerToWaitingList(player: PlayerDto): Promise<PlayerDto[]>;
    removePlayerFromWaitingList(player: PlayerDto): Promise<void>;
    emptyWaitingList(): Promise<void>;
    getWaitingList(): PlayerDto[];
}
