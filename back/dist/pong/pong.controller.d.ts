import { PongService } from './pong.service';
import { PlayerDto } from './dto';
export declare class PongController {
    private pongService;
    constructor(pongService: PongService);
    setSocket(): string;
    addPlayerToWaitingList(player: PlayerDto): void;
    removePlayerFromWaitingList(player: PlayerDto): void;
    create_game(): void;
}
