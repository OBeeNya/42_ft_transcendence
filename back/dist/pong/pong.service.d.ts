export declare class PongService {
    constructor();
    static players: string[];
    setSocket(): string;
    addPlayer(add: string): void;
    removePlayer(rem: string): void;
    getPlayers(): string[];
}
