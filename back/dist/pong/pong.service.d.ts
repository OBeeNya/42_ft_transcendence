import { PlayerDto } from './dto';
export declare class PongService {
    constructor();
    static waitingList: PlayerDto[];
    setSocket(): string;
    addPlayerToWaitingList(player: PlayerDto): Promise<PlayerDto[]>;
    removePlayerFromWaitingList(player: PlayerDto): Promise<void>;
    emptyWaitingList(): Promise<void>;
    getWaitingList(): PlayerDto[];
}
