import { Injectable } from '@nestjs/common';

@Injectable()
export class PongService {

	constructor() {}

    static players: number = 0;

    setSocket() {
        const express = require('express');
        const app2 = express();
		return ("hello socket");
	}
    
    addPlayer() {
        PongService.players++;
        console.log('players: ', PongService.players);
    }
    
    removePlayer() {
        PongService.players--;
        console.log('players: ', PongService.players);
    }

    getPlayers() {
        return (PongService.players);
    }

}
