import { Injectable } from '@nestjs/common';
import { PlayerDto } from './dto';

@Injectable()
export class PongService {

	constructor() {}

    static players: number = 0;

    setSocket() {
        // console.log("test Pong route for server socket");
        const express = require('express');
        const app2 = express();
        // const server = app.listen(3002);
		return ("hello socket");
	}
    
    addPlayer() {
        PongService.players++;
    }
    
    removePlayer() {
        PongService.players--;
    }

    getPlayers() {
        return (PongService.players);
    }

}
