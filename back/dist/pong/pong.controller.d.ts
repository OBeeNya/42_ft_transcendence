import { PongService } from './pong.service';
import { PlayerDto } from './dto';
export declare class PongController {
    private pongService;
    constructor(pongService: PongService);
    setSocket(): string;
    addPlayer(add: PlayerDto): void;
    removePlayer(rem: PlayerDto): void;
    getPlayers(): string[];
}
