import { PongService } from './pong.service';
export declare class PongController {
    private pongService;
    constructor(pongService: PongService);
    setSocket(): string;
    addPlayer(add: string): void;
    removePlayer(rem: string): void;
    getPlayers(): number;
}
