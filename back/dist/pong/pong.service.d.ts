import { PlayerDto } from './dto';
export declare class PongService {
    constructor();
    static waitingList: PlayerDto[];
    setSocket(): string;
    addPlayerToWaitingList(player: PlayerDto): void;
    removePlayerFromWaitingList(player: PlayerDto): void;
    createGame(): void;
}
