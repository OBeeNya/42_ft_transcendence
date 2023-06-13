import { PongService } from './pong.service';
export declare class PongController {
    private pongService;
    constructor(pongService: PongService);
    setSocket(): string;
}
